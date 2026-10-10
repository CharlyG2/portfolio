"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { CameraControls, useProgress } from "@react-three/drei";
import Scene from "./Scene";
import { OVERVIEW, OVERVIEW_MOBILE, STATIONS, UI } from "@/lib/museum";

const CV_HREF = "/files/charly-gourves-cv.pdf";

function Loader({ text }) {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (!active && progress >= 100) {
      const id = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(id);
    }
  }, [active, progress]);
  if (hidden) return null;
  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#d9d2c6] transition-opacity duration-500 ${
        !active && progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-serif italic text-2xl text-ink">{text}</p>
      <div className="mt-5 w-48 h-[2px] bg-ink/15 overflow-hidden">
        <div className="h-full bg-rust transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function PillButton({ children, onClick, href, download, active, accent }) {
  const cls = `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs md:text-sm font-medium border transition-colors ${
    accent
      ? "bg-ink text-paper border-ink hover:bg-[#3a3128]"
      : active
      ? "bg-paper text-ink border-ink"
      : "bg-paper/85 backdrop-blur text-ink border-ink/15 hover:border-ink/50"
  }`;
  if (href) {
    const external = href.endsWith(".pdf");
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" download={download}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export default function Museum() {
  const [lang, setLang] = useState("es");
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const controls = useRef();
  const isMobile = useIsMobile();
  const t = UI[lang];

  const texts = useMemo(
    () => Object.fromEntries(STATIONS.map((s) => [s.id, s[lang]])),
    [lang]
  );
  const station = STATIONS.find((s) => s.id === selected);
  const index = STATIONS.findIndex((s) => s.id === selected);

  const flyTo = useCallback(
    (id) => {
      const c = controls.current;
      if (!c) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const s = STATIONS.find((x) => x.id === id);
      const v = s ? s.view : isMobile ? OVERVIEW_MOBILE : OVERVIEW;
      let pos = v.pos;
      if (s && isMobile) {
        // en celular la cámara se aleja un poco para que la obra quepa
        const dir = v.pos.map((p, i) => p - v.target[i]);
        pos = v.pos.map((p, i) => p + dir[i] * 0.45);
      }
      c.setLookAt(...pos, ...v.target, !reduce);
      // con el panel abierto en escritorio, la obra se corre a la izquierda
      c.setFocalOffset(s && !isMobile ? 0.9 : 0, s && isMobile ? -1.1 : 0, 0, !reduce);
    },
    [isMobile]
  );

  useEffect(() => {
    flyTo(selected);
  }, [selected, flyTo]);

  const go = useCallback(
    (dir) => {
      const next = index === -1 ? (dir > 0 ? 0 : STATIONS.length - 1) : (index + dir + STATIONS.length) % STATIONS.length;
      setSelected(STATIONS[next].id);
    },
    [index]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const hovered = STATIONS.find((s) => s.id === hoveredId);

  return (
    <div className="fixed inset-0 bg-[#d9d2c6] overflow-hidden select-none">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: OVERVIEW.pos, fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: true }}
        onPointerMissed={() => setSelected(null)}
      >
        <Suspense fallback={null}>
          <Scene lang={lang} hoveredId={hoveredId} setHoveredId={setHoveredId} onSelect={setSelected} texts={texts} />
        </Suspense>
        <CameraControls
          ref={controls}
          makeDefault
          minDistance={1.2}
          maxDistance={22}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2 - 0.05}
          smoothTime={0.6}
          dollySpeed={0.4}
        />
      </Canvas>

      <Loader text={t.loading} />

      {/* Cabecera */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto self-start rounded-xl bg-paper/90 backdrop-blur border border-ink/10 px-4 py-2.5 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">{t.kicker}</p>
          <p className="font-serif text-lg md:text-xl text-ink leading-tight">Museo Charly Gourves</p>
        </div>
        <nav className="pointer-events-auto flex flex-wrap gap-2" aria-label="Controles del museo">
          <div className="inline-flex rounded-full border border-ink/15 bg-paper/85 backdrop-blur overflow-hidden text-xs md:text-sm font-medium">
            {["es", "en"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-2 uppercase ${lang === l ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"}`}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
          <PillButton onClick={() => setSelected(null)} active={!selected}>
            {t.overview}
          </PillButton>
          <PillButton href="/express" accent>
            {t.express}
          </PillButton>
          <PillButton href={CV_HREF} download>
            ↓ {t.cv}
          </PillButton>
          <PillButton onClick={() => setShowHelp((v) => !v)} active={showHelp}>
            ?
          </PillButton>
        </nav>
        {showHelp && (
          <p className="pointer-events-auto max-w-sm rounded-xl bg-ink text-paper text-sm leading-relaxed px-4 py-3 shadow-lg">
            {t.help}
          </p>
        )}
      </header>

      {/* Etiqueta de la obra bajo el cursor */}
      {hovered && !selected && (
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-28 z-20 pointer-events-none rounded-full bg-ink text-paper text-sm px-4 py-2 shadow-lg">
          {hovered[lang].title}
        </div>
      )}

      {/* Ficha de la obra */}
      <aside
        className={`absolute z-20 bg-[#FBF8F2] text-ink shadow-2xl border border-ink/10 transition-all duration-500 ease-out
          inset-x-3 bottom-3 rounded-2xl max-h-[48vh] overflow-y-auto
          md:inset-x-auto md:right-6 md:top-1/2 md:bottom-auto md:w-[380px] md:max-h-[80vh]
          ${station ? "opacity-100 translate-y-0 md:-translate-y-1/2" : "opacity-0 translate-y-6 md:-translate-y-[45%] pointer-events-none"}`}
        aria-live="polite"
      >
        {station && (
          <div className="p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">{station[lang].room}</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-ink/50 hover:text-ink text-lg leading-none -mt-1"
                aria-label={t.close}
              >
                ×
              </button>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight mt-3">{station[lang].title}</h2>
            <p className="font-serif italic text-sm text-muted mt-2">{station[lang].technique}</p>
            <div className="h-px bg-ink/10 my-5" />
            <p className="text-[15px] leading-relaxed text-ink/80">{station[lang].text}</p>
            {station.stat && (
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-impact text-5xl leading-none" style={{ color: station.color }}>
                  {station.stat}
                </span>
                <span className="text-xs text-muted">{station[lang].statLabel}</span>
              </div>
            )}
            <Link
              href={station.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-[#3a3128] transition-colors"
            >
              {station.href.startsWith("/casos") ? t.open : t.openOther} →
            </Link>
          </div>
        )}
      </aside>

      {/* Recorrido */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 transition-all ${
          station && isMobile ? "bottom-[calc(48vh+20px)]" : "bottom-5 md:bottom-8"
        }`}
      >
        <PillButton onClick={() => go(-1)}>← {isMobile ? "" : t.prev}</PillButton>
        {!station && (
          <PillButton onClick={() => go(1)} accent>
            {t.start}
          </PillButton>
        )}
        {station && (
          <span className="rounded-full bg-paper/85 backdrop-blur border border-ink/15 px-3 py-2 font-mono text-xs text-ink">
            {index + 1} / {STATIONS.length}
          </span>
        )}
        <PillButton onClick={() => go(1)}>{isMobile ? "" : t.next} →</PillButton>
      </div>

      {!selected && (
        <p className="hidden md:block absolute right-6 bottom-8 z-10 max-w-[240px] text-right font-mono text-[11px] text-ink/60 pointer-events-none">
          {t.hint}
        </p>
      )}
    </div>
  );
}
