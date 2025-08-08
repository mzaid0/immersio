"use client";
import { useEffect, useState, useRef } from "react";
import { BrandMark } from "./BrandMark";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashAfterHydration() {
  const [ready, setReady] = useState(false);
  const shownOnce = useRef(false);

  useEffect(() => {
    if (shownOnce.current) {
      setReady(true);
      return;
    }

    const fontsReady = (document as any).fonts?.ready ?? Promise.resolve();
    const windowLoad = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });

    Promise.all([fontsReady, windowLoad]).then(() => {
      shownOnce.current = true;
      setReady(true);
    });
  }, []);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="splash-hydration"
          className="fixed inset-0 z-[60] grid place-items-center bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="flex flex-col items-center gap-6">
            <BrandMark />
            <div className="h-1 w-56 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full w-28 bg-white"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "200%"] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
