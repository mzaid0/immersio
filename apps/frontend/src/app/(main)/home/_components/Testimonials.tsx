"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const items = [
    { quote: "The hoodie quality is unreal — weighty but soft. Feels premium.", name: "Ayesha" },
    { quote: "Tailored shirt fits like it’s made for me. Clean lines, perfect drape.", name: "Hamza" },
    { quote: "Fast shipping, easy returns. I’m hooked on the jackets.", name: "Sara" },
    { quote: "Minimal aesthetic, luxury feel. My new go-to brand.", name: "Zain" },
  ];
  const data = [...items, ...items, ...items];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-4xl font-bold md:mb-12 md:text-5xl" style={{ fontFamily: "serif" }}>
          What They’re <span className="text-emerald-600 dark:text-emerald-400">Saying</span>
        </h2>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent dark:from-black" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent dark:from-black" />
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {data.map((t, i) => (
                <div
                  key={i}
                  className="relative w-[420px] shrink-0 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950"
                >
                  <div className="mb-3 flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">{t.quote}</p>
                  <p className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">— {t.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
