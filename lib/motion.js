// Un solo sistema de movimiento para todo el sitio. Las mismas curvas y
// duraciones viven también como variables CSS (--ease-*, --dur-*) en
// globals.css y como tokens de Tailwind (ease-out-soft, duration-base…),
// así un hover en CSS y un reveal en Framer Motion se sienten iguales.
// Esto es, literalmente, pensar en sistemas aplicado a motion.

// Curvas
// out: entrada suave y larga, para cosas que aparecen (reveals, paneles).
export const EASE = [0.22, 1, 0.36, 1];
// expo: más decidida, para titulares y entradas grandes.
export const EASE_EXPO = [0.16, 1, 0.3, 1];
// inOut: para cosas que ya están en pantalla y se mueven de un lugar a otro.
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

// Duraciones (segundos)
export const DUR = {
  fast: 0.18, // feedback de hover y press
  base: 0.32, // cambios de estado (colores, bordes)
  slow: 0.6, // apariciones
  reveal: 0.8, // reveals al hacer scroll
};
export const DURATION = DUR.slow;

// Separación entre elementos que aparecen en secuencia
export const STAGGER = 0.07;

// Resortes
export const SPRING = { stiffness: 120, damping: 18 };
export const SPRING_SOFT = { type: "spring", stiffness: 170, damping: 26, mass: 0.9 };
export const SPRING_SNAPPY = { type: "spring", stiffness: 380, damping: 30, mass: 0.6 };
