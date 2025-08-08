import { backendSignupSchema, loginSchema } from "@immersio/shared";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../lib/prisma.js";
import { sendVerificationEmail } from "../services/email-service.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { UserSafe } from "@immersio/shared/src/types";

export const signup = asyncHandler(async (req: Request, res: Response) => {

    const validatedData = backendSignupSchema.parse(req.body);

    const { email, username, password, firstName, lastName, phone, dateOfBirth, gender } = validatedData;

    const existingUser = await db.user.findFirst({ where: { OR: [{ email }, { username }] } });

    if (existingUser) {

        if (existingUser.email === email) throw new ApiError(409, "User with this email already exists");

        if (existingUser.username === username) throw new ApiError(409, "Username is already taken");
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const rawUser = await db.user.create({
        data: {
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            phone: phone || null,
            dateOfBirth: dateOfBirth || null,
            gender: gender || null,
            emailVerificationToken,
            emailVerified: false,
            isActive: true,
            role: 'user'
        },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            phone: true,
            dateOfBirth: true,
            gender: true,
            emailVerified: true,
            role: true,
            createdAt: true
        }
    });

    const user: UserSafe = {
        ...rawUser,
        dateOfBirth: rawUser.dateOfBirth ? rawUser.dateOfBirth.toISOString().slice(0, 10) : null,
        createdAt: rawUser.createdAt.toISOString(),
        role: rawUser.role as UserSafe["role"],
    };

    try {
        await sendVerificationEmail(user.email, emailVerificationToken, user.firstName || user.username);
    } catch (error) {
        console.log(error)
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(
        new ApiResponse(201, {
            user,
            message: "Account created successfully! Please check your email to verify your account."
        }, "User registered successfully")
    );
});

export const login = asyncHandler(async (req: Request, res: Response) => {

    const { identifier, password, rememberMe } = loginSchema.parse(req.body);

    const rawUser = await db.user.findFirst({
        where: {
            OR: [{ email: identifier }, { username: identifier }],
            isActive: true,
            isDeleted: false
        }
    });

    if (!rawUser) throw new ApiError(401, "Invalid credentials");

    if (!rawUser.emailVerified) throw new ApiError(401, "Please verify your email to login.");

    const isPasswordValid = await bcrypt.compare(password, rawUser.password);

    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials");

    await db.user.update({ where: { id: rawUser.id }, data: { lastLogin: new Date() } });

    const user: UserSafe = {
        ...rawUser,
        dateOfBirth: rawUser.dateOfBirth ? rawUser.dateOfBirth.toISOString().slice(0, 10) : null,
        createdAt: rawUser.createdAt.toISOString(),
        role: rawUser.role as UserSafe["role"],
    };

    const tokenExpiry = rememberMe ? '30d' : '7d';

    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: tokenExpiry }
    );

    const cookieMaxAge = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;

    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: cookieMaxAge,
    });

    return res.status(200).json(
        new ApiResponse(200, {
            user,
            emailVerified: user.emailVerified
        }, "Login successful")
    );
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {

    const { token } = req.params;

    if (!token) throw new ApiError(400, "Verification token is required");

    const rawUser = await db.user.findFirst({
        where: { emailVerificationToken: token, isActive: true, isDeleted: false },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            role: true,
            emailVerified: true,
            emailVerificationToken: true,
            createdAt: true
        }
    });

    if (!rawUser) throw new ApiError(400, "Invalid or expired verification token");

    if (rawUser.emailVerified) {
        const user: UserSafe = {
            ...rawUser,
            createdAt: rawUser.createdAt.toISOString(),
            role: rawUser.role as UserSafe["role"],
        };
        return res.status(200).json(
            new ApiResponse(200, { user, alreadyVerified: true }, "Email is already verified")
        );
    }

    const updatedUser = await db.user.update({
        where: { id: rawUser.id },
        data: { emailVerified: true, emailVerificationToken: null },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            role: true,
            emailVerified: true,
            createdAt: true
        }
    });

    const user: UserSafe = {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        role: updatedUser.role as UserSafe["role"],
    };

    return res.status(200).json(
        new ApiResponse(200, { user }, "Email verified successfully")
    );
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {

    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const rawUser = await db.user.findUnique({
        where: { email, isActive: true, isDeleted: false }
    });

    if (!rawUser) throw new ApiError(404, "User not found");
    if (rawUser.emailVerified) throw new ApiError(400, "Email is already verified");

    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    await db.user.update({ where: { id: rawUser.id }, data: { emailVerificationToken } });

    await sendVerificationEmail(rawUser.email, emailVerificationToken, rawUser.firstName || rawUser.username);

    return res.status(200).json(
        new ApiResponse(200, null, "Verification email sent successfully")
    );
});