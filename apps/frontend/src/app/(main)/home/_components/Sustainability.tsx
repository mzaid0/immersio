"use client";

import { fadeUp, scaleIn, stagger } from "@/components/animations/presets";
import MotionSection from "@/components/MotionSection";
import { motion } from "framer-motion";

export default function Sustainability() {
  const stats = [
    { k: "Recycled fibers", v: "62%" },
    { k: "Water saved / item", v: "1.3L" },
    { k: "Factories audited", v: "100%" },
  ];
  return (
    <MotionSection id="about" className="px-5 py-16" variants={stagger(0.12)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div variants={fadeUp(16)} className="rounded-3xl border border-zinc-200 p-8 dark:border-zinc-800">
          <h3 className="text-3xl font-bold" style={{ fontFamily: "serif" }}>
            Crafted <span className="text-emerald-600 dark:text-emerald-400">responsibly</span>.
          </h3>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400">
            From premium fabrics to audited factories, we balance luxury with responsibility.
          </p>
          <motion.div className="mt-8 grid grid-cols-3 gap-4" variants={stagger(0.08)}>
            {stats.map((s) => (
              <motion.div key={s.k} variants={scaleIn} className="rounded-2xl border border-zinc-200 p-5 text-center shadow-sm dark:border-zinc-800">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{s.v}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{s.k}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div variants={fadeUp(20)} className="overflow-hidden rounded-3xl ring-1 ring-emerald-500/20">
          <img src="https://images.unsplash.com/photo-1520975693412-634f0a6eb5bb?w=1600&fm=png&q=80" alt="sustainability" className="size-full object-cover" />
        </motion.div>
      </div>
    </MotionSection>
  );
}
