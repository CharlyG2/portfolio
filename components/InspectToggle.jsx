"use client";

import { useInspect } from "./InspectContext";

export default function InspectToggle() {
  const { inspecting, toggle } = useInspect();
  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 font-mono text-xs px-4 py-3 rounded-full border backdrop-blur-md transition-colors ${
        inspecting
          ? "bg-mint text-ink border-mint"
          : "bg-ink/80 text-mutedLight border-line hover:text-paper hover:border-mint/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          inspecting ? "bg-ink" : "bg-mint animate-pulse"
        }`}
      />
      {inspecting ? "inspeccionando" : "modo inspección"}
    </button>
  );
}
