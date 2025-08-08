export class ApiError extends Error {
    public statusCode: number;
    public data: any;
    public isOperational: boolean;

    constructor(statusCode: number, message: string, data: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.isOperational = true;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}