import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

const colorMap = {
  signal: { bg: "bg-signal", border: "border-signal/30", text: "text-signal", groupHover: "group-hover:text-signal", tag: "bg-signal/10 text-signal" },
  mint: { bg: "bg-mint", border: "border-mint/30", text: "text-mint", groupHover: "group-hover:text-mint", tag: "bg-mint/10 text-mint" },
  amber: { bg: "bg-amber", border: "border-amber/30", text: "text-amber", groupHover: "group-hover:text-amber", tag: "bg-amber/10 text-amber" },
  rose: { bg: "bg-rose", border: "border-rose/30", text: "text-rose", groupHover: "group-hover:text-rose", tag: "bg-rose/10 text-rose" },
};

const cases = [
  {
    slug: "design-system",
    color: "signal",
    role: "Product Designer · BICE VIDA · Chile",
    industries: "Insurtech · Design Systems",
    title: "El Design System de BICE VIDA",
    impactStat: "89", impactLabel: "componentes en producción",
    tags: ["Design System", "Liderazgo de equipo", "Figma · Storybook"],
    thumb: "/images/csi-landing.png",
    live: true,
  },
  {
    slug: "landing-viajes",
    color: "mint",
    role: "Product Designer · BICE VIDA · Chile",
    industries: "Insurtech · Travel",
    title: "Unificar dos seguros de viaje en una landing",
    impactStat: "+16%", impactLabel: "visitas · +2% contratación",
    tags: ["Landing", "Research", "Conversión"],
    thumb: "/images/viaje-landing-unificada.png",
    live: true,
  },
  {
    slug: "funnel-csi",
    color: "amber",
    role: "Product Designer · BICE VIDA · Chile",
    industries: "Insurtech · Health",
    title: "Reducir el funnel de contratación CSI",
    impactStat: "-12%", impactLabel: "abandono · +2% contratación",
    tags: ["Funnel", "UX Laws", "Datos"],
    thumb: null,
    live: true,
  },
  {
    slug: "beliv",
    color: "rose",
    role: "Design Lead (sprint) · BICE VIDA · Chile",
    industries: "Wellness · Mobile App",
    title: "Beliv: una app completa en un sprint de 3 días",
    impactStat: "8+", impactLabel: "pantallas en 3 días",
    tags: ["Mobile App", "Design Sprint", "Liderazgo"],
    thumb: "/images/beliv-home.png",
    live: true,
  },
  {
    slug: "este-portafolio",
    color: "amber",
    role: "Product Designer · Proyecto personal · Chile",
    industries: "Design System · Proceso",
    title: "Este mismo portafolio, como caso de estudio",
    impactStat: "6", impactLabel: "casos, un solo sistema de diseño",
    tags: ["Proceso", "Design System", "Claude · Cursor · GitHub"],
    thumb: null,
    live: true,
  },
  {
    slug: "renovacion-imtt-207",
    color: "signal",
    role: "Product Designer · BICE VIDA · Chile",
    industries: "Insurtech · Health",
    title: "Renovación transparente de planes",
    impactStat: null, impactLabel: "[AGREGAR MÉTRICA] — en construcción",
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
            Seis proyectos reales, sin métricas inventadas.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {cases.map((c, i) => {
            const colors = colorMap[c.color];
            const Wrapper = c.live ? Link : "div";
            const wrapperProps = c.live ? { href: `/casos/${c.slug}` } : {};
            return (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Wrapper
                  {...wrapperProps}
                  className={`group grid md:grid-cols-[1fr_auto] items-center gap-6 py-8 md:py-10 ${
                    c.live ? "cursor-pointer" : "cursor-default opacity-60"
                  }`}
                >
                  <div>
                    <p className="font-mono text-xs text-mutedLight mb-2">
                      {c.role} <span className="mx-1">|</span> {c.industries}
                    </p>
                    <h3
                      className={`font-display text-2xl md:text-3xl text-ink mb-4 transition-colors ${
                        c.live ? colors.groupHover : ""
                      }`}
                    >
                      {c.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-1">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-full ${colors.tag}`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {c.live && (
                      <span className={`inline-block mt-3 font-mono text-xs ${colors.text}`}>
                        Ver caso →
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-6 justify-self-start md:justify-self-end">
                    {c.thumb && (
                      <div className="hidden sm:block relative w-16 h-28 rounded-lg overflow-hidden border-2 border-white shadow-lg shrink-0">
                        <Image
                          src={c.thumb}
                          alt=""
                          fill
                          className="object-cover object-top"
                          sizes="64px"
                        />
                      </div>
                    )}
                    <div className="text-left md:text-right shrink-0">
                      {c.impactStat ? (
                        <div
                          className="font-impact"
                          style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
                        >
                          <span className={colors.text}>{c.impactStat}</span>
                        </div>
                      ) : (
                        <div className="font-mono text-xs text-mutedLight italic max-w-[160px]">
                          {c.impactLabel}
                        </div>
                      )}
                      {c.impactStat && (
                        <p className="text-xs text-muted mt-1 max-w-[160px]">
                          {c.impactLabel}
                        </p>
                      )}
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
