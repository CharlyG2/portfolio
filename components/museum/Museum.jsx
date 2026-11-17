"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";
import { Canvas } from "@react-three/fiber";
import { CameraControls, useProgress } from "@react-three/drei";
import Scene from "./Scene";
import { OVERVIEW, OVERVIEW_MOBILE, STATIONS, UI } from "@/lib/museum";
import { PROFILE } from "@/lib/profile";

const CV_HREF = "/files/charly-gourves-cv.pdf";

function Loader({ text, fastLabel, onDone }) {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);
  const done = !active && progress >= 100;
  useEffect(() => {
    if (done) {
      // la portada entra mientras el telón se va, no después
      onDone?.();
      const id = setTimeout(() => setHidden(true), 800);
      return () => clearTimeout(id);
    }
  }, [done, onDone]);
  if (hidden) return null;
  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1a1613] transition-opacity duration-700 ease-in-out-soft ${
        done ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="font-serif italic text-2xl text-paper animate-fade-in">{text}</p>
      <div className="mt-5 w-48 h-[2px] bg-paper/15 overflow-hidden rounded-full">
        <div
          className="h-full w-full bg-rust origin-left transition-transform duration-slow ease-out-expo"
          style={{ transform: `scaleX(${progress / 100})` }}
        />
      </div>
      <Link
        href="/express"
        className="press mt-8 rounded-full bg-paper text-ink px-5 py-2.5 text-sm font-medium hover:bg-white animate-fade-in [animation-delay:300ms]"
      >
        {fastLabel} →
      </Link>
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

// Botones del museo: vidrio oscuro con texto claro, para que se lean igual
// sobre el muro claro y sobre el piso oscuro. El principal va en menta,
// el mismo acento de la portada.
const MINT = "#5FE3D0";
const GLASS = "bg-[#14110e]/70 backdrop-blur-md border-white/15 text-paper";

function PillButton({ children, onClick, href, download, active, accent, label }) {
  const cls = `press shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 min-h-[38px] text-xs md:text-sm font-medium border ${
    accent
      ? "bg-[#5FE3D0] text-[#10201d] border-[#5FE3D0] hover:bg-[#8FE9DA] hover:border-[#8FE9DA]"
      : active
      ? "bg-paper text-ink border-paper"
      : `${GLASS} hover:bg-[#14110e]/90 hover:border-white/40`
  }`;
  const a11y = label ? { "aria-label": label } : {};
  if (href) {
    if (href.startsWith("mailto:")) {
      return (
        <a href={href} className={cls} {...a11y}>
          {children}
        </a>
      );
    }
    const external = href.endsWith(".pdf");
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" download={download} {...a11y}>
        {children}
      </a>
    ) : (
      <Link href={href} className={cls} {...a11y}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} aria-pressed={active} {...a11y}>
      {children}
    </button>
  );
}

// Ampolleta del interruptor: rellena y con brillo cuando la sala está prendida.
function BulbIcon({ on }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={on ? "#FFD98A" : "none"}
      />
    </svg>
  );
}

// Íconos de contacto, del mismo trazo que la ampolleta.
const icon = (d) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
    {d}
  </svg>
);
const MailIcon = () => icon(<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m4 7 8 6 8-6" /></>);
const PhoneIcon = () => icon(<path d="M6.6 3.5h2.6l1.4 4-2 1.3a12 12 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />);
const InIcon = () => icon(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10.5V16M8 7.6v.1M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16" /></>);

export default function Museum() {
  const [lang, setLang] = useState("es");
  const [selected, setSelected] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  // la portada y los controles entran recién cuando se va el telón de carga
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);
  const controls = useRef();
  // Al cerrar la ficha se sigue mostrando la última obra mientras el panel
  // se desvanece (antes se vaciaba de golpe y se iba un recuadro en blanco).
  const lastStation = useRef(null);
  const isMobile = useIsMobile();
  const t = UI[lang];

  const texts = useMemo(
    () => Object.fromEntries(STATIONS.map((s) => [s.id, s[lang]])),
    [lang]
  );
  const station = STATIONS.find((s) => s.id === selected);
  const index = STATIONS.findIndex((s) => s.id === selected);
  if (station) lastStation.current = station;
  const shown = station || lastStation.current;
  const enterCls = ready ? "enter" : "opacity-0";
  const d = (ms) => ({ "--d": `${ms}ms` });

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

  // Entrada de cámara: mientras el telón de carga todavía tapa todo, la
  // cámara se acerca un poco a la sala sin animar; al irse el telón se aleja
  // suave hasta la vista general. Además asegura la vista correcta en
  // celular aunque los controles hayan tardado en montarse.
  useEffect(() => {
    if (!ready) return;
    const c = controls.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && !selected) {
      const v = isMobile ? OVERVIEW_MOBILE : OVERVIEW;
      const from = v.pos.map((p, i) => p - (p - v.target[i]) * 0.16 + (i === 1 ? 0.25 : 0));
      c.setLookAt(...from, ...v.target, false);
    }
    flyTo(selected);
    // solo al terminar la carga
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

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
      if ((e.key === "l" || e.key === "L") && !e.metaKey && !e.ctrlKey) setLightsOn((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const hovered = STATIONS.find((s) => s.id === hoveredId);

  return (
    <div className="fixed inset-0 bg-[#1a1613] overflow-hidden select-none">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: OVERVIEW.pos, fov: 50, near: 0.1, far: 80 }}
        gl={{ antialias: true }}
        onPointerMissed={() => setSelected(null)}
      >
        <Suspense fallback={null}>
          <Scene
            lang={lang}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onSelect={setSelected}
            texts={texts}
            isMobile={isMobile}
            lightsOn={lightsOn}
            focus={!!selected}
            selectedId={selected}
          />
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

      <Loader text={t.loading} fastLabel={t.express} onDone={onLoaded} />

      {/* Cabecera: marca a la izquierda, controles en una sola fila */}
      <header className="absolute top-0 left-0 right-0 z-20 p-3 md:p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 pointer-events-none">
        <div className={`${enterCls} pointer-events-auto self-start flex items-center gap-2.5 rounded-full border ${GLASS} pl-3 pr-4 py-2`} style={d(250)}>
          <span className="w-2 h-2 rounded-full" style={{ background: MINT, boxShadow: `0 0 10px ${MINT}` }} aria-hidden="true" />
          <span className="font-serif text-sm md:text-base leading-none">Charly Gourves</span>
          {/* el cargo se muestra recién al visitar una obra: en la portada ya
              está en grande y se leía tres veces */}
          <span className={`${selected ? "hidden sm:inline" : "hidden"} font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[#8FE9DA] leading-none`}>
            {PROFILE.role[lang]}
          </span>
        </div>
        <nav
          className={`${enterCls} pointer-events-auto flex flex-nowrap md:flex-wrap md:justify-end gap-2 overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0 pb-1 md:pb-0 [scrollbar-width:none]`}
          style={d(370)}
          aria-label="Controles del museo"
        >
          <div className={`shrink-0 inline-flex rounded-full border ${GLASS} p-0.5 text-xs md:text-sm font-medium`} role="group" aria-label="Idioma">
            {["es", "en"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`relative rounded-full px-3 py-1.5 uppercase transition-colors duration-base ${lang === l ? "text-ink" : "text-paper/70 hover:text-paper"}`}
                aria-pressed={lang === l}
              >
                {/* la pastilla clara se desliza entre ES y EN */}
                {lang === l && (
                  <motion.span
                    layoutId="lang-pill"
                    className="absolute inset-0 rounded-full bg-paper"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
          {selected && (
            <span className="shrink-0 inline-flex animate-pop-in">
              <PillButton onClick={() => setSelected(null)}>
                {t.overview}
              </PillButton>
            </span>
          )}
          <PillButton href="/express">
            {t.express}
          </PillButton>
          <PillButton href={CV_HREF} download>
            ↓ {t.cv}
          </PillButton>
          <PillButton href={`mailto:${PROFILE.email}`} accent>
            {t.contact}
          </PillButton>
          <PillButton onClick={() => setLightsOn((v) => !v)} active={!lightsOn} label={lightsOn ? t.lightsOff : t.lightsOn}>
            <BulbIcon on={lightsOn} />
            <span className="hidden sm:inline">{lightsOn ? t.lightsOff : t.lightsOn}</span>
          </PillButton>
          <PillButton onClick={() => setShowHelp((v) => !v)} active={showHelp} label={t.helpLabel}>
            ?
          </PillButton>
        </nav>
        <AnimatePresence>
          {showHelp && (
            <motion.p
              key="help"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: DUR.fast } }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="pointer-events-auto max-w-sm origin-top-right rounded-xl bg-[#14110e]/90 backdrop-blur-md border border-white/15 text-paper text-sm leading-relaxed px-4 py-3 shadow-lg md:absolute md:right-6 md:top-20"
            >
              {t.help}
            </motion.p>
          )}
        </AnimatePresence>
      </header>

      {/* Portada: lo primero que lee un reclutador, sobre la sala */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 pointer-events-none transition-[opacity,transform] duration-slow ease-out-expo ${
          selected ? "opacity-0 translate-y-4" : "opacity-100"
        }`}
      >
        <div className="bg-gradient-to-t from-[#14110e] via-[#14110e]/80 to-transparent pt-20 md:pt-32 pb-24 md:pb-28 px-5 md:px-12">
          <p className={`${enterCls} font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#E08A74]`} style={d(400)}>{t.kicker}</p>
          <p className="font-serif text-paper leading-[0.95] mt-3 text-[38px] sm:text-5xl md:text-6xl xl:text-7xl">
            <span className={`${enterCls} block`} style={d(490)}>{t.heroTitle}</span>
            <span className={`${enterCls} block italic`} style={{ color: MINT, ...d(590) }}>{t.heroAccent}</span>
          </p>
          <p className={`${enterCls} mt-4 md:mt-5 max-w-xl text-sm md:text-base text-paper/75 leading-relaxed`} style={d(710)}>{t.heroSub}</p>
          <p className={`${enterCls} mt-3 inline-flex items-center gap-2 text-xs md:text-sm text-paper/80`} style={d(790)}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: MINT }} aria-hidden="true" />
            {PROFILE.availability[lang]} · {PROFILE.location[lang]}
          </p>
          {/* contacto a la vista: correo, teléfono y LinkedIn sin tener que buscarlos */}
          <ul className={`${enterCls} pointer-events-auto mt-4 flex flex-wrap gap-2`} style={d(840)} aria-label={t.contact}>
            {[
              { href: `mailto:${PROFILE.email}`, text: PROFILE.email, icon: <MailIcon /> },
              { href: PROFILE.whatsapp, text: PROFILE.phone, icon: <PhoneIcon />, ext: true },
              { href: PROFILE.linkedin, text: "LinkedIn", icon: <InIcon />, ext: true },
            ].map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`press inline-flex items-center gap-2 rounded-full border ${GLASS} px-3.5 py-2 min-h-[38px] text-xs md:text-sm hover:bg-[#14110e]/90 hover:border-white/40`}
                >
                  <span className="text-[#8FE9DA]">{c.icon}</span>
                  {c.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Aviso de la linterna con las luces apagadas */}
      <div className="absolute inset-x-0 top-24 md:top-24 z-20 flex justify-center pointer-events-none px-4">
        <AnimatePresence>
          {!lightsOn && (
            <motion.p
              key="flash"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6, transition: { duration: DUR.fast } }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="rounded-full bg-[#14110e]/85 backdrop-blur-md border border-white/15 text-paper text-xs md:text-sm px-4 py-2 shadow-lg text-center"
            >
              {isMobile ? t.flashMobile : t.flash}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Etiqueta de la obra bajo el cursor */}
      <div className="hidden md:flex absolute inset-x-0 bottom-28 z-20 justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {hovered && !selected && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, transition: { duration: DUR.fast } }}
              transition={{ duration: DUR.base, ease: EASE }}
              className="rounded-full bg-[#14110e]/85 backdrop-blur-md border border-white/15 text-paper text-sm px-4 py-2 shadow-lg"
            >
              {hovered[lang].title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ficha de la obra */}
      <aside
        className={`absolute z-20 bg-[#FBF8F2] text-ink shadow-2xl border border-ink/10 transition-[opacity,transform] ease-out-expo
          inset-x-3 bottom-3 rounded-2xl max-h-[48vh] overflow-y-auto
          md:inset-x-auto md:right-6 md:top-1/2 md:bottom-auto md:w-[380px] md:max-h-[80vh]
          ${station ? "duration-700 opacity-100 translate-y-0 md:translate-x-0 md:-translate-y-1/2" : "duration-base opacity-0 translate-y-8 md:translate-y-[-50%] md:translate-x-6 pointer-events-none"}`}
        aria-live="polite"
        aria-hidden={!station}
        {...(!station ? { inert: "" } : {})}
      >
        {shown && (
          <div key={shown.id} className={`p-6 md:p-7 ${station ? "animate-swap [animation-delay:80ms]" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rust">{shown[lang].room}</p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="press -mt-2 -mr-2 w-9 h-9 inline-flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-ink/5 hover:rotate-90 text-xl leading-none"
                aria-label={t.close}
              >
                ×
              </button>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight mt-3">{shown[lang].title}</h2>
            <p className="font-serif italic text-sm text-muted mt-2">{shown[lang].technique}</p>
            <div className="h-px bg-ink/10 my-5" />
            {shown[lang].story ? (
              // Problema → qué hice → resultado: se lee de un vistazo
              <dl className="space-y-4">
                {[
                  [t.problem, shown[lang].story.problem],
                  [t.did, shown[lang].story.did],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                    <dd className="mt-1 text-[15px] leading-snug text-ink/85">{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{t.result}</dt>
                  <dd className="mt-1.5 flex items-baseline gap-3">
                    {shown.stat && (
                      <span className="font-impact text-5xl leading-none shrink-0" style={{ color: shown.color }}>
                        {shown.stat}
                      </span>
                    )}
                    <span className="text-[15px] leading-snug text-ink/85">{shown[lang].story.result}</span>
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="text-[15px] leading-relaxed text-ink/80">{shown[lang].text}</p>
            )}
            <Link
              href={shown.href}
              className="press group mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-paper px-5 py-2.5 text-sm font-medium hover:bg-[#3a3128]"
            >
              {shown.href.startsWith("/casos") ? t.open : t.openOther}
              <span aria-hidden="true" className="inline-block transition-transform duration-base group-hover:translate-x-1">→</span>
            </Link>
          </div>
        )}
      </aside>

      {/* Recorrido */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 z-20 transition-[bottom] duration-700 ease-out-expo ${
          station && isMobile ? "bottom-[calc(48vh+20px)]" : "bottom-5 md:bottom-10"
        }`}
      >
        <div className={`${enterCls} flex items-center gap-2`} style={d(890)}>
        <PillButton onClick={() => go(-1)} label={t.prev}>
          <span aria-hidden="true">←</span>
          <span className="hidden md:inline">{t.prev}</span>
        </PillButton>
        {!station && (
          <span className="inline-flex animate-pop-in">
            <PillButton onClick={() => go(1)} accent>
              {t.start}
            </PillButton>
          </span>
        )}
        {station && (
          <span className={`animate-pop-in rounded-full border ${GLASS} px-3 py-2 min-h-[38px] inline-flex items-center font-mono text-xs tabular-nums`} aria-live="polite">
            <span key={index} className="inline-block animate-swap">{index + 1}</span>
            &nbsp;/ {STATIONS.length}
          </span>
        )}
        <PillButton onClick={() => go(1)} label={t.next}>
          <span className="hidden md:inline">{t.next}</span>
          <span aria-hidden="true">→</span>
        </PillButton>
        </div>
      </div>

      {!selected && (
        <p className={`${enterCls} hidden md:block absolute right-6 bottom-10 z-10 max-w-[240px] text-right font-mono text-[11px] leading-relaxed text-paper/70 pointer-events-none`} style={d(1010)}>
          {t.hint}
        </p>
      )}
    </div>
  );
}
