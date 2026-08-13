import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-md">
      <div className="max-w-content mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm tracking-wide text-white">
          <span className="tag-bracket">cg</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/60">
          <Link href="/#casos" className="hover:text-white transition-colors">
            Trabajo
          </Link>
          <Link href="/#como-pienso" className="hover:text-white transition-colors">
            Cómo pienso
          </Link>
          <Link href="/#sobre-mi" className="hover:text-white transition-colors">
            Sobre mí
          </Link>
          <Link href="/#cv" className="hover:text-white transition-colors">
            CV
          </Link>
          <a
            href="mailto:gourvestoro@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
