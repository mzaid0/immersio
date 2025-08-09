"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2, Mail, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showErrorToast, showSuccessToast } from "@/components/ui/custom-toast";
import { resendVerificationEmailApi } from "@/services/auth-service";

export default function VerificationResult({ result }: VerificationResultProps) {
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [email, setEmail] = useState(result.data?.user?.email ?? "");
    const [cooldown, setCooldown] = useState(0);
    const [redirectCountdown, setRedirectCountdown] = useState(5);

    const userRole = result.data?.user?.role ?? "user";
    const fullName = useMemo(() => {
        const f = result.data?.user?.firstName?.trim() ?? "";
        const l = result.data?.user?.lastName?.trim() ?? "";
        const combined = `${f} ${l}`.trim();
        if (combined) return combined;
        if (result.data?.user?.name?.trim()) return result.data.user.name.trim();
        if (result.data?.user?.email) return result.data.user.email.split("@")[0];
        return "there";
    }, [result.data?.user?.firstName, result.data?.user?.lastName, result.data?.user?.name, result.data?.user?.email]);

    const redirectInfo = useMemo(() => {
        const isAdmin = userRole === "admin" || userRole === "superadmin";
        return {
            text: isAdmin ? "Admin Dashboard" : "Home",
            href: isAdmin ? "/dashboard" : "/",
        };
    }, [userRole]);

    const getStatusInfo = () => {
        if (result.success) {
            return {
                icon: <CheckCircle className="w-14 h-14 text-emerald-500" />,
                title: "Email Verified!",
                message: `Welcome back, ${fullName}! Your email has been verified successfully.`,
                variant: "success" as const,
                canResend: false,
            };
        }

        const status = result.error?.status ?? 400;
        const message = result.error?.message ?? "Verification failed.";

        if (status === 400 && /expired/i.test(message)) {
            return {
                icon: <XCircle className="w-14 h-14 text-orange-500" />,
                title: "Link Expired",
                message: "This verification link has expired. Please request a new one.",
                variant: "warning" as const,
                canResend: true,
            };
        }

        if (status === 400 && /already verified/i.test(message)) {
            return {
                icon: <CheckCircle className="w-14 h-14 text-blue-500" />,
                title: "Already Verified",
                message: "Your email is already verified. You can log in now.",
                variant: "info" as const,
                canResend: false,
            };
        }

        return {
            icon: <XCircle className="w-14 h-14 text-red-500" />,
            title: "Verification Failed",
            message: message || "Something went wrong during verification.",
            variant: "error" as const,
            canResend: true,
        };
    };

    const statusInfo = getStatusInfo();

    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setTimeout(() => setCooldown((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    useEffect(() => {
        if (!result.success) return;
        if (redirectCountdown <= 0) {
            router.push(redirectInfo.href);
            return;
        }
        const t = setTimeout(() => setRedirectCountdown((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [result.success, redirectCountdown, redirectInfo.href, router]);

    const { mutate: resendEmail, isPending: isResending } = useMutation({
        mutationFn: (val: string) => resendVerificationEmailApi(val),
        onSuccess: ({ message }) => {
            showSuccessToast("Email sent!", message || "Verification email has been sent to your inbox.");
            setDialogOpen(false);
            setCooldown(60);
        },
        onError: (err: unknown) => {
            const msg =
                (err as any)?.response?.data?.message ||
                (err as Error)?.message ||
                "Failed to resend email.";
            showErrorToast("Failed to send", msg);
        },
    });

    const handleResend = () => {
        if (!email?.trim()) {
            showErrorToast("Email required", "Please enter your email address.");
            return;
        }
        resendEmail(email.trim());
    };

    const variantColors = {
        success: "text-emerald-500",
        error: "text-red-500",
        warning: "text-orange-500",
        info: "text-blue-500",
    } as const;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950/20 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white/80 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm rounded-2xl overflow-hidden">
                    <CardHeader className="text-center p-6 pb-4">
                        <div className="mx-auto mb-4">{statusInfo.icon}</div>
                        <CardTitle className="text-2xl font-bold">{statusInfo.title}</CardTitle>
                        <CardDescription className={`mt-2 ${variantColors[statusInfo.variant]}`}>
                            {statusInfo.message}
                        </CardDescription>

                        {result.success && fullName && (
                            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800">
                                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{fullName}</span>
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                        {result.success && (
                            <>
                                <div className="text-center py-2">
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Redirecting to <span className="font-semibold text-emerald-600 dark:text-emerald-400">{redirectInfo.text}</span> in{" "}
                                        <span className="font-semibold text-foreground">{redirectCountdown}s</span>
                                    </p>
                                </div>

                                <Button onClick={() => router.push(redirectInfo.href)} className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                                    Continue to {redirectInfo.text}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>

                                <div className="text-center text-xs text-zinc-600 dark:text-zinc-400">
                                    <Link href="/" className="hover:underline">
                                        Go to homepage
                                    </Link>
                                </div>
                            </>
                        )}

                        {!result.success && (
                            <>
                                {statusInfo.canResend && (
                                    <>
                                        <Button
                                            onClick={() => setDialogOpen(true)}
                                            disabled={isResending || cooldown > 0}
                                            variant="outline"
                                            className="w-full"
                                            size="lg"
                                        >
                                            {isResending ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : cooldown > 0 ? (
                                                `Resend in ${cooldown}s`
                                            ) : (
                                                <>
                                                    <Mail className="mr-2 h-4 w-4" />
                                                    Resend Verification Email
                                                </>
                                            )}
                                        </Button>
                                        <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
                                            Didn’t receive the email? Check your spam folder.
                                        </p>
                                    </>
                                )}

                                <Button onClick={() => router.push("/login")} className="w-full" variant="secondary" size="lg">
                                    Back to Login
                                </Button>
                            </>
                        )}

                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                Need help?{" "}
                                <Link href="/support" className="text-emerald-700 dark:text-emerald-400 font-medium hover:underline">
                                    Contact Support
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Resend Verification Email</DialogTitle>
                        <DialogDescription>Enter your email address to receive a new verification link.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !isResending) handleResend();
                                }}
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex flex-row justify-end items-center gap-2 !px-0">
                        <Button type="button" variant="outline" className="!w-auto min-w-[110px]" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="button" className="!w-auto min-w-[110px]" onClick={handleResend} disabled={isResending}>
                            {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isResending ? "Sending..." : "Send Email"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
