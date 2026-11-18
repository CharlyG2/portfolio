import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="sobre-mi" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-[0.55fr_1fr] gap-10 md:gap-12 items-start">
        <Reveal>
          <div className="relative w-40 h-52 md:w-48 md:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-2deg] transition-transform duration-slow ease-out-expo hover:rotate-0 hover:-translate-y-1">
            <Image
              src="/images/charly-photo.jpeg"
              alt="Charly Gourves"
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow text-rust mb-4">sobre mí</p>
          <h2 className="font-display text-2xl md:text-4xl text-ink leading-snug mb-8">
            No siempre quise ser Product Designer.
          </h2>
          <div className="space-y-5 text-base md:text-lg text-muted leading-relaxed">
            <p>
              Empecé en diseño gráfico. El ojo para el detalle visual sigue
              ahí, solo que ahora lo aplico a productos y sistemas completos,
              no a piezas sueltas.
            </p>
            <p>
              Me interesa el cruce entre negocio y experiencia: entender
              por qué una empresa toma una decisión y traducirla en algo que
              la gente use sin fricción. Donde más cómodo me siento es en los
              Design Systems: ahí el criterio individual se convierte en algo
              que todo un equipo puede sostener.
            </p>
            <p>
              Trabajo mejor cuando hablo tanto con quien define el negocio
              como con quien escribe el código. El diseño que importa vive en
              esa conversación, no en una pantalla aislada.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
