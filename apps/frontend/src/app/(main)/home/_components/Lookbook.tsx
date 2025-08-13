"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

const shots = [
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&fm=png&q=80", caption: "Monochrome Layers" },
  { src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&fm=png&q=80", caption: "Relaxed Denim" },
  { src: "https://images.unsplash.com/photo-1506629905607-c52b8d3e0679?w=1600&fm=png&q=80", caption: "Soft Neutrals" },
  { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&fm=png&q=80", caption: "City Co-ords" },
  { src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&fm=png&q=80", caption: "Menswear Edit" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&fm=png&q=80", caption: "Athleisure Core" },
];

export default function Lookbook() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <h3 className="mb-8 text-3xl font-bold md:text-4xl" style={{ fontFamily: "serif" }}>
          Look<span className="text-emerald-600 dark:text-emerald-400">book</span>
        </h3>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {shots.map((s, i) => <Look key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
}

function Look({ src, caption }: { src: string; caption: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  return (
    <motion.div ref={ref} className="mb-4 break-inside-avoid overflow-hidden rounded-3xl" style={{ y }}>
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} className="w-full object-cover" alt={caption} />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-3 left-3 rounded-full border border-emerald-200/60 bg-emerald-600/20 px-3 py-1 text-xs text-white backdrop-blur dark:border-emerald-400/50 dark:bg-emerald-400/20">
            {caption}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
