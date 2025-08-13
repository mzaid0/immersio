"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

const cards = [
  { src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&fm=png&q=80", title: "Minimal Hoodies" },
  { src: "https://images.unsplash.com/photo-1520975693412-634f0a6eb5bb?w=1200&fm=png&q=80", title: "Structured Jackets" },
  { src: "https://images.unsplash.com/photo-1520975594681-6a1f64ac3ac1?w=1200&fm=png&q=80", title: "Tailored Shirts" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&fm=png&q=80", title: "Relaxed Pants" },
  { src: "https://images.unsplash.com/photo-1544441893-675973e31985?w=1200&fm=png&q=80", title: "Statement Co-ords" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&fm=png&q=80", title: "Athleisure" },
];

export default function TrendingNow() {
  return (
    <section id="trending" className="bg-zinc-50 py-20 dark:bg-zinc-950">
      <div className="mx-auto mb-10 max-w-7xl px-5 text-center">
        <h2 className="text-4xl font-bold md:text-6xl" style={{ fontFamily: "serif" }}>
          <span className="text-emerald-600 dark:text-emerald-400">Trending</span> Now
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">What everyone’s reaching for.</p>
      </div>
      <StickyCarousel items={cards} />
    </section>
  );
}

function StickyCarousel({ items }: { items: { src: string; title?: string }[] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={ref} className="relative h-[280vh] w-full">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-6">
          {items.map((it, i) => (
            <div
              key={i}
              className="group relative h-[420px] w-[320px] overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(16,185,129,0.25)] dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${it.src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[11px] uppercase tracking-wider text-emerald-300">Trending</p>
                <h4 className="text-lg font-semibold text-white">{it.title}</h4>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-emerald-500/0 transition group-hover:ring-emerald-500/30" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
