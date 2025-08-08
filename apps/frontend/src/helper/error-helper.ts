import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
    if (isAxiosError(error)) {
        const respMsg = typeof error.response?.data?.message === "string" ? error.response.data.message : undefined;
        return respMsg || error.message || fallback;
    }
    if (error instanceof Error) return error.message || fallback;
    return fallback;
}
