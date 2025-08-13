"use client";

import * as React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Sparkles, ArrowRight, Truck, RefreshCcw, ShieldCheck } from "lucide-react";
import { RetroGrid, MagneticButton, useAurora } from "./primitives";

export default function Hero() {
  const bg = useAurora();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const controls = useAnimation();
  React.useEffect(() => { if (inView) controls.start("visible"); }, [inView, controls]);

  const variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.2 } } };
  const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } };

  return (
    <motion.section className="overflow-hidden py-5 sm:px-20">
      <motion.section
        ref={ref}
        style={{ backgroundImage: bg }}
        className="relative min-h-[92vh] overflow-hidden rounded-[40px]"
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        <RetroGrid className="opacity-30" />

        <div
          className="pointer-events-none absolute inset-0
            bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]
            dark:bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),transparent_60%)]
          "
        />

        <motion.div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-5 pb-24 pt-36 text-center md:pt-44">
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-emerald-700 backdrop-blur dark:border-emerald-400/60 dark:bg-emerald-400/10 dark:text-emerald-200"
          >
            <Sparkles className="h-4 w-4" /> New Season • AW’25
          </motion.span>

          <motion.h1 variants={item} className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl" style={{ fontFamily: "serif" }}>
            IMMERSIO
          </motion.h1>

          <motion.p variants={item} className="mx-auto mb-10 max-w-2xl text-base text-zinc-900/90 dark:text-white/85 md:text-lg">
            Luxury essentials for Men & Women — hoodies, jackets, shirts, and pants crafted for comfort, cut for confidence.
          </motion.p>

          <motion.div variants={item} className="flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton className="bg-emerald-600 text-white hover:bg-emerald-700">
              Shop Men <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
            <MagneticButton className="border border-emerald-600 bg-transparent text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-200 dark:hover:bg-emerald-400/10">
              Shop Women <ArrowRight className="ml-2 h-5 w-5" />
            </MagneticButton>
          </motion.div>

          <div className="mt-14 grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-3">
            <USP icon={Truck} title="Free Shipping" desc="On orders over $100" />
            <USP icon={RefreshCcw} title="Easy Returns" desc="30-day hassle-free" />
            <USP icon={ShieldCheck} title="Secure Checkout" desc="SSL & PCI compliant" />
          </div>
        </motion.div>
      </motion.section>
    </motion.section>
  );
}

function USP({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string; }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border p-4 backdrop-blur border-emerald-200 bg-emerald-50/70 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-50">
      <Icon className="h-5 w-5" />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[11px] opacity-80">{desc}</p>
      </div>
    </div>
  );
}