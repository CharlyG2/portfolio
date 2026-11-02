import Reveal from "./Reveal";

export default function Resume() {
  return (
    <section id="cv" className="py-16 md:py-20 border-t border-line bg-paperSoft/60">
      <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Reveal>
          <p className="text-sm text-muted max-w-md">
            Mi experiencia, resultados y formación en un PDF de dos
            páginas.
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
          <a
            href="/files/charly-gourves-cv-ats.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-center font-mono text-[11px] text-muted underline underline-offset-2 hover:text-rust"
          >
            versión solo texto (1 página)
          </a>
        </Reveal>
      </div>
    </section>
  );
}
