const steps = [
  {
    n: "01",
    color: "text-signal",
    bg: "bg-signal/5",
    border: "border-signal/20",
    title: "Definí la dirección con Claude",
    text: "Le tiré referencias reales de portafolios que me gustaban y fuimos afinando el estilo juntos, a punta de feedback.",
  },
  {
    n: "02",
    color: "text-mint",
    bg: "bg-mint/5",
    border: "border-mint/20",
    title: "Probé todo en Cursor",
    text: "Cada cambio lo veía corriendo en mi máquina antes de aprobarlo — nunca aprobé algo a ciegas.",
  },
  {
    n: "03",
    color: "text-amber",
    bg: "bg-amber/5",
    border: "border-amber/20",
    title: "Metí capturas reales, no mockups",
    text: "Las pantallas de mis proyectos de verdad, subidas directo — nada inventado para que se viera mejor.",
  },
  {
    n: "04",
    color: "text-rose",
    bg: "bg-rose/5",
    border: "border-rose/20",
    title: "Cuando algo no funcionaba, lo dijimos",
    text: "Hubo direcciones enteras que se descartaron porque no se sentían bien — y volvimos atrás sin drama.",
  },
  {
    n: "05",
    color: "text-rust",
    bg: "bg-rust/5",
    border: "border-rust/20",
    title: "Subí los cambios con GitHub Desktop",
    text: "Sin tocar una línea de código a mano — solo revisar, escribir un resumen y hacer commit.",
  },
  {
    n: "06",
    color: "text-signal",
    bg: "bg-signal/5",
    border: "border-signal/20",
    title: "Publiqué en Vercel",
    text: "Conectado a GitHub, así que cada cambio que subo se publica solo, sin pasos extra.",
  },
];

export default function HowIBuiltThis() {
  return (
    <div className="not-prose grid sm:grid-cols-2 gap-4 my-6">
      {steps.map((s) => (
        <div
          key={s.n}
          className={`rounded-2xl border ${s.border} ${s.bg} p-5`}
        >
          <span className={`font-mono text-2xl ${s.color}`}>{s.n}</span>
          <h4 className="font-display text-base text-ink mt-2 mb-1.5">
            {s.title}
          </h4>
          <p className="text-sm text-muted leading-relaxed">{s.text}</p>
        </div>
      ))}
    </div>
  );
}
