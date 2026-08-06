import MagneticLink from "./MagneticLink";

export default function Footer() {
  return (
    <footer className="py-24 md:py-32 bg-ink relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/4 w-[300px] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #3D5AFE 0%, transparent 70%)" }}
      />
      <div className="max-w-content mx-auto px-6 md:px-10 relative">
        <p className="font-display text-3xl md:text-5xl text-white max-w-2xl leading-tight">
          ¿Construimos el próximo producto juntos?
        </p>
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-4 font-mono text-sm">
          <MagneticLink
            href="mailto:gourvestoro@gmail.com"
            className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-signal hover:border-signal transition-colors"
          >
            gourvestoro@gmail.com
          </MagneticLink>
          <MagneticLink
            href="https://linkedin.com/in/charlygourves"
            target="_blank"
            className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-mint hover:border-mint transition-colors"
          >
            linkedin.com/in/charlygourves
          </MagneticLink>
          <MagneticLink
            href="https://behance.net/elnido"
            target="_blank"
            className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-white hover:bg-rose hover:border-rose transition-colors"
          >
            behance.net/elnido
          </MagneticLink>
        </div>
        <p className="mt-16 text-xs text-white/40 font-mono">
          Santiago, Chile — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
