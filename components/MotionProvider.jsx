"use client";

import { MotionConfig } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";

// Valores por defecto para todas las animaciones de Framer Motion del sitio.
// reducedMotion="user": si la persona pidió menos movimiento en su sistema,
// Framer quita los desplazamientos y deja solo los cambios de opacidad.
export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DUR.slow, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}
