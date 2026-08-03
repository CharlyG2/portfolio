"use client";

import { useState } from "react";

const states = ["default", "focus", "error", "success", "disabled"];

const stateStyles = {
  default: "border-lineLight focus-within:border-signal",
  focus: "border-signal ring-2 ring-signal/20",
  error: "border-red-400",
  success: "border-emerald-400",
  disabled: "border-lineLight opacity-50",
};

const messages = {
  default: "Ayuda contextual",
  focus: "Escribiendo...",
  error: "Este campo es obligatorio",
  success: "Dato validado",
  disabled: "Campo no disponible",
};

export default function TextfieldDemo() {
  const [active, setActive] = useState("default");

  return (
    <div className="rounded-2xl border border-line bg-ink2 p-6 md:p-8">
      <div className="flex flex-wrap gap-2 mb-8">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
              active === s
                ? "border-signal text-signalSoft bg-signal/10"
                : "border-line text-muted hover:text-paper"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <label className="block max-w-sm">
        <span className="text-xs text-muted mb-2 block">Nombre completo</span>
        <input
          type="text"
          disabled={active === "disabled"}
          placeholder="Juan Pérez"
          defaultValue={active === "success" ? "Juan Pérez" : ""}
          className={`w-full bg-ink border rounded-lg px-4 py-3 text-sm text-paper placeholder:text-mutedLight outline-none transition-colors ${stateStyles[active]}`}
        />
        <span
          className={`text-xs mt-2 block ${
            active === "error"
              ? "text-red-400"
              : active === "success"
              ? "text-emerald-400"
              : "text-mutedLight"
          }`}
        >
          {messages[active]}
        </span>
      </label>
    </div>
  );
}
