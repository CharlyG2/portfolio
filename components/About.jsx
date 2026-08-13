import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-[0.7fr_1fr] gap-12">
        <Reveal>
          <p className="eyebrow text-rust mb-4">sobre mí</p>
          <h2 className="font-display text-2xl md:text-3xl text-ink leading-snug">
            No siempre quise ser Product Designer.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="space-y-5 text-base md:text-lg text-muted leading-relaxed">
            <p>
              Empecé en diseño gráfico. Ese ojo por el detalle visual
              sigue ahí — solo que ahora lo aplico a sistemas completos, no
              a una pieza suelta.
            </p>
            <p>
              Me interesa el cruce entre negocio y experiencia: entender
              por qué una empresa toma una decisión, y traducir eso en algo
              que la gente pueda usar sin fricción. Los Design Systems son
              donde más cómodo me siento — ahí es donde el criterio
              individual se convierte en algo que un equipo entero puede
              sostener.
            </p>
            <p>
              Trabajo mejor cuando puedo hablar tanto con quien define el
              negocio como con quien escribe el código — el diseño que
              importa vive en esa conversación, no en una pantalla
              aislada.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
