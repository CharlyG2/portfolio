import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

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
    text: "Viajero Protegido y Viajero Frecuente, cotizados y comparados en una sola experiencia en vez de dos landings separadas.",
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
    text: "Comunicar un alza de cobertura a clientes de alto siniestro sin esconder nada. Publicación pendiente de material final.",
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

        <div className="mt-8 divide-y divide-line border-y border-line">
          {cases.map((c, i) => {
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Wrapper
                  {...wrapperProps}
                  className={`group flex flex-col md:flex-row md:items-center gap-5 md:gap-8 py-8 ${
                    c.live ? "cursor-pointer" : "cursor-default opacity-70"
                  }`}
                >
                  <span className="font-mono text-sm text-mutedLight w-8 shrink-0">
                    {c.tag}
                  </span>

                  <div className="relative w-full md:w-28 h-20 rounded-lg overflow-hidden border border-line bg-ink2 shrink-0">
                    {c.thumb ? (
                      <Image
                        src={c.thumb}
                        alt=""
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-mutedLight">
                        próximamente
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3
                        className={`font-display text-xl md:text-2xl text-paper ${
                          c.live ? "group-hover:text-signalSoft transition-colors" : ""
                        }`}
                      >
                        {c.title}
                      </h3>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${
                          c.live
                            ? "border-amber/40 text-amber"
                            : "border-line text-muted"
                        }`}
                      >
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
