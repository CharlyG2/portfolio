"use client";

import { motion } from "framer-motion";

// Signature element: literal visualization of the atomic-design hierarchy
// (átomo → molécula → organismo → plantilla → página) that Charly's own
// BICE VIDA design-system doc is built on. Nodes assemble left to right,
// each tier built from the tier before it.

const tiers = [
  { key: "at", label: "átomo", cx: 40, cy: 170, r: 5 },
  { key: "ml", label: "molécula", cx: 130, cy: 130, r: 7 },
  { key: "or", label: "organismo", cx: 230, cy: 90, r: 9 },
  { key: "pl", label: "plantilla", cx: 340, cy: 60, r: 11 },
  { key: "pg", label: "página", cx: 460, cy: 40, r: 13 },
];

const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
];

export default function SystemGraph() {
  return (
    <div className="relative w-full max-w-[520px]">
      <svg
        viewBox="0 0 520 220"
        className="w-full h-auto overflow-visible"
        aria-hidden="true"
      >
        {links.map(([a, b], i) => {
          const from = tiers[a];
          const to = tiers[b];
          return (
            <motion.line
              key={i}
              x1={from.cx}
              y1={from.cy}
              x2={to.cx}
              y2={to.cy}
              stroke="#3D5AFE"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: "easeOut" }}
            />
          );
        })}

        {/* small satellite atoms feeding into each molecule/organism, for texture */}
        {[
          { x: 40, y: 110 },
          { x: 95, y: 175 },
          { x: 190, y: 145 },
          { x: 285, y: 115 },
        ].map((p, i) => (
          <motion.circle
            key={`sat-${i}`}
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#8FA0FF"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
          />
        ))}

        {tiers.map((t, i) => (
          <g key={t.key}>
            <motion.circle
              cx={t.cx}
              cy={t.cy}
              r={t.r}
              fill={i === tiers.length - 1 ? "#3D5AFE" : "#FFFFFF"}
              stroke="#3D5AFE"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 * i + 0.1, ease: "backOut" }}
              style={{ transformOrigin: `${t.cx}px ${t.cy}px` }}
            />
            <motion.text
              x={t.cx}
              y={t.cy - t.r - 10}
              textAnchor="middle"
              className="fill-muted"
              style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.05em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 * i + 0.35 }}
            >
              {t.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </div>
  );
}
