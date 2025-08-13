"use client";
import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

export default function MotionSection({
    children, variants, once = true, amount = 0.2, className = "", id,
}: PropsWithChildren<{ variants: Variants; once?: boolean; amount?: number; className?: string; id?: string }>) {
    return (
        <motion.section
            id={id}
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount }}
            variants={variants}
        >
            {children}
        </motion.section>
    );
}
