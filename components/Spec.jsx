"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInspect } from "./InspectContext";

export default function Spec({ label, className = "" }) {
  const { inspecting } = useInspect();
  return (
    <AnimatePresence>
      {inspecting && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className={`pointer-events-none absolute z-30 font-mono text-[10px] text-mint bg-ink/90 border border-mint/40 px-1.5 py-0.5 rounded whitespace-nowrap ${className}`}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
