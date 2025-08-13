"use client";


import { fadeUp, scaleIn, stagger } from "@/components/animations/presets";
import MotionSection from "@/components/MotionSection";
import { motion } from "framer-motion";

export default function CategoryTiles() {
  const cats = [
    { title: "Hoodies", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&fm=png&q=80" },
    { title: "Jackets", img: "https://images.unsplash.com/photo-1520975693412-634f0a6eb5bb?w=1200&fm=png&q=80" },
    { title: "Shirts", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200&fm=png&q=80" },
    { title: "Pants", img: "https://images.unsplash.com/photo-1520974735194-6c0c4a5e0b90?w=1200&fm=png&q=80" },
  ];
  return (
    <MotionSection className="px-5 py-16" variants={stagger(0.12)}>
      <div className="mx-auto max-w-7xl">
        <motion.div variants={fadeUp(12)} className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "serif" }}>
            Shop by <span className="text-emerald-600 dark:text-emerald-400">Category</span>
          </h2>
          <a className="text-sm text-emerald-700 hover:underline dark:text-emerald-300" href="#">View all</a>
        </motion.div>
        <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-4" variants={stagger(0.08)}>
          {cats.map((c) => (
            <motion.a key={c.title} variants={scaleIn}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-zinc-100 p-6 shadow-[0_6px_20px_rgba(16,185,129,0.08)] transition hover:shadow-[0_16px_50px_rgba(16,185,129,0.25)] dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
              href="#"
            >
              <div className="pointer-events-none absolute -right-6 bottom-0 h-40 w-40 opacity-90 transition-transform duration-500 group-hover:scale-110">
                <img src={c.img} className="size-full object-cover" alt={c.title} />
              </div>
              <span className="relative z-10 text-lg font-semibold">{c.title}</span>
              <p className="relative z-10 mt-1 text-sm text-zinc-600 dark:text-zinc-400">Explore {c.title}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
