"use client";

import * as React from "react";
import { motion, useMotionValue, animate, useMotionTemplate } from "framer-motion";
import { Sun, Moon } from "lucide-react";

/* ------------------------------ RetroGrid ------------------------------ */
export const RetroGrid = ({ className = "", angle = 65 }: { className?: string; angle?: number }) => (
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

/* --------------------------- MagneticButton ---------------------------- */
type MotionButtonProps = React.ComponentProps<typeof motion.button>;

export const MagneticButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className = "", style, onMouseMove, onMouseLeave, ...rest }, forwardedRef) => {
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const setRefs = (el: HTMLButtonElement | null) => {
      btnRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    };
    const x = useMotionValue(0), y = useMotionValue(0);
    const reset = () => { animate(x, 0, { duration: 0.35 }); animate(y, 0, { duration: 0.35 }); };

    return (
      <motion.button
        ref={setRefs}
        className={`relative inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold transition-colors ${className}`}
        style={{ ...(style as any), x, y }}
        onMouseMove={(e) => {
          const el = btnRef.current;
          if (el) {
            const r = el.getBoundingClientRect();
            x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
            y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
          }
          onMouseMove?.(e);
        }}
        onMouseLeave={(e) => { reset(); onMouseLeave?.(e); }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

/* ------------------------------ ThemeToggle ---------------------------- */
export const ThemeToggle = () => {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    const d = localStorage.getItem("theme") === "dark";
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("theme", d ? "dark" : "light");
  };
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {dark ? "Light" : "Dark"}
    </button>
  );
};

/* ------------------------------ useAurora ------------------------------- */
export const useAurora = () => {
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

/* Add once in globals.css:
@keyframes grid { 0% { transform: translateX(0); } 100% { transform: translateX(-60px); } }
*/
