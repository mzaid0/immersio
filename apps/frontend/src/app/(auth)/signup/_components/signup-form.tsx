"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showErrorToast, showSuccessToast } from "@/components/ui/custom-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ThemeToggleButton from "@/components/ui/theme-toggle-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignupFormData, signupSchema } from "@immersio/shared";

const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

const isValidDate = (date: Date | undefined) => {
    if (!date) return false;
    return !isNaN(date.getTime());
};

const CalendarDatePicker = ({ value, onChange, error }: {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(value ? new Date(value) : undefined);
    const [month, setMonth] = useState<Date | undefined>(date);
    const [displayValue, setDisplayValue] = useState(formatDate(date));

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="dateOfBirth" className="px-1">Date of Birth</Label>
            <div className="relative flex gap-2">
                <Input
                    id="dateOfBirth"
                    value={displayValue}
                    placeholder="June 01, 2025"
                    className={`bg-background pr-10 ${error ? "border-red-500" : ""}`}
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        setDisplayValue(e.target.value);
                        if (isValidDate(date)) {
                            setDate(date);
                            setMonth(date);
                            onChange(date.toISOString().split("T")[0]);
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Select date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                setDate(date);
                                setDisplayValue(formatDate(date));
                                onChange(date ? date.toISOString().split("T")[0] : "");
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

const SignupForm = () => {
    const [step, setStep] = useState(1);
    const [mounted, setMounted] = useState(false);

    const { control, handleSubmit, formState: { errors }, trigger } = useForm<SignupFormData>({
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
        },
        mode: "onChange",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const nextStep = async () => {
        if (step === 1) {
            const isValid = await trigger(["email", "username", "password", "confirmPassword"]);
            if (!isValid) {
                if (errors.email) showErrorToast("Invalid email", errors.email.message);
                else if (errors.username) showErrorToast("Invalid username", errors.username.message);
                else if (errors.password) showErrorToast("Invalid password", errors.password.message);
                else if (errors.confirmPassword) showErrorToast("Password mismatch", errors.confirmPassword.message);
                return;
            }
        }
        setStep(2);
    };

    const prevStep = () => setStep(1);

    const onSubmit = (data: SignupFormData) => {
        const submissionData = {
            email: data.email,
            username: data.username,
            password: data.password,
            firstName: data.firstName || undefined,
            lastName: data.lastName || undefined,
            phone: data.phone || undefined,
            dateOfBirth: data.dateOfBirth || undefined,
            gender: data.gender || undefined,
        };
        console.log("Submitted Data:", submissionData);
        showSuccessToast("Account created!", "Welcome to Immersio , redirecting to...");
    };

    const stepVariants = {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br">
            <div className="w-full border dark:border-zinc-800 max-w-5xl h-[600px] grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative overflow-hidden bg-gradient-to-br">
                    <div className="absolute inset-0 opacity-10 dark:opacity-5"></div>
                    <div className="relative z-10 h-full flex flex-col justify-center items-center p-8">
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="dark:bg-white/10 bg-black/10 border-black/10  backdrop-blur-md p-4 rounded-2xl border dark:border-white/20">
                                    <Image src="/static/logo.png" alt="Immersio Logo" width={64} height={64} className="rounded-xl" />
                                </div>
                            </div>
                            <motion.h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                                Welcome to <span className="dark:text-green-200 text-green-900">Immersio</span>
                            </motion.h1>
                            <motion.p className="text-center dark:text-green-100" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                Create your account <br />
                                <span>to unlock immersive experiences</span>
                            </motion.p>
                        </motion.div>
                    </div>
                </div>

                <div className="flex items-center justify-center bg-zinc-100/50 dark:bg-white/10 backdrop-blur-md p-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-full max-w-md">
                        <Card className="w-full bg-transparent shadow-none border-0">
                            <CardHeader className="relative">
                                <div className="absolute top-0 right-0">
                                    <ThemeToggleButton variant="circle" start="top-right" />
                                </div>
                                <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500">
                                    {step === 1 ? "Create Account" : "Your Information"}
                                </CardTitle>
                                <div className="flex justify-center gap-2 mt-4">
                                    <div className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step >= 1 ? "bg-green-400" : "bg-gray-300 dark:bg-gray-600"}`} />
                                    <div className={`h-1.5 w-8 rounded-full transition-all duration-300 ${step >= 2 ? "bg-green-400" : "bg-gray-300 dark:bg-gray-600"}`} />
                                </div>
                            </CardHeader>

                            <CardContent className="p-4">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                                            <div>
                                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</Label>
                                                <Controller name="email" control={control} render={({ field }) => (
                                                    <Input id="email" type="email" placeholder="Enter your email" {...field} className={errors.email ? "border-red-500" : ""} />
                                                )} />
                                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</Label>
                                                <Controller name="username" control={control} render={({ field }) => (
                                                    <Input id="username" type="text" placeholder="Choose a username" {...field} className={errors.username ? "border-red-500" : ""} />
                                                )} />
                                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</Label>
                                                <Controller name="password" control={control} render={({ field }) => (
                                                    <Input id="password" type="password" placeholder="Create a password" {...field} className={errors.password ? "border-red-500" : ""} />
                                                )} />
                                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                                            </div>

                                            <div>
                                                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</Label>
                                                <Controller name="confirmPassword" control={control} render={({ field }) => (
                                                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...field} className={errors.confirmPassword ? "border-red-500" : ""} />
                                                )} />
                                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                                            </div>

                                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                                <Button onClick={nextStep} variant="parrot" className="w-full">Continue</Button>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</Label>
                                                    <Controller name="firstName" control={control} render={({ field }) => (
                                                        <Input id="firstName" type="text" placeholder="First name" {...field} />
                                                    )} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</Label>
                                                    <Controller name="lastName" control={control} render={({ field }) => (
                                                        <Input id="lastName" type="text" placeholder="Last name" {...field} />
                                                    )} />
                                                </div>
                                            </div>

                                            <div>
                                                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</Label>
                                                <Controller name="phone" control={control} render={({ field }) => (
                                                    <Input id="phone" type="tel" placeholder="Your phone number" {...field} />
                                                )} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Controller name="dateOfBirth" control={control} render={({ field }) => (
                                                    <CalendarDatePicker value={field.value || ""} onChange={field.onChange} error={errors.dateOfBirth?.message} />
                                                )} />
                                                <div>
                                                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</Label>
                                                    <Controller name="gender" control={control} render={({ field }) => (
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger id="gender" className="w-full">
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Male">Male</SelectItem>
                                                                <SelectItem value="Female">Female</SelectItem>
                                                                <SelectItem value="Other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )} />
                                                </div>
                                            </div>

                                            <div className="flex justify-between gap-3 mt-4">
                                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex-1">
                                                    <Button variant="outline" onClick={prevStep}>Back</Button>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex-1">
                                                    <Button onClick={handleSubmit(onSubmit)} variant="parrot" className="w-full">Sign Up</Button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300 font-medium">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </Card>

                        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                            <p>© 2025 Immersio. All rights reserved.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;