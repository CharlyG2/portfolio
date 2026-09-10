"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function Preloader() {
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cg-preloader-seen");
    if (seen || shouldReduceMotion) {
      setDone(true);
      return;
    }
    setDone(false);

    const duration = 1400;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setCount(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setExiting(true), 200);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem("cg-preloader-seen", "1");
        }, 200 + 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldReduceMotion]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
          style={{ background: "#221D18" }}
          initial={{ y: 0 }}
          animate={{ y: exiting ? "-100%" : 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-mono text-sm tracking-widest" style={{ color: "#9C9082" }}>
            &lt;cg/&gt;
          </div>
          <div
            className="font-mono mt-4 tabular-nums"
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)", color: "#F7F1E4" }}
          >
            {count}%
          </div>
          <div className="mt-2 h-px w-40 overflow-hidden" style={{ background: "rgba(247,241,228,0.15)" }}>
            <motion.div
              className="h-full"
              style={{ background: "#AC5142" }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
