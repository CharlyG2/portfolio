const words = [
  "PRODUCT DESIGN",
  "DESIGN SYSTEMS",
  "RESEARCH",
  "DATOS",
  "SISTEMAS",
  "NEGOCIO",
];

export default function Marquee() {
  const track = [...words, ...words, ...words];
  return (
    <div className="relative bg-ink py-5 overflow-hidden -rotate-1 scale-105">
      <div className="flex whitespace-nowrap animate-marquee">
        {track.map((w, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl mx-6 flex items-center gap-6"
          >
            <span
              className={
                i % 4 === 0
                  ? "text-signalSoft"
                  : i % 4 === 1
                  ? "text-amber"
                  : i % 4 === 2
                  ? "text-mint"
                  : "text-rose"
              }
            >
              {w}
            </span>
            <span className="text-white/30 text-sm">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
