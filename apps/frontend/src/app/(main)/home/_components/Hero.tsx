"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight, RefreshCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { animate, useMotionTemplate, useMotionValue } from "framer-motion";


const useAurora = () => {
  const color = useMotionValue("#10B981");
  React.useEffect(() => {
    animate(color, ["#10B981", "#34D399", "#059669", "#A7F3D0", "#10B981"], {
      ease: "easeInOut", duration: 10, repeat: Infinity, repeatType: "mirror",
    });
  }, [color]);

  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const base = isDark ? "#0a0a0a" : "#f6f6f6";
  return useMotionTemplate`radial-gradient(120% 120% at 50% -10%, ${color}, ${base} 55%)`;
};

const RetroGrid = ({ className = "", angle = 65 }: { className?: string; angle?: number }) => (
  <div
    className={`pointer-events-none absolute size-full overflow-hidden opacity-40 [perspective:200px] ${className}`}
    style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
  >
    <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
      <div className="animate-[grid_30s_linear_infinite] [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw] [background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_0)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_0)]" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
  </div>
);

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
            <Button className="flex">
              Shop Men <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" >
              Shop Women <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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