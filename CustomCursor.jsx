"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });
  const ringX = useSpring(x, { stiffness: 200, damping: 28 });
  const ringY = useSpring(y, { stiffness: 200, damping: 28 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }
    setReady(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const el = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (isTouch || !ready) return null;

  // Recoloreado a la paleta real (terracota/salvia) — antes usaba azul y
  // ámbar sueltos, sin relación con el resto del sitio.
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", background: "#F7F1E4" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[998] mix-blend-difference"
        animate={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          borderColor: hovering ? "#AC5142" : "#F7F1E4",
          opacity: hovering ? 1 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
