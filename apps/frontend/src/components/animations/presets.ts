// Pure TS helpers (no "use client")
import type { Variants, Easing } from "framer-motion";

/** timing tokens */
export const DUR = { fast: 0.25, base: 0.45, slow: 0.7 };

/** easing tokens (typed as Easing) */
export const EASE_OUT: Easing = [0.16, 1, 0.3, 1];

/** Parent stagger container */
export const stagger = (gap = 0.14, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Common children variants */
export const fadeUp = (dy = 12, dur = DUR.base): Variants => ({
  hidden: { opacity: 0, y: dy },
  show:   { opacity: 1, y: 0, transition: { duration: dur, ease: EASE_OUT } },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: DUR.base, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show:   { opacity: 1, scale: 1, transition: { duration: DUR.fast, ease: EASE_OUT } },
};
