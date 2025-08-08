import axiosServer from '@/lib/axios-server';
import { notFound } from 'next/navigation';
import VerificationResult from '../_components/verification-result';

interface PageProps {
    params: Promise<{ token: string }>;
}

async function verifyEmailToken(token: string) {
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

export default async function VerifyEmailPage({ params }: PageProps) {

    const { token } = await params;
    
    if (!token) notFound();
    
    const result = await verifyEmailToken(token);
    
    return <VerificationResult result={result} />;
}