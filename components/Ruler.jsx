"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInspect } from "./InspectContext";

export default function Ruler() {
  const { inspecting } = useInspect();
  const ticks = [...Array(40)];
  return (
    <AnimatePresence>
      {inspecting && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          className="pointer-events-none fixed top-0 left-0 bottom-0 w-6 z-20 border-r border-mint/20 bg-ink/60 hidden md:block"
        >
          {ticks.map((_, i) => (
            <div
              key={i}
              className="absolute left-0 flex items-center gap-1"
              style={{ top: `${i * 80}px` }}
            >
              <div className="w-2 h-px bg-mint/40" />
              <span className="font-mono text-[8px] text-mint/50">
                {i * 80}
              </span>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
