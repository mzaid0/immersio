import { z } from "zod";

export const signupSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address")
        .toLowerCase()
        .trim(),

    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, hyphens, and underscores")
        .trim(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(128, "Password must not exceed 128 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters, spaces, hyphens, and apostrophes")
        .trim(),

    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name must not exceed 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes")
        .trim(),

    phone: z
        .string()
        .optional()
        .or(z.string()
            .min(10, "Phone number must be at least 10 digits")
            .max(15, "Phone number must not exceed 15 digits")
            .regex(/^\+?[\d\s()-]+$/, "Please enter a valid phone number")
            .transform(val => val?.replace(/\s/g, '') || undefined)),

    dateOfBirth: z
        .string()
        .optional()
        .or(z.string()
            .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
            .refine((date) => {
                const birthDate = new Date(date);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                return age >= 13 && age <= 120;
            }, "You must be at least 13 years old")),

    gender: z.enum(["Male", "Female", "Other", "PreferNotToSay"]).optional(),

    acceptTerms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions"
    }),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const backendSignupSchema = signupSchema.omit({
    confirmPassword: true,
    acceptTerms: true,
    acceptMarketing: true
}).extend({

    dateOfBirth: z
        .string()
        .optional()
        .transform(val => val ? new Date(val) : undefined),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type BackendSignupData = z.infer<typeof backendSignupSchema>;

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, "Email or username is required")
        .trim(),
    password: z
        .string()
        .min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;