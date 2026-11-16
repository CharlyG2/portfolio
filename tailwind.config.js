/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#221D18",
        paper: "#F7F1E4",
        paperSoft: "#EEE3CD",
        surface: "#FFFDF8",
        line: "#E4DBC8",
        lineLight: "#E0D3B8",
        signal: "#3D5AFE",
        // Versiones para texto: los acentos originales no llegan a 4.5:1
        // (WCAG AA) sobre el papel. Úsalas siempre que el color sea texto.
        signalInk: "#2F45D0",
        mintInk: "#076B67",
        amberInk: "#8A5000",
        roseInk: "#B8233F",
        amber: "#FFB020",
        mint: "#0EA5A0",
        rose: "#F43F5E",
        rust: "#9A4536",
        sage: "#3D5A56",
        muted: "#6B6259",
        mutedLight: "#6E6457",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        impact: ["var(--font-impact)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        hand: ["var(--font-hand)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      // Mismo sistema de movimiento que lib/motion.js: todas las
      // transiciones de Tailwind (hover, colores, bordes) usan por defecto
      // la curva "out" y una duración un poco más larga que la de fábrica
      // (150 ms se sentía brusco).
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        DEFAULT: "280ms",
        fast: "180ms",
        base: "320ms",
        slow: "600ms",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(6px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "fade-up": "fade-up 800ms cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "fade-in": "fade-in 600ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        "pop-in": "pop-in 320ms cubic-bezier(0.22, 1, 0.36, 1) backwards",
        swap: "fade-up 520ms cubic-bezier(0.16, 1, 0.3, 1) backwards",
      },
    },
  },
  plugins: [],
};
