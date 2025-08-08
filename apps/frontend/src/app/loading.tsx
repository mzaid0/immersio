"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/ui/BrandMark";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black text-white"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6">
        <BrandMark />

        <motion.div
          className="text-sm opacity-80"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Loading your experience…
        </motion.div>

        <div className="h-1 w-56 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full w-28 bg-white"
            initial={{ x: "-120%" }}
            animate={{ x: ["-120%", "200%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}