import axiosServer from "@/lib/axios-server";

export async function verifyEmailToken(token: string) {
    try {
        const res = await axiosServer.get(`/auth/verify-email/${token}`);
        const { user } = res.data.data;
        return { success: true, data: { user } };
    } catch (error: any) {
        return {
            success: false,
            error: {
                status: error?.response?.status || 500,
                message: error?.response?.data?.message || 'Verification failed',
            },
        };
    }
}