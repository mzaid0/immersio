import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { ApiError } from "../utils/api-error.js"

export const validateRequest = (schema: z.ZodSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {

        try {
            schema.parse(req.body);
            next();

        } catch (error) {

            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }));
                throw new ApiError(400, "Validation failed", errorMessages);
            }
            
            next(error);
        }
    };
};