"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInspect } from "./InspectContext";

export default function GridOverlay() {
  const { inspecting } = useInspect();
  return (
    <AnimatePresence>
      {inspecting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-20"
        >
          <div className="max-w-content mx-auto h-full px-6 md:px-10 grid grid-cols-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-mint/[0.06] border-x border-mint/20 h-full" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
