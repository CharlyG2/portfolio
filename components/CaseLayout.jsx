import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";
import { adjacentCases } from "@/lib/cases";

export function CaseHeader({ eyebrow, title, tldr, stats, meta }) {
  return (
    <header className="pt-40 pb-16 md:pt-48 md:pb-20 border-b border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-rust transition-colors"
        >
          ← volver al museo
        </Link>
        <p className="eyebrow text-rust mt-8 mb-6" style={{ fontSize: "13px" }}>
          <span className="tag-bracket">{eyebrow}</span>
        </p>
        <h1
          className="font-display font-bold text-ink max-w-4xl leading-[1.08] tracking-[-0.01em] text-balance"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4.25rem)" }}
        >
          {title}
        </h1>
        <p
          className="text-muted max-w-2xl leading-relaxed mt-6"
          style={{ fontSize: "clamp(1.0625rem, 1.8vw, 1.3125rem)" }}
        >
          {tldr}
        </p>
        {meta && (
          <p className="mt-6 font-mono text-xs text-muted max-w-2xl leading-relaxed">
            {meta}
          </p>
        )}
        {stats && (
          <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl">
            {stats.map((s) => (
              <div key={s.l} className="border-t-2 border-ink pt-4">
                <dt className="sr-only">{s.l}</dt>
                <dd className="font-display font-bold text-[1.75rem] sm:text-4xl md:text-5xl text-ink leading-none tracking-[-0.02em] tabular-nums">
                  {s.n}
                </dd>
                <dd className="text-xs sm:text-sm text-muted mt-2.5 leading-snug max-w-[220px]">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}

export function CaseSection({ tag, title, children }) {
  return (
    <Reveal className="py-16 md:py-20 border-b border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <div>
          <span className="font-mono text-xs text-rust">
            &lt;{tag}&gt;
          </span>
          <h2 className="font-display text-xl md:text-2xl text-ink mt-2">
            {title}
          </h2>
        </div>
        <div className="min-w-0 text-sm md:text-base text-muted leading-relaxed max-w-2xl space-y-4">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function NextCase({ slug }) {
  const { prev, next } = adjacentCases(slug);
  if (!next) return null;
  return (
    <nav aria-label="Más casos" className="border-b border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 py-12 md:py-16 grid sm:grid-cols-2 gap-4">
        <Link
          href={`/casos/${prev.slug}`}
          className="group rounded-2xl border border-line bg-surface p-6 hover:border-ink/40 transition-colors"
        >
          <span className="font-mono text-xs text-muted">← Anterior · {prev.label}</span>
          <span className="block font-display text-lg md:text-xl text-ink mt-2 group-hover:text-rust transition-colors">
            {prev.title}
          </span>
        </Link>
        <Link
          href={`/casos/${next.slug}`}
          className="group rounded-2xl bg-ink p-6 text-paper sm:text-right hover:bg-[#33291f] transition-colors"
        >
          <span className="font-mono text-xs text-paper/65">Siguiente · {next.label} →</span>
          <span className="block font-display text-lg md:text-xl mt-2 group-hover:text-[#8FE9DA] transition-colors">
            {next.title}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default function CaseLayout({ children, slug }) {
  return (
    <main className="bg-paper min-h-screen">
      <Nav />
      {children}
      {slug && <NextCase slug={slug} />}
      <Footer />
    </main>
  );
}
