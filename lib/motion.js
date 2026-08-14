// Un solo sistema de movimiento para todo el sitio — la misma curva que usa
// el parallax del nombre en el hero, reutilizada en cualquier otra
// interacción (cards, hovers). Esto es, literalmente, pensar en sistemas
// aplicado a motion, no un efecto aislado por componente.

export const SPRING = { stiffness: 120, damping: 18 };
export const EASE = [0.22, 1, 0.36, 1];
export const DURATION = 0.7;
