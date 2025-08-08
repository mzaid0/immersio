"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function BrandMark() {
    return (
        <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-8 h-8"
            >
                <Image
                    src="/icon/logo.svg"
                    alt="Immersiio Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                    priority
                />
            </motion.div>

            <motion.span
                className="text-3xl font-bold tracking-wide"
                initial={{ letterSpacing: "0.2em" as any }}
                animate={{ letterSpacing: "0.05em" as any }}
                transition={{ duration: 0.8 }}
            >
                Immersio
            </motion.span>
        </motion.div>
    );
}