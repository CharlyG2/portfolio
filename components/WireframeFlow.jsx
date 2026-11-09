// Wireframes de baja fidelidad del flujo de contratación de 8 pasos.
// Son una reconstrucción ilustrativa (los archivos originales quedaron en la
// empresa): muestran la estructura de cada pantalla, no el diseño final.
const screens = [
  {
    step: "Paso 1",
    title: "Datos personales + contacto",
    blocks: ["field", "field", "field", "field", "cta"],
  },
  {
    step: "Paso 3",
    title: "Selección de plan",
    blocks: ["card", "card", "card", "cta"],
  },
  {
    step: "Paso 5",
    title: "Confirmación",
    blocks: ["summary", "line", "line", "check", "cta"],
  },
  {
    step: "Paso 6",
    title: "Pago + dirección",
    blocks: ["field", "field", "split", "field", "cta"],
  },
];

function Block({ type }) {
  switch (type) {
    case "field":
      return (
        <div className="space-y-1">
          <div className="h-1.5 w-10 rounded bg-mutedLight/50" />
          <div className="h-5 rounded border border-mutedLight/60 bg-white" />
        </div>
      );
    case "card":
      return (
        <div className="h-9 rounded border border-mutedLight/60 bg-white p-1.5 flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full border border-mutedLight" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-2/3 rounded bg-mutedLight/50" />
            <div className="h-1.5 w-1/3 rounded bg-mutedLight/30" />
          </div>
        </div>
      );
    case "summary":
      return <div className="h-12 rounded border border-dashed border-mutedLight/70" />;
    case "line":
      return <div className="h-1.5 w-full rounded bg-mutedLight/40" />;
    case "check":
      return (
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm border border-mutedLight" />
          <div className="h-1.5 w-3/4 rounded bg-mutedLight/40" />
        </div>
      );
    case "split":
      return (
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-5 rounded border border-mutedLight/60 bg-white" />
          <div className="h-5 rounded border border-mutedLight/60 bg-white" />
        </div>
      );
    case "cta":
      return <div className="h-6 rounded bg-ink/80 mt-auto" />;
    default:
      return null;
  }
}

export default function WireframeFlow() {
  return (
    <div className="not-prose rounded-2xl border border-line bg-paperSoft p-6 md:p-8 my-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-mutedLight mb-4">
        wireframes · flujo de 8 pasos
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {screens.map((s) => (
          <div key={s.step} className="flex flex-col">
            <p className="font-mono text-[10px] text-muted mb-2 leading-tight min-h-[2.5em]">{s.title}</p>
            <div className="h-full min-h-[240px] rounded-xl border border-mutedLight/70 bg-paper p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="h-1.5 w-6 rounded bg-mutedLight/60" />
                <div className="font-mono text-[8px] text-mutedLight">{s.step}</div>
              </div>
              <div className="h-1 rounded bg-line overflow-hidden">
                <div
                  className="h-full bg-signal/60"
                  style={{ width: `${(parseInt(s.step.split(" ")[1], 10) / 8) * 100}%` }}
                />
              </div>
              <div className="h-2 w-3/4 rounded bg-ink/30 mb-1" />
              {s.blocks.map((b, i) => (
                <Block key={i} type={b} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-mutedLight mt-6">
        Wireframes ilustrativos, reconstruidos para mostrar la estructura de
        las pantallas clave del flujo nuevo. No son el diseño final.
      </p>
    </div>
  );
}
