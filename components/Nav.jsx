import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-paper/80 backdrop-blur-md">
      <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-wide text-ink">
          <span className="tag-bracket">cg</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted">
          <Link href="/#casos" className="hover:text-signal transition-colors">
            Casos
          </Link>
          <Link href="/#trayectoria" className="hover:text-signal transition-colors">
            Trayectoria
          </Link>
          <a
            href="mailto:gourvestoro@gmail.com"
            className="hover:text-signal transition-colors"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
