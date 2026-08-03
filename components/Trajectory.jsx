import Reveal from "./Reveal";

const roles = [
  { period: "2023 — presente", role: "Product Designer", place: "BICE VIDA" },
  { period: "2022 — 2023", role: "UI Designer", place: "RedCapital" },
  { period: "2021 — 2022", role: "UX/UI Designer", place: "GrupoBIBA" },
  { period: "2021", role: "UI Designer", place: "Dartel" },
  { period: "2017 — 2021", role: "Visual/CX Designer", place: "Becton Dickinson" },
];

export default function Trajectory() {
  return (
    <section id="trayectoria" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-[1fr_1.4fr] gap-12">
        <Reveal>
          <p className="eyebrow text-signalSoft mb-4">trayectoria</p>
          <h2 className="font-display text-2xl md:text-3xl text-paper leading-snug">
            Empecé en diseño gráfico. Terminé pensando en sistemas.
          </h2>
          <p className="text-sm text-muted mt-4 leading-relaxed max-w-sm">
            Diseño Gráfico Publicitario, certificación Scrum y formación
            continua en UX/UI (IxDF). El camino no fue lineal — y eso es
            justamente lo que me hace más cuidadoso con la gente que recién
            entra a producto desde otras disciplinas.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {roles.map((r) => (
              <div
                key={r.place}
                className="flex items-center justify-between py-4 gap-4"
              >
                <span className="font-mono text-xs text-mutedLight w-32 shrink-0">
                  {r.period}
                </span>
                <span className="text-sm text-paper flex-1">{r.role}</span>
                <span className="text-sm text-muted">{r.place}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
