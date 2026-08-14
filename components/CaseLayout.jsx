import Link from "next/link";
import Nav from "./Nav";
import Footer from "./Footer";
import Reveal from "./Reveal";

export function CaseHeader({ eyebrow, title, tldr, stats }) {
  return (
    <header className="pt-40 pb-16 md:pt-48 md:pb-20 border-b border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Link
          href="/#casos"
          className="font-mono text-xs text-muted hover:text-rust transition-colors"
        >
          ← volver a casos
        </Link>
        <p className="eyebrow text-muted mt-8 mb-6" style={{ fontSize: "14px" }}>
          <span className="tag-bracket">{eyebrow}</span>
        </p>
        <h1
          className="font-display font-bold text-ink max-w-3xl leading-tight"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          {title}
        </h1>
        <p
          className="text-muted max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(1.125rem, 2vw, 1.375rem)", marginTop: "16px" }}
        >
          {tldr}
        </p>
        {stats && (
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.l}>
                <div className="stat-number text-2xl text-ink">{s.n}</div>
                <div className="text-xs text-muted max-w-[160px] mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function CaseSection({ tag, title, children }) {
  return (
    <Reveal className="py-16 md:py-20 border-b border-line">
      <div className="max-w-content mx-auto px-6 md:px-10 grid md:grid-cols-[200px_1fr] gap-8">
        <div>
          <span className="font-mono text-xs text-mutedLight">
            &lt;{tag}&gt;
          </span>
          <h2 className="font-display text-xl md:text-2xl text-ink mt-2">
            {title}
          </h2>
        </div>
        <div className="text-sm md:text-base text-muted leading-relaxed max-w-2xl space-y-4">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseLayout({ children }) {
  return (
    <main className="bg-paper min-h-screen">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
