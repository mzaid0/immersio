import axiosClient from "@/lib/axios-client";
import type { SignupFormData, LoginFormData } from "@Immersio/shared";
import type { UserSafe } from "@immersio/shared/types";

export async function signupApi(data: SignupFormData): Promise<{ user: UserSafe; message: string }> {
    const res = await axiosClient.post("/auth/signup", data);
    return res.data?.data;
}

export async function loginApi(data: LoginFormData): Promise<{ user: UserSafe; emailVerified: boolean }> {
    const res = await axiosClient.post("/auth/login", data);
    return res.data?.data;
}

export async function resendVerificationEmailApi(email: string): Promise<{ message: string }> {
    const res = await axiosClient.post("/auth/resend-verification", { email });
    return res.data;
}
