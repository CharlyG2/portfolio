"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Link que sigue un poco al cursor. Usa valores de movimiento con resorte
// (no estado de React), así no re-renderiza en cada movimiento del mouse y
// al soltarlo vuelve a su lugar con inercia en vez de un salto.
const SPRING = { stiffness: 260, damping: 20, mass: 0.5 };

export default function MagneticLink({ href, children, className = "", target }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const handleMouseMove = (e) => {
    if (reduce) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.22);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {children}
    </motion.a>
  );
}
