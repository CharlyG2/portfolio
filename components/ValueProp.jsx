import Reveal from "./Reveal";

const nodes = [
  { label: "Product", color: "#3D5AFE" },
  { label: "UX", color: "#0EA5A0" },
  { label: "Systems", color: "#FFB020" },
  { label: "Business", color: "#F43F5E" },
  { label: "Technology", color: "#AC5142" },
];

export default function ValueProp() {
  return (
    <section className="py-20 md:py-28 border-t border-line">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 md:gap-x-5">
            {nodes.map((n, i) => (
              <div key={n.label} className="flex items-center gap-x-3 md:gap-x-5">
                <span
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-medium"
                  style={{ color: n.color }}
                >
                  {n.label}
                </span>
                {i < nodes.length - 1 && (
                  <span className="text-mutedLight text-xl md:text-2xl">×</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-muted text-sm md:text-base mt-6 max-w-xl mx-auto">
            Ahí es donde vivo — no solo en la pantalla, en la intersección de
            las cinco.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
