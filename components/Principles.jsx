import Reveal from "./Reveal";

const principles = [
  {
    tag: "at",
    title: "Empezar por lo más pequeño",
    text: "Un botón mal definido se rompe en cien pantallas distintas. Prefiero resolver bien la unidad mínima antes de escalar a flujos completos.",
  },
  {
    tag: "ml",
    title: "El criterio se apoya en datos, no en gusto",
    text: "Card sorting, analíticas de funnel, tests de usabilidad. Si una decisión no se puede justificar con evidencia, la trato como hipótesis, no como verdad.",
  },
  {
    tag: "or",
    title: "Transparencia, incluso cuando incomoda",
    text: "En seguros, la letra chica destruye confianza. Prefiero una pantalla que explique un alza de precio con claridad a una que la esconda bien diseñada.",
  },
];

export default function Principles() {
  return (
    <section className="py-24 md:py-32 border-t border-line bg-ink2/40">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-signalSoft mb-4">cómo pienso</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 mt-8">
          {principles.map((p, i) => (
            <Reveal key={p.tag} delay={i * 0.08}>
              <div
                className={`font-mono text-xs mb-4 ${
                  i === 1 ? "text-amber" : "text-mutedLight"
                }`}
              >
                &lt;{p.tag}&gt;
              </div>
              <h3 className="font-display text-xl text-paper mb-3">
                {p.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
