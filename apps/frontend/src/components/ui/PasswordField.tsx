"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface Props {
    field: { name: string; value: string; onChange: (...e: unknown[]) => void; onBlur: () => void; ref: (instance: HTMLInputElement | null) => void };
    error?: FieldError;
    placeholder?: string;
    label: string;
}

export default function PasswordField({ field, error, placeholder, label }: Props) {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Label htmlFor={field.name} className="mb-1 block">{label}</Label>
            <div className="relative">
                <Input
                    {...field}
                    id={field.name}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    className={error ? "border-red-500 pr-10" : "pr-10"}
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
    );
}
