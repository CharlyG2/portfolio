"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
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
      setVisible(true);
    };
    // se esconde al salir de la ventana, en vez de quedar congelado en el borde
    const leave = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const over = (e) => {
      const el = e.target.closest("a, button, [data-cursor-hover]");
      setHovering(!!el);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (isTouch || !ready) return null;

  // Recoloreado a la paleta real (terracota/salvia) — antes usaba azul y
  // ámbar sueltos, sin relación con el resto del sitio.
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[999] mix-blend-difference"
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.6 : hovering ? 0 : 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", background: "#F7F1E4" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[998] mix-blend-difference"
        animate={{
          width: hovering ? 56 : 28,
          height: hovering ? 56 : 28,
          scale: pressed ? 0.82 : 1,
          borderColor: hovering ? "#AC5142" : "#F7F1E4",
          opacity: visible ? (hovering ? 1 : 0.6) : 0,
        }}
        transition={{
          default: { type: "spring", stiffness: 380, damping: 28, mass: 0.6 },
          borderColor: { duration: 0.25 },
          opacity: { duration: 0.25 },
        }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
