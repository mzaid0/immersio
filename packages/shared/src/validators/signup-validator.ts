import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email("Valid email is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"]).optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;