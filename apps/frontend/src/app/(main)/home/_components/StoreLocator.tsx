"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocateFixed, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger } from "@/components/animations/presets";
import MotionSection from "@/components/MotionSection";

export default function StoreLocator() {
  return (
    <MotionSection className="px-5 py-20" variants={stagger(0.12)}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div variants={fadeUp(14)}>
          <h3 className="text-3xl font-bold" style={{ fontFamily: "serif" }}>
            Find a <span className="text-emerald-600 dark:text-emerald-400">store</span>
          </h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Experience the collection in person. Try fits, feel fabrics, get styled.
          </p>
          <motion.div variants={stagger(0.06)} className="mt-6 flex items-center gap-3">
            <motion.div variants={fadeUp(10)}><Input placeholder="Enter city or postcode" className="h-12 rounded-full" /></motion.div>
            <motion.div variants={fadeUp(10)}>
              <Button className="h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 px-6">
                <LocateFixed className="mr-2 h-4 w-4" /> Locate
              </Button>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeUp(12)} className="mt-6 flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> Karachi, Lahore, Islamabad — more coming.
          </motion.div>
        </motion.div>

        <motion.div variants={scaleIn} className="h-[360px] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <img className="size-full object-cover" alt="map" src="https://images.unsplash.com/photo-1505062051007-41c93fa360ce?w=1600&fm=jpg&q=80" />
        </motion.div>
      </div>
    </MotionSection>
  );
}