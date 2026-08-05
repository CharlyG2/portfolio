import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import { PendingPattern, AnalysisPattern } from "./CaseThumbPlaceholder";

const cases = [
  {
    slug: "design-system",
    tag: "01",
    status: "caso completo",
    title: "El Design System de BICE VIDA",
    text: "Cómo se construyó, con qué metodología, y qué pasó cuando los desarrolladores empezaron a usarlo de verdad.",
    stat: "89 componentes en producción",
    thumb: "/images/csi-landing.png",
    live: true,
  },
  {
    slug: "landing-viajes",
    tag: "02",
    status: "caso completo",
    title: "Unificar dos seguros de viaje en una landing",
    text: "Viajero Protegido y Viajero Frecuente, cotizados y comparados en una sola experiencia.",
    stat: "+16% visitas · +2% contratación",
    thumb: "/images/viaje-landing-unificada.png",
    live: true,
  },
  {
    slug: "funnel-csi",
    tag: "03",
    status: "caso completo",
    title: "Reducir el funnel de contratación CSI",
    text: "De 10 a 8 pasos, apoyado en Ley de Hick y Ley de Miller, con datos reales de abandono.",
    stat: "-12% abandono · +2% contratación",
    thumb: null,
    live: true,
  },
  {
    slug: "renovacion-imtt-207",
    tag: "04",
    status: "en construcción",
    title: "Renovación transparente de planes",
    text: "Comunicar un alza de cobertura a clientes de alto siniestro sin esconder nada.",
    stat: "3 ramas de decisión mapeadas",
    thumb: null,
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

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          {cases.map((c, i) => {
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Wrapper
                  {...wrapperProps}
                  className={`group block rounded-2xl border border-line overflow-hidden bg-ink2/40 h-full ${
                    c.live
                      ? "cursor-pointer hover:border-signal/40 transition-colors"
                      : "cursor-default opacity-70"
                  }`}
                >
                  <div className="relative w-full aspect-[16/10] bg-ink2 overflow-hidden">
                    {c.thumb ? (
                      <Image
                        src={c.thumb}
                        alt=""
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, 560px"
                      />
                    ) : c.live ? (
                      <AnalysisPattern />
                    ) : (
                      <PendingPattern />
                    )}
                    <span className="absolute top-4 left-4 font-mono text-xs text-mutedLight bg-ink/80 backdrop-blur px-2 py-1 rounded">
                      {c.tag}
                    </span>
                    <span
                      className={`absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border backdrop-blur ${
                        c.live
                          ? "border-amber/40 text-amber bg-ink/70"
                          : "border-line text-muted bg-ink/70"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3
                      className={`font-display text-xl text-paper mb-2 ${
                        c.live ? "group-hover:text-signalSoft transition-colors" : ""
                      }`}
                    >
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted mb-4">{c.text}</p>
                    <p className="font-mono text-xs text-mutedLight">{c.stat}</p>
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
