"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { signupApi } from "@/services/auth-service";
import { getErrorMessage } from "@/helper/error-helper";
import { signupSchema } from "@Immersio/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PasswordField from "@/components/ui/PasswordField";
import CalendarDatePicker from "@/components/ui/CalendarDatePicker";
import { showErrorToast, showSuccessToast } from "@/components/ui/custom-toast";
import { Loader2 } from "lucide-react";
import SocialButtons from "./SocialButtons";

type FormInput = z.input<typeof signupSchema>;
type FormOutput = z.output<typeof signupSchema>;

export default function SignupForm() {

    const [step, setStep] = useState<1 | 2>(1);

    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
        reset,
    } = useForm<FormInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phone: "",
            dateOfBirth: "",
            gender: "Male",
            acceptTerms: false,
            acceptMarketing: false,
        },
        mode: "onChange",
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (payload: FormOutput) => signupApi(payload),
        onSuccess: ({ message }) => {
            showSuccessToast("Account created!", message ?? "Welcome to Immersio!");
            reset();
        },
        onError: (err) => {
            showErrorToast("Signup failed", getErrorMessage(err));
        },
    });

    const nextStep = async () => {
        if (step === 1) {
            const ok = await trigger(["email", "username", "password", "confirmPassword"]);
            if (!ok) return;
            setStep(2);
        }
    };

    const onSubmit = (data: FormInput) => {
        const payload: FormOutput = signupSchema.parse(data);
        mutate(payload);
    };

    const stepVariants = {
        initial: { opacity: 0, x: 80 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -80 },
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950/20 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800/70 shadow-lg bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
                {/* Left panel */}
                <div className="relative hidden md:flex items-center justify-center p-10">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/40 via-transparent to-transparent dark:from-emerald-400/10" />
                    <div className="relative z-10 text-center space-y-2">
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                            Welcome to <span className="text-emerald-600 dark:text-emerald-400">Immersio</span>
                        </h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Create your account to unlock immersive experiences.
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

                                <CardTitle className="text-center text-2xl font-bold">
                                    {step === 1 ? "Create Account" : "Personal Information"}
                                </CardTitle>

                                {/* Progress pills */}
                                <div className="mt-4 flex justify-center gap-2">
                                    <span className={`h-1.5 w-8 rounded-full ${step >= 1 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                                    <span className={`h-1.5 w-8 rounded-full ${step >= 2 ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-700"}`} />
                                </div>
                            </CardHeader>

                            <CardContent className="pt-4">
                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="step1"
                                            variants={stepVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.22 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <Label htmlFor="email">Email *</Label>
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="you@domain.com"
                                                            {...field}
                                                            className={errors.email ? "border-red-500" : ""}
                                                        />
                                                    )}
                                                />
                                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="username">Username *</Label>
                                                <Controller
                                                    name="username"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input
                                                            id="username"
                                                            placeholder="yourusername"
                                                            {...field}
                                                            className={errors.username ? "border-red-500" : ""}
                                                        />
                                                    )}
                                                />
                                                {errors.username && <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>}
                                            </div>

                                            <Controller
                                                name="password"
                                                control={control}
                                                render={({ field }) => (
                                                    <PasswordField field={field} error={errors.password} placeholder="Create a password" label="Password *" />
                                                )}
                                            />
                                            <Controller
                                                name="confirmPassword"
                                                control={control}
                                                render={({ field }) => (
                                                    <PasswordField field={field} error={errors.confirmPassword} placeholder="Confirm your password" label="Confirm Password *" />
                                                )}
                                            />

                                            <Button className="w-full" onClick={nextStep} disabled={isPending}>
                                                Continue
                                            </Button>

                                            <div className="flex items-center justify-center my-3">
                                                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                                <span className="mx-3 text-xs text-zinc-600 dark:text-zinc-400 select-none">or continue with</span>
                                                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                            </div>

                                            <SocialButtons />


                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="step2"
                                            variants={stepVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            transition={{ duration: 0.22 }}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="firstName">First Name *</Label>
                                                    <Controller
                                                        name="firstName"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input id="firstName" {...field} className={errors.firstName ? "border-red-500" : ""} />
                                                        )}
                                                    />
                                                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                                                </div>

                                                <div>
                                                    <Label htmlFor="lastName">Last Name *</Label>
                                                    <Controller
                                                        name="lastName"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Input id="lastName" {...field} className={errors.lastName ? "border-red-500" : ""} />
                                                        )}
                                                    />
                                                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">Phone</Label>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Input id="phone" type="tel" {...field} className={errors.phone ? "border-red-500" : ""} />
                                                    )}
                                                />
                                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Controller
                                                    name="dateOfBirth"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <CalendarDatePicker
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            error={errors.dateOfBirth?.message}
                                                            label="Date of Birth"
                                                            id="dateOfBirth"
                                                        />
                                                    )}
                                                />

                                                <div>
                                                    <Label htmlFor="gender">Gender</Label>
                                                    <Controller
                                                        name="gender"
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select value={field.value} onValueChange={field.onChange}>
                                                                <SelectTrigger id="gender" className="w-full">
                                                                    <SelectValue placeholder="Select gender" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Male">Male</SelectItem>
                                                                    <SelectItem value="Female">Female</SelectItem>
                                                                    <SelectItem value="Other">Other</SelectItem>
                                                                    <SelectItem value="PreferNotToSay">Prefer not to say</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Controller
                                                    name="acceptTerms"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id="terms"
                                                                checked={!!field.value}
                                                                onCheckedChange={(checked) => field.onChange(!!checked)}
                                                            />
                                                            <Label htmlFor="terms" className="text-sm">
                                                                I agree to the{" "}
                                                                <Link href="/terms" className="text-emerald-700 dark:text-emerald-400 underline">
                                                                    Terms
                                                                </Link>{" "}
                                                                and{" "}
                                                                <Link href="/privacy" className="text-emerald-700 dark:text-emerald-400 underline">
                                                                    Privacy
                                                                </Link>
                                                            </Label>
                                                        </div>
                                                    )}
                                                />
                                                {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms.message}</p>}

                                                <Controller
                                                    name="acceptMarketing"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <div className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id="marketing"
                                                                checked={!!field.value}
                                                                onCheckedChange={(checked) => field.onChange(!!checked)}
                                                            />
                                                            <Label htmlFor="marketing" className="text-sm">Receive marketing emails</Label>
                                                        </div>
                                                    )}
                                                />
                                            </div>

                                            <div className="flex gap-3">
                                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2" disabled={isPending}>
                                                    Back
                                                </Button>
                                                <Button onClick={handleSubmit(onSubmit)} className="w-1/2" disabled={isPending}>
                                                    {isPending ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Creating...
                                                        </>
                                                    ) : (
                                                        "Create Account"
                                                    )}
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-center my-3">
                                                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                                <span className="mx-3 text-xs text-zinc-600 dark:text-zinc-400 select-none">or continue with</span>
                                                <div className="flex-grow border-t border-zinc-200 dark:border-zinc-700"></div>
                                            </div>

                                            <SocialButtons />
                                            
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>

                        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-emerald-700 dark:text-emerald-400 underline">
                                Log in
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}