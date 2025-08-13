"use client";

import { Heart, Star, ArrowRight } from "lucide-react";
import { MagneticButton } from "./primitives";
import { Button } from "@/components/ui/button";
import { fadeUp, scaleIn, stagger } from "@/components/animations/presets";
import MotionSection from "@/components/MotionSection";
import { motion } from "framer-motion"

const ColorDot = ({ hex }: { hex: string }) => (
  <span className="inline-block size-4 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: hex }} />
);
const Rating = ({ value = 4.8 }: { value?: number }) => (
  <div className="flex items-center gap-1 text-[12px] text-emerald-700 dark:text-emerald-300">
    <Star className="h-3.5 w-3.5 fill-current" /> {value}
  </div>
);

function ProductCard({
  title, price, imgA, imgB, tag, colors = ["#10B981", "#34D399", "#065F46"], rating = 4.8,
}: { title: string; price: string | number; imgA: string; imgB: string; tag?: string; colors?: string[]; rating?: number; }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-shadow hover:shadow-[0_10px_40px_rgba(16,185,129,0.25)] dark:border-zinc-800 dark:bg-zinc-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between p-3">
        {tag && (
          <span className="pointer-events-auto inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 shadow-md dark:bg-emerald-900/40 dark:text-emerald-200">
            {tag}
          </span>
        )}
        <button aria-label="Add to wishlist" className="pointer-events-auto ml-auto inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img src={imgA} alt={title} className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0" />
        <img src={imgB} alt={`${title} alt`} className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="relative z-10 space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div><h4 className="text-[15px] font-semibold">{title}</h4><Rating value={rating} /></div>
          <p className="text-[15px] font-semibold">${price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">{colors.slice(0, 3).map((c, i) => <ColorDot key={i} hex={c} />)}</div>
          <MagneticButton className="rounded-full bg-emerald-600 px-5 py-2 text-sm text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400">
            Add <ArrowRight className="ml-2 h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

const products = [
  { title: "Essential Hoodie", price: "89", tag: "Hot", imgA: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&fm=png&q=80", imgB: "https://images.unsplash.com/photo-1520975594681-6a1f64ac3ac1?w=1200&fm=png&q=80", colors: ["#065F46", "#34D399", "#10B981"] },
  { title: "Structured Jacket", price: "149", tag: "New", imgA: "https://images.unsplash.com/photo-1520975693412-634f0a6eb5bb?w=1200&fm=png&q=80", imgB: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&fm=png&q=80", colors: ["#064E3B", "#6EE7B7", "#A7F3D0"] },
  { title: "Tailored Shirt", price: "69", imgA: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200&fm=png&q=80", imgB: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&fm=png&q=80", colors: ["#065F46", "#34D399", "#D1FAE5"] },
  { title: "Relaxed Pants", price: "79", imgA: "https://images.unsplash.com/photo-1520974735194-6c0c4a5e0b90?w=1200&fm=png&q=80", imgB: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&fm=png&q=80", colors: ["#10B981", "#9CA3AF", "#065F46"] },
];

export default function NewArrivals() {
  return (
    <MotionSection id="new" className="px-5 py-20" variants={stagger(0.12)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-bold md:text-5xl" style={{ fontFamily: "serif" }}>
              New <span className="text-emerald-600 dark:text-emerald-400">Arrivals</span>
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Fresh drops in hoodies, jackets, shirts, and pants.</p>
          </div>
          <motion.div variants={fadeUp(14)}>
            <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400">
              View All
            </Button>
          </motion.div>
        </div>

        <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" variants={stagger(0.08)}>
          {products.map((p) => (
            <motion.div key={p.title} variants={scaleIn}>
              <ProductCard {...p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}
