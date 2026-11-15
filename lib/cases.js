// Orden de los casos para la navegación "siguiente caso" al final de cada página.
export const CASE_ORDER = [
  { slug: "design-system", title: "Design System de BICE VIDA", label: "Caso 01" },
  { slug: "landing-viajes", title: "Landing de seguros de viaje", label: "Caso 02" },
  { slug: "funnel-csi", title: "Funnel de contratación CSI", label: "Caso 03" },
  { slug: "beliv", title: "Beliv: app de bienestar", label: "Caso 04" },
  { slug: "chatbot", title: "Chatbot con IA", label: "Caso 05" },
  { slug: "este-portafolio", title: "Así se construyó este sitio", label: "Bonus" },
];

export function adjacentCases(slug) {
  const i = CASE_ORDER.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  const n = CASE_ORDER.length;
  return { prev: CASE_ORDER[(i - 1 + n) % n], next: CASE_ORDER[(i + 1) % n] };
}
