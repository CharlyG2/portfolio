import MagneticLink from "./MagneticLink";

export default function Footer() {
  return (
    <footer className="py-24 md:py-32 bg-paperSoft border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <p className="font-display text-3xl md:text-5xl text-ink max-w-2xl leading-tight">
          ¿Tienes un problema que valga la pena resolver?
        </p>
        <div className="mt-10 flex flex-wrap gap-x-4 gap-y-4 font-mono text-sm">
          <MagneticLink
            href="mailto:gourvestoro@gmail.com"
            className="inline-block px-5 py-2.5 rounded-full border border-line text-ink hover:bg-signal hover:border-signal hover:text-white transition-colors"
          >
            gourvestoro@gmail.com
          </MagneticLink>
          <MagneticLink
            href="https://linkedin.com/in/charlygourves"
            target="_blank"
            className="inline-block px-5 py-2.5 rounded-full border border-line text-ink hover:bg-mint hover:border-mint hover:text-white transition-colors"
          >
            linkedin.com/in/charlygourves
          </MagneticLink>
          <MagneticLink
            href="https://behance.net/elnido"
            target="_blank"
            className="inline-block px-5 py-2.5 rounded-full border border-line text-ink hover:bg-rose hover:border-rose hover:text-white transition-colors"
          >
            behance.net/elnido
          </MagneticLink>
        </div>
        <p className="mt-16 text-xs text-mutedLight font-mono">
          Santiago, Chile — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
