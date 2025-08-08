type Role = "admin" | "user" | "superadmin";

interface VerificationResultProps {
    result: {
        success: boolean;
        data?: {
            user?: {
                role: Role;
                email?: string;
                name?: string;
                firstName?: string;
                lastName?: string;
            };
        };
        error?: {
            status: number;
            message: string;
        };
    };
}