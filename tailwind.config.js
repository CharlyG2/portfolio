/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B0E14",
        ink2: "#12161F",
        ink3: "#1B212D",
        paper: "#F4F5F7",
        line: "rgba(255,255,255,0.08)",
        lineLight: "#DDE1E7",
        signal: "#3D5AFE",
        signalSoft: "#8FA0FF",
        amber: "#FFB020",
        muted: "#8B93A7",
        mutedLight: "#5B6272",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "1180px",
      },
    },
  },
  plugins: [],
};
