import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error.js";
import { Prisma } from "@prisma/client";

export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = 500;
    let message = "Internal Server Error";
    let data = null;

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        data = error.data;
    }

    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                statusCode = 409;
                message = "A record with this information already exists";
                break;
            case 'P2025':
                statusCode = 404;
                message = "Record not found";
                break;
            case 'P2003':
                statusCode = 400;
                message = "Invalid reference to related record";
                break;
            default:
                statusCode = 400;
                message = "Database operation failed";
                break;
        }
    }

    else if (error instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid data provided";
    }

    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = "Invalid token";
    }

    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = "Token has expired";
    }

    else if (error.name === 'ValidationError' || error.name === 'ZodError') {
        statusCode = 400;
        message = error.message;
        data = error.data || error.details || null;
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        console.error('Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            statusCode,
            url: req.url,
            method: req.method,
            body: req.body,
            params: req.params,
            query: req.query,
            data: data  
        });
    }

    res.status(statusCode).json({
        success: false,
        message,
        data,
        ...(process.env.NODE_ENV === 'DEVELOPMENT' && {
            stack: error.stack,
            error: error.name
        })
    });
};
