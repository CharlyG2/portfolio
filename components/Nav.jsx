import Link from "next/link";
import { PROFILE } from "@/lib/profile";

const LINKS = [
  { href: "/express#casos", label: "Trabajo" },
  { href: "/express#como-pienso", label: "Cómo pienso" },
  { href: "/express#sobre-mi", label: "Sobre mí" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-2.5 text-ink">
          <span className="font-display font-bold text-[15px]">Charly Gourves</span>
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.14em] text-rust">
            {PROFILE.role.es}
          </span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 font-mono text-xs uppercase tracking-widest text-muted">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hidden md:inline hover:text-rust transition-colors">
              {l.label}
            </Link>
          ))}
          <a
            href="/files/charly-gourves-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline hover:text-rust transition-colors"
          >
            CV
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            className="press rounded-full bg-ink text-paper px-4 py-2 normal-case tracking-normal font-body text-sm font-medium hover:bg-rust"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
