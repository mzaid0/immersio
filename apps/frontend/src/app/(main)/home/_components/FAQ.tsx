"use client";

import { fadeUp, stagger } from "@/components/animations/presets";
import MotionSection from "@/components/MotionSection";
import { motion } from "framer-motion";

export default function FAQ() {
  const faqs = [
    { q: "What’s your return policy?", a: "30-day hassle-free returns. Items must be unworn with tags." },
    { q: "Do you ship internationally?", a: "Yes. Duties & taxes are calculated at checkout where applicable." },
    { q: "How do I find my size?", a: "Use our size guide on each product page or chat with our stylists." },
  ];
  return (
    <MotionSection className="px-5 py-16" variants={stagger(0.12)}>
      <div className="mx-auto max-w-3xl">
        <motion.h3 variants={fadeUp(12)} className="mb-6 text-3xl font-bold" style={{ fontFamily: "serif" }}>
          <span className="text-emerald-600 dark:text-emerald-400">FAQs</span>
        </motion.h3>
        <motion.div variants={stagger(0.08)} className="divide-y divide-emerald-200 rounded-3xl border border-emerald-200 dark:divide-emerald-800 dark:border-emerald-800">
          {faqs.map((f) => (
            <motion.details key={f.q} variants={fadeUp(10)} className="group">
              <summary className="cursor-pointer list-none p-5 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/20">
                <span className="font-medium">{f.q}</span>
              </summary>
              <div className="px-5 pb-5 text-zinc-600 dark:text-zinc-400">{f.a}</div>
            </motion.details>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
