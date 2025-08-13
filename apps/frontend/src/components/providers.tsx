"use client";
import { MotionConfig, useReducedMotion, type Transition } from "framer-motion";
import { useMemo, type PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
    const prefersReduced = useReducedMotion();

    const transition = useMemo<Transition>(
        () => ({
            duration: prefersReduced ? 0.2 : 0.45,
            ease: [0.16, 1, 0.3, 1] as const,
        }),
        [prefersReduced]
    );

    return (
        <MotionConfig
            transition={transition}
            reducedMotion={prefersReduced ? "always" : "never"}
        >
            {children}
        </MotionConfig>
    );
}
