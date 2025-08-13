"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"; // fallback: button styles
import { ArrowRight, X } from "lucide-react";

type Product = { title: string; price: string; img: string; colors?: string[] };
type Hotspot = { x: number; y: number; product: Product };
type Look = { title: string; image: string; hotspots: Hotspot[] };

const LOOKS: Look[] = [
  {
    title: "City Layers",
    image: "https://images.unsplash.com/photo-1520975693412-634f0a6eb5bb?w=2000&fm=png&q=80",
    hotspots: [
      { x: 62, y: 38, product: { title: "Structured Jacket", price: "$149", img: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&fm=png&q=80", colors: ["#065F46", "#D1FAE5"] } },
      { x: 48, y: 70, product: { title: "Relaxed Pants", price: "$79", img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&fm=png&q=80", colors: ["#064E3B", "#34D399"] } },
    ],
  },
  {
    title: "Weekend Casual",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=2000&fm=png&q=80",
    hotspots: [
      { x: 36, y: 34, product: { title: "Essential Hoodie", price: "$89", img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=900&fm=png&q=80", colors: ["#10B981", "#065F46"] } },
      { x: 62, y: 75, product: { title: "Classic Denim", price: "$99", img: "https://images.unsplash.com/photo-1506629905607-c52b8d3e0679?w=900&fm=png&q=80", colors: ["#1e3a8a", "#0ea5e9"] } },
    ],
  },
];

const Dot = ({ hex }: { hex: string }) => (
  <span className="inline-block size-3 rounded-full border border-black/10 dark:border-white/10" style={{ backgroundColor: hex }} />
);

function Pin({ hs }: { hs: Hotspot }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="absolute" style={{ left: `${hs.x}%`, top: `${hs.y}%` }}>
      <motion.button
        whileHover={{ scale: 1.08 }}
        onClick={() => setOpen((v) => !v)}
        className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300 bg-white/90 p-2 shadow-md backdrop-blur hover:bg-white dark:border-emerald-700 dark:bg-zinc-900/90"
      >
        <span className="block size-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
        <span className="pointer-events-none absolute -inset-2 rounded-full ring-2 ring-emerald-500/20" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="z-10 mt-3 w-[260px] -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hs.product.img} alt={hs.product.title} className="h-16 w-14 rounded-lg object-cover" />
              <div className="min-w-0">
                <h5 className="truncate text-sm font-semibold">{hs.product.title}</h5>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">{hs.product.price}</p>
                <div className="mt-1 flex gap-1.5">{(hs.product.colors || []).map((c, i) => <Dot key={i} hex={c} />)}</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto rounded-md p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button className="mt-3 h-9 w-full rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white">
              Add to bag <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopTheLook() {
  const [active, setActive] = React.useState(0);
  const look = LOOKS[active];

  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h3 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: "serif" }}>
              Shop the <span className="text-emerald-600 dark:text-emerald-400">Look</span>
            </h3>
            <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">Tap the pins to shop items from each editorial look.</p>
          </div>
          <div className="hidden gap-2 md:flex">
            {LOOKS.map((l, i) => (
              <button
                key={l.title}
                onClick={() => setActive(i)}
                className={`rounded-full border px-4 py-2 text-sm transition ${i === active
                    ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-black"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
              >
                {l.title}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-[70vh] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <AnimatePresence mode="wait">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={look.image}
              src={look.image}
              alt={look.title}
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.2, scale: 1.01 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {look.hotspots.map((hs, idx) => <Pin key={idx} hs={hs} />)}

          {/* mobile switcher */}
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-white/70 px-2 py-1 backdrop-blur dark:border-emerald-400/50 dark:bg-zinc-900/70 md:hidden">
            {LOOKS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`mx-1 inline-block h-2 w-2 rounded-full ${i === active ? "bg-emerald-600 dark:bg-emerald-400" : "bg-emerald-600/40 dark:bg-emerald-400/40"}`}
                aria-label={`Look ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
