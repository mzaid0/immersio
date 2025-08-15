import axiosServer from '@/lib/axios-server';
import { notFound } from 'next/navigation';
import VerificationResult from '../_components/verification-result';
import { verifyEmailToken } from './_helper/verifyEmailToken';

interface PageProps {
    params: Promise<{ token: string }>;
}

export default async function VerifyEmailPage({ params }: PageProps) {

    const { token } = await params;

    if (!token) notFound();

    const result = await verifyEmailToken(token);

    return <VerificationResult result={result} />;
}