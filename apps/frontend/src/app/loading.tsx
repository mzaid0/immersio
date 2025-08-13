"use client";

import TypingDots from "@/components/ui/TypingDots";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background text-foreground"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6">
       

        <motion.div
          className="text-xs sm:text-sm text-foreground/70"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Loading your experience…
        </motion.div>

        {/* Typing dots loader */}
        <TypingDots size={64} className="text-emerald-600 dark:text-emerald-400" />

        
      </div>
    </div>
  );
}
