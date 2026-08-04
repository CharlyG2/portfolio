const before = [
  "Datos personales",
  "Contacto",
  "Dirección",
  "Cuenta bancaria",
  "Selección de plan",
  "Beneficiarios",
  "Confirmación",
  "Pago",
  "Validación",
  "Éxito",
];

const after = [
  { label: "Datos personales + contacto", merged: true },
  { label: "Dirección" },
  { label: "Selección de plan" },
  { label: "Beneficiarios" },
  { label: "Confirmación" },
  { label: "Pago + dirección de despacho", merged: true },
  { label: "Validación" },
  { label: "Éxito" },
];

function Step({ label, tone = "default" }) {
  const toneClasses = {
    default: "border-line text-muted",
    removed: "border-red-400/40 text-red-400/70 line-through",
    merged: "border-signal/50 text-signalSoft",
  };
  return (
    <div
      className={`shrink-0 w-[110px] h-[64px] rounded-lg border ${toneClasses[tone]} bg-ink flex items-center justify-center text-center text-[10px] px-2 font-mono leading-tight`}
    >
      {label}
    </div>
  );
}

export default function FunnelDiagram() {
  return (
    <div className="rounded-2xl border border-line bg-ink2 p-6 md:p-8 overflow-x-auto">
      <p className="font-mono text-[10px] uppercase tracking-widest text-mutedLight mb-4">
        antes — 10 pasos
      </p>
      <div className="flex gap-2 mb-8 min-w-max">
        {before.map((s, i) => (
          <Step
            key={i}
            label={s}
            tone={s === "Cuenta bancaria" ? "removed" : "default"}
          />
        ))}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-widest text-mutedLight mb-4">
        después — 8 pasos
      </p>
      <div className="flex gap-2 min-w-max">
        {after.map((s, i) => (
          <Step key={i} label={s.label} tone={s.merged ? "merged" : "default"} />
        ))}
      </div>

      <p className="text-xs text-mutedLight mt-6">
        Diagrama ilustrativo del flujo, no captura de pantalla real —
        construido para mostrar dónde se eliminó y dónde se fusionó cada
        paso.
      </p>
    </div>
  );
}
