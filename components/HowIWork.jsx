"use client";

import Reveal from "./Reveal";

// Qué hago en cada etapa del producto y con qué herramientas. Responde
// directo a lo que piden las vacantes de Product Designer: discovery,
// research cuali/cuanti, métricas, colaboración y documentación.
const stages = [
  {
    title: "Discovery e investigación",
    text: "Entrevistas moderadas, encuestas y sesiones con stakeholders para entender el problema de negocio y los dolores de las personas antes de diseñar.",
    tools: ["Entrevistas", "Encuestas", "Workshops"],
  },
  {
    title: "Datos cualitativos y cuantitativos",
    text: "Cruzo analítica de comportamiento con la voz del cliente para encontrar dónde la gente se cae o tiene fricción.",
    tools: ["GA4", "Pendo", "Hotjar", "NPS", "ISN", "CES / CSAT", "Call center"],
  },
  {
    title: "Diseño end-to-end",
    text: "Flujos de usuario, wireframes, prototipos y alta fidelidad para web y mobile, apoyado en el Design System.",
    tools: ["Figma", "Storybook", "Design System"],
  },
  {
    title: "Validación",
    text: "Pruebas de usabilidad y testeo de prototipos antes de pasar a desarrollo. Si la evidencia muestra otro camino, lo sigo.",
    tools: ["Maze", "Lyssna", "Test moderado"],
  },
  {
    title: "Colaboración e implementación",
    text: "Trabajo por sprints con Product Owners, desarrolladores y stakeholders, y reviso indicadores con negocio para medir el impacto.",
    tools: ["Jira", "Scrum", "Review de indicadores"],
  },
  {
    title: "Documentación",
    text: "Dejo registrados hallazgos, decisiones de diseño y procesos para que cualquier equipo pueda retomar el trabajo.",
    tools: ["Confluence", "Airtable"],
  },
];

export default function HowIWork() {
  return (
    <section id="como-trabajo" className="bg-paper py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <p className="eyebrow text-rust mb-4">cómo trabajo</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink max-w-lg mb-12">
            De la investigación a la implementación, con datos en cada paso.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stages.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-line bg-white p-6 h-full flex flex-col">
                <h3 className="font-display text-xl text-ink mb-2">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{s.text}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] rounded-full border border-line px-2.5 py-1 text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
