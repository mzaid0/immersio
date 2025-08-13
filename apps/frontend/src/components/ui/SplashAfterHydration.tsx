"use client";

import { useEffect, useState } from "react";
// import { BrandMark } from "@/components/ui/BrandMark";
import TypingDots from "@/components/ui/TypingDots";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Shows a splash only until fonts + window load finish.
 * Theme-aware colors. Optionally, show once per session with sessionStorage.
 */
export default function SplashAfterHydration({ showOncePerSession = true }: { showOncePerSession?: boolean }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (showOncePerSession && typeof window !== "undefined" && sessionStorage.getItem("splash_shown") === "1") {
      setReady(true);
      return;
    }

    const fontsReady: Promise<unknown> =
      (document as any).fonts?.ready ?? Promise.resolve();
    const windowLoad = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });

    Promise.all([fontsReady, windowLoad]).then(() => {
      if (showOncePerSession) sessionStorage.setItem("splash_shown", "1");
      setReady(true);
    });
  }, [showOncePerSession]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="splash-hydration"
          className="fixed inset-0 z-[60] grid place-items-center bg-background text-foreground"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-6">

            <TypingDots size={64} className="text-emerald-600 dark:text-emerald-400" />

            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}