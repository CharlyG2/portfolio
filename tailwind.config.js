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
        ink2: "#3D342A",
        ink3: "#4D3532",
        paper: "#F7F1E4",
        paperSoft: "#EEE3CD",
        surface: "#FFFDF8",
        line: "#E4DBC8",
        lineLight: "#E0D3B8",
        signal: "#3D5AFE",
        signalSoft: "#5B72FF",
        amber: "#FFB020",
        mint: "#0EA5A0",
        rose: "#F43F5E",
        sunset: "#FD9047",
        rust: "#AC5142",
        sage: "#3D5A56",
        espresso: "#4D3532",
        muted: "#6B6259",
        mutedLight: "#9C9082",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        impact: ["var(--font-impact)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-33.333%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
