"use client";

import { fadeIn, fadeUp, scaleIn } from "@/components/animations/presets";
import { motion } from "framer-motion";

export default function LifestyleVideo() {
  return (
    <section className="relative overflow-hidden">
      <motion.video
        initial="hidden" animate="show" variants={scaleIn}
        className="h-[70vh] w-full object-cover" autoPlay muted loop playsInline
        src="https://cdn.coverr.co/videos/coverr-a-model-walking-down-the-street-7205/1080p.mp4"
      />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn}
        className="absolute inset-0 bg-black/30" />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp(12)}
        className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-emerald-200/50 bg-emerald-600/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur dark:border-emerald-400/60 dark:bg-emerald-400/20 dark:text-emerald-50">
          Everyday Luxury • AW’25 Lookbook
        </div>
      </motion.div>
    </section>
  );
}
