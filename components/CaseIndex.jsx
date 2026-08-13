import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const colorMap = {
  signal: { bg: "bg-signal", bannerText: "text-white/90", border: "border-signal/30", text: "text-signal", tag: "bg-signal/10 text-signal" },
  mint: { bg: "bg-mint", bannerText: "text-white/90", border: "border-mint/30", text: "text-mint", tag: "bg-mint/10 text-mint" },
  amber: { bg: "bg-amber", bannerText: "text-ink/85", border: "border-amber/30", text: "text-amber", tag: "bg-amber/10 text-amber" },
  rose: { bg: "bg-rose", bannerText: "text-white/90", border: "border-rose/30", text: "text-rose", tag: "bg-rose/10 text-rose" },
};

const cases = [
  {
    slug: "design-system",
    color: "signal",
    client: "BICE VIDA",
    category: "Design System",
    title: "El Design System de BICE VIDA",
    description: "Metodología atómica propuesta y liderada de punta a punta, con reglas de entrada y salida definidas junto al equipo de desarrollo.",
    impactStat: "89", impactLabel: "componentes en producción (app + web)",
    tags: ["Design System", "Liderazgo de equipo", "Figma · Storybook"],
    thumb: "/images/csi-landing.png",
    live: true,
  },
  {
    slug: "landing-viajes",
    color: "mint",
    client: "BICE VIDA",
    category: "Seguro de Viaje",
    title: "Unificar dos seguros de viaje en una landing",
    description: "Viajero Protegido y Viajero Frecuente, cotizados y comparados lado a lado en una sola experiencia en vez de dos landings separadas.",
    impactStat: "+16%", impactLabel: "visitas · +2% contratación",
    tags: ["Landing", "Research", "Conversión"],
    thumb: "/images/viaje-landing-unificada.png",
    live: true,
  },
  {
    slug: "funnel-csi",
    color: "amber",
    client: "BICE VIDA",
    category: "Seguro de Salud",
    title: "Reducir el funnel de contratación CSI",
    description: "De 10 a 8 pasos, priorizando con datos reales de abandono y dos leyes de UX (Hick y Miller) como criterio de decisión.",
    impactStat: "-12%", impactLabel: "abandono · +2% contratación",
    tags: ["Funnel", "UX Laws", "Datos"],
    thumb: null,
    live: true,
  },
  {
    slug: "beliv",
    color: "rose",
    client: "BICE VIDA",
    category: "App de Bienestar",
    title: "Beliv: una app completa en un sprint de 3 días",
    description: "Lideré el equipo de diseño en un design sprint de 3 días, de la idea a las pantallas completas de onboarding, home, salud, social y gamificación.",
    impactStat: "8+", impactLabel: "pantallas diseñadas en un sprint de 3 días",
    tags: ["Mobile App", "Design Sprint", "Liderazgo"],
    thumb: "/images/beliv-home.png",
    live: true,
  },
  {
    slug: "este-portafolio",
    color: "amber",
    client: "Proyecto personal",
    category: "Portafolio",
    title: "Este mismo portafolio, como caso de estudio",
    description: "Dirigí cada decisión de diseño e iteré con Claude para la implementación, usando Cursor y GitHub Desktop para el flujo de publicación.",
    impactStat: "6", impactLabel: "casos de estudio, un solo sistema de diseño",
    tags: ["Proceso", "Design System", "Claude · Cursor · GitHub"],
    thumb: null,
    live: true,
  },
  {
    slug: "renovacion-imtt-207",
    color: "signal",
    client: "BICE VIDA",
    category: "Seguro de Salud",
    title: "Renovación transparente de planes",
    description: "Comunicar un alza de cobertura a clientes de alto siniestro sin esconder nada — tres ramas de decisión: aceptar, rechazar o no hacer nada.",
    impactStat: null, impactLabel: "[AGREGAR MÉTRICA] — caso en construcción",
    tags: ["Flujo complejo", "Ética de producto"],
    thumb: null,
    live: false,
  },
];

export default function CaseIndex() {
  return (
    <section id="casos" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-rust mb-4">trabajo</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink max-w-xl">
            Cinco proyectos reales, sin métricas inventadas.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-12">
          {cases.map((c, i) => {
            const colors = colorMap[c.color];
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.06}>
                <Wrapper
                  {...wrapperProps}
                  className={`group block rounded-2xl border ${
                    c.live ? "border-line hover:" + colors.border : "border-line opacity-60"
                  } overflow-hidden transition-colors h-full flex flex-col ${
                    c.live ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* branded banner */}
                  <div className={`relative aspect-[16/10] ${colors.bg} flex items-end overflow-hidden`}>
                    {c.thumb ? (
                      <div className="absolute right-6 bottom-[-10%] w-[42%] rounded-t-xl overflow-hidden border-4 border-white/90 shadow-2xl group-hover:-translate-y-1 transition-transform">
                        <div className="relative w-full aspect-[9/17]">
                          <Image
                            src={c.thumb}
                            alt=""
                            fill
                            className="object-cover object-top"
                            sizes="240px"
                          />
                        </div>
                      </div>
                    ) : null}
                    <span className={`relative z-10 p-6 font-display ${colors.bannerText} text-lg max-w-[55%]`}>
                      {c.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs text-mutedLight font-mono mb-2">
                      {c.client} · {c.category}
                    </p>
                    <h3 className="font-display text-xl text-ink mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {c.description}
                    </p>

                    <div className="mt-auto flex items-baseline gap-3 mb-5 pt-4 border-t border-line">
                      {c.impactStat ? (
                        <>
                          <span className={`font-mono text-3xl font-medium ${colors.text}`}>
                            {c.impactStat}
                          </span>
                          <span className="text-xs text-muted leading-snug">
                            {c.impactLabel}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs text-mutedLight italic">
                          {c.impactLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${colors.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
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
