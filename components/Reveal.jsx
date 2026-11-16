"use client";

import { createContext, useContext } from "react";
import { motion } from "framer-motion";
import { EASE_EXPO, DUR, STAGGER } from "@/lib/motion";

// Aparición al hacer scroll. Sube un poco y se enfoca (de un desenfoque
// mínimo a nítido), con la curva expo del sistema de motion.
//
// Suelto, cada <Reveal> se anima cuando entra en pantalla. Dentro de un
// <RevealGroup>, los hijos se animan en secuencia cuando entra el grupo:
// así una grilla de tarjetas aparece en cascada y no cada una por su lado.

const GroupContext = createContext(false);

// Ojo: dentro de un grupo no se fija `delay`, porque pisaría el escalonado
// que reparte el grupo.
const item = (y, blur) => ({
  hidden: { opacity: 0, y, ...(blur ? { filter: "blur(5px)" } : {}) },
  show: (delay) => ({
    opacity: 1,
    y: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    transition: { duration: DUR.reveal, ease: EASE_EXPO, ...(delay != null ? { delay } : {}) },
  }),
});

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" };

// `blur` queda apagado en bloques grandes (secciones completas): desenfocar
// mucha superficie cuesta en celulares de gama baja.
export default function Reveal({ children, delay = 0, className = "", y = 22, as = "div", blur = true }) {
  const inGroup = useContext(GroupContext);
  const Tag = motion[as];
  if (inGroup) {
    return (
      <Tag className={className} variants={item(y, blur)}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag
      className={className}
      variants={item(y, blur)}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({ children, className = "", stagger = STAGGER, delay = 0, as = "div" }) {
  const Tag = motion[as];
  return (
    <GroupContext.Provider value={true}>
      <Tag
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {children}
      </Tag>
    </GroupContext.Provider>
  );
}
