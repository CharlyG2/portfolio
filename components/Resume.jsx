import Reveal from "./Reveal";

export default function Resume() {
  return (
    <section id="cv" className="py-16 md:py-20 border-t border-line bg-paperSoft">
      <div className="max-w-content mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Reveal>
          <p className="eyebrow text-rust mb-2">cv</p>
          <p className="font-display text-xl md:text-2xl text-ink max-w-md leading-snug">
            Mi experiencia, resultados y formación en un PDF de una página.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <a
            href="/files/charly-gourves-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="press group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper hover:bg-rust hover:shadow-[0_10px_24px_-12px_rgba(172,81,66,0.7)] shrink-0"
          >
            Descargar CV{" "}
            <span aria-hidden="true" className="inline-block transition-transform duration-base group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
