import Reveal from "./Reveal";

export default function Resume() {
  return (
    <section id="cv" className="py-16 md:py-20 border-t border-line bg-paperSoft/60">
      <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Reveal>
          <p className="text-sm text-muted max-w-md">
            El portafolio cuenta la historia mejor que el CV — pero si
            necesitas el resumen formal para RRHH, acá está.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href="/files/charly-gourves-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-5 py-3 rounded-full border border-rust text-rust hover:bg-rust hover:text-white transition-colors shrink-0"
          >
            Descargar CV ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}
