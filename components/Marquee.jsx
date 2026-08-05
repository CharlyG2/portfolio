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
    <div className="relative border-y border-line bg-ink2/60 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {track.map((w, i) => (
          <span
            key={i}
            className="font-display text-xl md:text-2xl mx-6 flex items-center gap-6"
          >
            <span
              className={
                i % 3 === 0
                  ? "text-signalSoft"
                  : i % 3 === 1
                  ? "text-amber"
                  : "text-mint"
              }
            >
              {w}
            </span>
            <span className="text-mutedLight text-sm">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
