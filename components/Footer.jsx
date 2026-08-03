export default function Footer() {
  return (
    <footer className="py-24 md:py-32 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <p className="font-display text-3xl md:text-5xl text-paper max-w-2xl leading-tight">
          ¿Construimos el próximo sistema juntos?
        </p>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm text-muted">
          <a href="mailto:gourvestoro@gmail.com" className="hover:text-signalSoft transition-colors">
            gourvestoro@gmail.com
          </a>
          <a href="https://linkedin.com/in/charlygourves" target="_blank" className="hover:text-signalSoft transition-colors">
            linkedin.com/in/charlygourves
          </a>
          <a href="https://behance.net/elnido" target="_blank" className="hover:text-signalSoft transition-colors">
            behance.net/elnido
          </a>
        </div>
        <p className="mt-16 text-xs text-mutedLight font-mono">
          Santiago, Chile — {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
