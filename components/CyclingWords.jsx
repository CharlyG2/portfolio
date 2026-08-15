"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const words = [
  "Product Design",
  "Design Systems",
  "UX Research",
  "UX Writing",
  "Estrategia de negocio",
];

export default function CyclingWords() {
  const [i, setI] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % words.length);
    }, 1800);
    return () => clearInterval(id);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <p className="font-display text-xl md:text-2xl text-ink/80">
        {words[0]}
      </p>
    );
  }

  return (
    <div className="h-8 md:h-9 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={words[i]}
          className="font-display text-xl md:text-2xl text-ink/80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          {words[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
