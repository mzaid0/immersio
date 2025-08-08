"use client";

import PasswordField from "@/components/ui/PasswordField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { showErrorToast, showSuccessToast } from "@/components/ui/custom-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { getErrorMessage } from "@/helper/error-helper";
import { loginApi } from "@/services/auth-service";
import { loginSchema } from "@Immersio/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SocialButtons from "./SocialButtons";

type FormInput = z.input<typeof loginSchema>;
type FormOutput = z.output<typeof loginSchema>;

export default function LoginForm() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
            rememberMe: false,
        },
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: FormOutput) => loginApi(payload),
        onSuccess: ({ user, emailVerified }) => {
            showSuccessToast("Login successful!", emailVerified ? "Welcome back!" : "Please verify your email.");
        },
        onError: (err) => {
            showErrorToast("Login failed", getErrorMessage(err));
        },
    });

    const onSubmit = (data: FormInput) => {
        const payload: FormOutput = loginSchema.parse(data);
        mutate(payload);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950/20 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800/70 shadow-lg bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
                {/* Left panel */}
                <div className="relative hidden md:flex items-center justify-center p-10">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/40 via-transparent to-transparent dark:from-emerald-400/10" />
                    <div className="relative z-10 text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Welcome back to <span className="text-emerald-600 dark:text-emerald-400">Immersio</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Sign in to continue your immersive journey.
                        </p>
                    </div>
                </div>

                {/* Right panel - form */}
                <div className="flex items-center justify-center p-5 md:p-8 bg-zinc-50/60 dark:bg-zinc-900/40">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full max-w-md"
                    >
                        <Card className="bg-white/80 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm">
                            <CardHeader className=" pb-2">

                                <CardTitle className="text-center text-2xl font-bold">Sign In</CardTitle>
                                <div className="mt-4 flex justify-center">
                                    <span className="h-1.5 w-16 rounded-full bg-emerald-500" />
                                </div>
                            </CardHeader>

                            <CardContent className="pt-4 space-y-4">
                                {/* Identifier */}
                                <div>
                                    <Label htmlFor="identifier">Email or Username *</Label>
                                    <Controller
                                        name="identifier"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                id="identifier"
                                                type="text"
                                                placeholder="you@domain.com or username"
                                                {...field}
                                                className={errors.identifier ? "border-red-500" : ""}
                                            />
                                        )}
                                    />
                                    {errors.identifier && (
                                        <p className="text-xs text-red-500 mt-1">{errors.identifier.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field }) => (
                                        <PasswordField field={field} error={errors.password} placeholder="Enter your password" label="Password *" />
                                    )}
                                />

                                {/* Remember + Forgot */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <Controller
                                        name="rememberMe"
                                        control={control}
                                        render={({ field }) => (
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="rememberMe"
                                                    checked={!!field.value}
                                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                                />
                                                <Label htmlFor="rememberMe" className="text-xs md:text-sm mb-0">
                                                    Remember me
                                                </Label>
                                            </div>
                                        )}
                                    />
                                    <Link
                                        href="/forgot-password"
                                        className="text-end text-xs md:text-sm text-emerald-700 dark:text-emerald-400 hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit */}
                                <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>

                                {/* Socials */}
                                <div className="flex items-center justify-center my-2">
                                    <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                    <span className="mx-3 text-xs text-zinc-600 dark:text-zinc-400 select-none">or continue with</span>
                                    <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                </div>

                                <SocialButtons />
                            </CardContent>

                            <div className="text-center mt-3 px-4 pb-4">
                                <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                                    Don't have an account?{" "}
                                    <Link href="/signup" className="text-emerald-700 dark:text-emerald-400 underline">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </Card>

                        <p className="text-center text-xs text-zinc-600 dark:text-zinc-400 mt-4">
                            © 2025 Immersio. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}