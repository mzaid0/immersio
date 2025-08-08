import express from "express";
import { signup, login, resendVerification, verifyEmail } from "../controllers/auth-controller.js";
import { validateRequest } from "../middlewares/validation-middleware.js";
import { backendSignupSchema, loginSchema } from "@immersio/shared";

const router = express.Router();

router.post(
    "/signup",
    validateRequest(backendSignupSchema),
    signup
);

router.post(
    "/login",
    validateRequest(loginSchema),
    login
);

router.get(
    "/verify-email/:token",
    verifyEmail);

router.post(
    "/resend-verification",
    resendVerification
);

export default router;