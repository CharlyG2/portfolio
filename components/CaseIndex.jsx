import Link from "next/link";
import Reveal from "./Reveal";

const cases = [
  {
    slug: "design-system",
    tag: "01",
    status: "caso completo",
    title: "El Design System de BICE VIDA",
    text: "Cómo se construyó, con qué metodología, y qué pasó cuando los desarrolladores empezaron a usarlo de verdad.",
    stat: "89 componentes en producción",
    live: true,
  },
  {
    slug: "funnel-csi",
    tag: "02",
    status: "en construcción",
    title: "Reducir el funnel de contratación CSI",
    text: "De 10 a 8 pasos, apoyado en Ley de Hick y Ley de Miller. Publicación pendiente de material final.",
    stat: "análisis con datos reales de mayo 2026",
    live: false,
  },
  {
    slug: "renovacion-imtt-207",
    tag: "03",
    status: "en construcción",
    title: "Renovación transparente de planes",
    text: "Comunicar un alza de cobertura a clientes de alto siniestro sin esconder nada. Publicación pendiente de material final.",
    stat: "3 ramas de decisión mapeadas",
    live: false,
  },
];

export default function CaseIndex() {
  return (
    <section id="casos" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-signalSoft mb-4">casos de estudio</p>
        </Reveal>

        <div className="mt-8 divide-y divide-line border-y border-line">
          {cases.map((c, i) => {
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Wrapper
                  {...wrapperProps}
                  className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 ${
                    c.live ? "cursor-pointer" : "cursor-default opacity-70"
                  }`}
                >
                  <span className="font-mono text-sm text-mutedLight w-10 shrink-0">
                    {c.tag}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className={`font-display text-xl md:text-2xl text-paper ${
                          c.live ? "group-hover:text-signalSoft transition-colors" : ""
                        }`}
                      >
                        {c.title}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-line text-muted">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted max-w-xl">{c.text}</p>
                  </div>
                  <div className="font-mono text-xs text-mutedLight md:text-right shrink-0">
                    {c.stat}
                  </div>
                </Wrapper>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
