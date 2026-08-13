"use client";

import { useRef } from "react";

export default function SpotlightText({ children, className = "" }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        ref.current.style.setProperty("--x", "-999px");
        ref.current.style.setProperty("--y", "-999px");
      }}
      className={`relative ${className}`}
    >
      <div className="opacity-100">{children}</div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(220px circle at var(--x, -999px) var(--y, -999px), black 0%, transparent 75%)",
          maskImage:
            "radial-gradient(220px circle at var(--x, -999px) var(--y, -999px), black 0%, transparent 75%)",
        }}
      >
        <div className="spotlight-layer">{children}</div>
      </div>
    </div>
  );
}
