"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { chatLive, funnelLive, uploaderLive, plansLive, scrollAt } from "./live";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, MeshReflectorMaterial, RoundedBox, ContactShadows } from "@react-three/drei";
import { STATIONS } from "@/lib/museum";

const WALL = "#EEE8DD";
const FRAME_DARK = "#1c1712";
const FRAME_GOLD = "#B8925A";

// Recorta la textura para que llene un marco de proporción w/h mostrando la
// parte de arriba de la imagen (las capturas de landings son muy largas).
function useCroppedTexture(src, aspect) {
  const tex = useTexture(src);
  return useMemo(() => {
    const t = tex.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    const img = t.image;
    const imgAspect = img.width / img.height;
    if (imgAspect < aspect) {
      t.repeat.set(1, imgAspect / aspect);
      t.offset.set(0, 1 - imgAspect / aspect);
    } else {
      t.repeat.set(aspect / imgAspect, 1);
      t.offset.set((1 - aspect / imgAspect) / 2, 0);
    }
    t.needsUpdate = true;
    return t;
  }, [tex, aspect]);
}

// Las cartelas usan las mismas fuentes del sitio (Fraunces e IBM Plex Mono,
// cargadas por next/font). Se leen de las variables CSS y se espera a que
// estén listas antes de dibujar; mientras tanto se usa Georgia / Courier.
const FALLBACK_FONTS = { serif: "Georgia, 'Times New Roman', serif", mono: "'Courier New', monospace", sans: "Helvetica, Arial, sans-serif", ready: false };
const FontContext = createContext(FALLBACK_FONTS);

function useSiteFonts() {
  const [fonts, setFonts] = useState(FALLBACK_FONTS);
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const serif = css.getPropertyValue("--font-serif").trim();
    const mono = css.getPropertyValue("--font-mono").trim();
    const sans = css.getPropertyValue("--font-body").trim() || FALLBACK_FONTS.sans;
    if (!serif || !mono || !document.fonts) return;
    let alive = true;
    Promise.all([
      document.fonts.load(`600 72px ${serif}`),
      document.fonts.load(`500 46px ${mono}`),
      document.fonts.load(`500 46px ${sans}`),
    ])
      .then(() => alive && setFonts({ serif, mono, sans, ready: true }))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return fonts;
}

// Textura de texto dibujada en canvas: placas, títulos y el manifiesto.
function useTextTexture(draw, deps, w = 1024, h = 512) {
  const fonts = useContext(FontContext);
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    draw(ctx, w, h, fonts);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, fonts]);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

// ---------------------------------------------------------------------------
// Interruptor de luces. El estado vive en un ref compartido (sin re-render):
// cada luz y cada material lo leen en su propio useFrame.
//   level: 0 (apagado) → 1 (encendido), con una transición suave.
//   changedAt: cuándo se tocó el interruptor, para encender foco por foco.
const LightsContext = createContext({ current: { on: true, level: 1, changedAt: -100, reduce: false } });
const now = () => performance.now() / 1000;

function LightsDriver() {
  const L = useContext(LightsContext);
  useFrame((_, dt) => {
    const s = L.current;
    const target = s.on ? 1 : 0;
    if (s.reduce) s.level = target;
    else s.level += Math.sign(target - s.level) * Math.min(Math.abs(target - s.level), dt / (s.on ? 1.4 : 0.7));
  });
  return null;
}

// Factor de un foco: al apagar se van en cascada; al prender parpadean un
// instante antes de quedar fijos, como focos de verdad.
function spotFactor(s, order) {
  const t = now() - s.changedAt;
  if (s.reduce) return s.on ? 1 : 0;
  if (!s.on) return 1 - THREE.MathUtils.clamp((t - order * 0.05) / 0.12, 0, 1);
  const k = (t - 0.25 - order * 0.11) / 0.3;
  if (k <= 0) return 0;
  if (k >= 1) return 1;
  return Math.sin(k * 40 + order) > -0.2 ? 0.25 + 0.75 * k : 0.05;
}

// Material sin sombreado que igual se oscurece cuando se apagan las luces
// (cartelas, vinilos). `min` es cuánto brilla a oscuras.
function useDimmed(min, base = 1) {
  const L = useContext(LightsContext);
  const ref = useRef();
  const pos = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const s = L.current;
    let lit = s.level;
    // a oscuras, lo que alumbra la linterna se ve con su color real
    if (lit < 1 && s.flashDir) {
      mesh.getWorldPosition(pos).sub(s.flashPos).normalize();
      const beam = THREE.MathUtils.smoothstep(pos.dot(s.flashDir), 0.955, 0.99);
      lit = Math.max(lit, beam);
    }
    mesh.material.color.setScalar(base * (min + (1 - min) * lit));
  });
  return ref;
}

function SceneLights() {
  const L = useContext(LightsContext);
  const amb = useRef();
  const hemi = useRef();
  const dir = useRef();
  useFrame(() => {
    const k = 0.06 + 0.94 * L.current.level;
    if (amb.current) amb.current.intensity = 0.36 * k;
    if (hemi.current) hemi.current.intensity = 0.62 * k;
    if (dir.current) dir.current.intensity = 0.2 * k;
  });
  return (
    <>
      <ambientLight ref={amb} intensity={0.36} />
      <hemisphereLight ref={hemi} args={["#fff3df", "#3a2e25", 0.62]} />
      <directionalLight ref={dir} position={[4, 8, 6]} intensity={0.2} />
    </>
  );
}

// Linterna: con las luces apagadas, un foco sale de la cámara hacia el cursor.
function Flashlight() {
  const L = useContext(LightsContext);
  const light = useRef();
  const target = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ camera, pointer, raycaster }) => {
    if (!light.current) return;
    const off = 1 - L.current.level;
    light.current.intensity = off * 9;
    light.current.visible = off > 0.01;
    if (!light.current.visible) return;
    raycaster.setFromCamera(pointer, camera);
    L.current.flashPos = camera.position;
    L.current.flashDir = raycaster.ray.direction;
    light.current.position.copy(camera.position);
    target.position.copy(camera.position).addScaledVector(raycaster.ray.direction, 10);
    target.updateMatrixWorld();
  });
  return (
    <>
      <primitive object={target} />
      <spotLight ref={light} target={target} angle={0.26} penumbra={0.75} decay={0} distance={30} color="#fff1d6" intensity={0} />
    </>
  );
}

function Spot({ position, target, intensity = 2.2, angle = 0.42, color = "#ffeccc" }) {
  const L = useContext(LightsContext);
  const targetObj = useMemo(() => new THREE.Object3D(), []);
  const light = useRef();
  const bulb = useRef();
  // orden de encendido: barrido de izquierda a derecha y de fondo a frente
  const order = (position[0] + 8) / 2.4 + (position[2] + 8) / 8;
  useEffect(() => {
    targetObj.position.set(...target);
    targetObj.updateMatrixWorld();
  }, [targetObj, target]);
  useFrame(() => {
    const f = spotFactor(L.current, order);
    if (light.current) light.current.intensity = intensity * 1.5 * f;
    if (bulb.current) bulb.current.color.setRGB(0.12 + 0.88 * f, 0.1 + 0.83 * f, 0.08 + 0.72 * f);
  });
  return (
    <>
      <primitive object={targetObj} />
      <spotLight
        ref={light}
        position={position}
        target={targetObj}
        intensity={intensity * 1.5}
        angle={angle}
        penumbra={0.55}
        decay={0}
        distance={14}
        color={color}
      />
      {/* lámpara de riel en el techo, con su ampolleta encendida */}
      <mesh position={position}>
        <cylinderGeometry args={[0.09, 0.13, 0.32, 16]} />
        <meshStandardMaterial color="#1c1712" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[position[0], position[1] - 0.161, position[2]]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 20]} />
        <meshBasicMaterial ref={bulb} color="#fff0d0" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

// Marco con passe-partout. `rotY` orienta el cuadro según el muro.
// Obra viva: capa dibujada en canvas sobre la captura que se anima mientras
// la obra está activa (mouse encima o ficha abierta). Comparte el mismo
// atenuado que la pantalla, así que se apaga y se enciende con la sala.
function LiveOverlay({ w, h, image, active, live, lang }) {
  const L = useContext(LightsContext);
  const fonts = useContext(FontContext);
  const dim = useDimmed(0.5, 0.925);
  const imgW = image?.width || 1024;
  const imgH = image?.height || 768;
  const k = Math.min(1.25, 1400 / imgW);
  const { ctx, tex } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = Math.round(imgW * k);
    c.height = Math.round(imgH * k);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return { ctx: c.getContext("2d"), tex: t };
  }, [imgW, imgH, k]);
  useEffect(() => () => tex.dispose(), [tex]);
  const st = useRef({ t: 0, a: 0 });
  useFrame((_, dt) => {
    const mesh = dim.current;
    if (!mesh) return;
    const s = st.current;
    const on = active && !L.current.reduce;
    s.a = THREE.MathUtils.clamp(s.a + (on ? dt / 0.2 : -dt / 0.35), 0, 1);
    if (on) s.t += Math.min(dt, 0.1);
    else if (s.a === 0) s.t = 0;
    mesh.visible = s.a > 0;
    if (!mesh.visible) return;
    mesh.material.opacity = s.a;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.clearRect(0, 0, imgW, imgH);
    ctx.textBaseline = "alphabetic";
    live.draw(ctx, s.t % live.period, { image, fonts, lang });
    tex.needsUpdate = true;
  });
  return (
    <mesh ref={dim} position={[0, 0, 0.058]} visible={false}>
      <planeGeometry args={[w, h]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}

function Artwork({ src, w, h, position, rotY = 0, frame = FRAME_DARK, mat = 0.12, hovered, active, live, scroll, lang, ...handlers }) {
  const tex = useCroppedTexture(src, w / h);
  const L = useContext(LightsContext);
  const group = useRef();
  const screen = useDimmed(0.5, 0.925);
  // páginas largas: se recorren de arriba abajo mientras la obra está activa
  const sc = useRef({ t: 0, p: 0 });
  const top = 1 - tex.repeat.y;
  const viewports = 1 / tex.repeat.y;
  useFrame((_, dt) => {
    if (!group.current) return;
    const s = hovered ? 1.025 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, 1), Math.min(1, dt * 8));
    if (scroll && viewports > 1.05) {
      const S = sc.current;
      const on = active && !L.current.reduce;
      if (on) S.t += Math.min(dt, 0.1);
      else if (S.p < 0.002) S.t = 0;
      const target = on ? scrollAt(S.t, viewports) : 0;
      S.p += (target - S.p) * Math.min(1, dt * (on ? 10 : 4));
      tex.offset.y = top * (1 - S.p);
    }
  });
  const fw = w + mat * 2 + 0.16;
  const fh = h + mat * 2 + 0.16;
  return (
    <group ref={group} position={position} rotation={[0, rotY, 0]} {...handlers}>
      <mesh castShadow>
        <boxGeometry args={[fw, fh, 0.1]} />
        <meshStandardMaterial color={frame} metalness={frame === FRAME_GOLD ? 0.7 : 0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.051]}>
        <planeGeometry args={[w + mat * 2, h + mat * 2]} />
        <meshStandardMaterial color="#FBF8F2" roughness={0.9} />
      </mesh>
      <mesh ref={screen} position={[0, 0, 0.056]}>
        <planeGeometry args={[w, h]} />
        {/* sin luz propia: la captura se ve nítida y con sus colores reales */}
        <meshBasicMaterial map={tex} color="#ececec" />
      </mesh>
      {live && <LiveOverlay w={w} h={h} image={tex.image} active={active} live={live} lang={lang} />}
    </group>
  );
}

// Cartela de museo: número de obra, título, una línea fina de color y la
// técnica en cursiva. Papel fino separado del muro con una sombra suave; el
// alto se ajusta al texto para que no quede espacio vacío.
function Plaque({ position, rotY = 0, title, number, stat, statLabel, note, color = "#6E2A1F", scale = 1, lang }) {
  const W = 860;
  const tex = useTextTexture(
    (ctx, w, _h, f) => {
      const P = 58;
      const maxW = w - P * 2;
      const lines = (text, font, width) => {
        ctx.font = font;
        const out = [];
        let line = "";
        for (const word of text.split(" ")) {
          const t = line ? `${line} ${word}` : word;
          if (ctx.measureText(t).width > width && line) {
            out.push(line);
            line = word;
          } else line = t;
        }
        out.push(line);
        return out;
      };
      const titleFont = `600 60px ${f.serif}`;
      const noteFont = `italic 400 34px ${f.serif}`;
      const tl = lines(title, titleFont, maxW);
      const nl = note ? lines(note, noteFont, maxW) : [];
      // alto según el contenido
      let H = P + 24 + 30 + tl.length * 70 + 30 + 4;
      H += stat ? 30 + 96 : nl.length ? 30 + nl.length * 44 : 0;
      H += P - 10;
      ctx.canvas.height = Math.round(H);
      ctx.fillStyle = "#F7F2E9";
      ctx.fillRect(0, 0, w, H);
      let y = P + 22;
      ctx.fillStyle = "#8E3B2C";
      ctx.font = `600 25px ${f.sans}`;
      if ("letterSpacing" in ctx) ctx.letterSpacing = "6px";
      ctx.fillText(number, P, y);
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
      y += 30 + 56;
      ctx.fillStyle = "#1A1511";
      ctx.font = titleFont;
      tl.forEach((l, k) => ctx.fillText(l, P, y + k * 70));
      y += (tl.length - 1) * 70 + 30;
      ctx.fillStyle = color;
      ctx.fillRect(P, y, 56, 4);
      y += 4;
      if (stat) {
        y += 30 + 80;
        ctx.font = `600 96px ${f.serif}`;
        ctx.fillText(stat, P - 4, y);
        const sw = ctx.measureText(stat).width;
        ctx.fillStyle = "#3d342c";
        const ll = lines(statLabel || "", `500 28px ${f.sans}`, maxW - sw - 28);
        ll.slice(0, 2).forEach((l, k) => ctx.fillText(l, P + sw + 24, y - 44 + k * 38 - (ll.length > 1 ? 0 : -18)));
      } else if (nl.length) {
        y += 30 + 30;
        ctx.fillStyle = "#4a4038";
        ctx.font = noteFont;
        nl.forEach((l, k) => ctx.fillText(l, P, y + k * 44));
      }
    },
    [title, number, stat, statLabel, note, color, lang],
    W,
    600
  );
  const dim = useDimmed(0.07);
  const pw = 1.05;
  const ph = (pw * (tex.image?.height || 420)) / W;
  return (
    <group position={position} rotation={[0, rotY, 0]} scale={scale}>
      {/* sombra suave sobre el muro */}
      <mesh position={[0.012, -0.018, -0.004]}>
        <planeGeometry args={[pw + 0.03, ph + 0.03]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.13} depthWrite={false} />
      </mesh>
      <mesh>
        <boxGeometry args={[pw, ph, 0.006]} />
        <meshStandardMaterial color="#e2d9c9" roughness={0.7} />
      </mesh>
      <mesh ref={dim} position={[0, 0, 0.0035]}>
        <planeGeometry args={[pw, ph]} />
        {/* sin sombreado: la cartela se lee igual dentro y fuera del foco */}
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Cuadro del generador: arquetipos → programa propio → usuarios sintéticos,
// y abajo el complemento con entrevistas moderadas. Solo etiquetas, sin párrafos.
const ARCH_COLORS = ["#5FE3D0", "#8FA8FF", "#FFB020"];
const BOARD_USERS = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2];
function drawAvatar(ctx, cx, cy, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy - r * 0.55, r * 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(cx, cy + r * 0.95, r * 0.88, r * 0.82, 0, Math.PI, 0);
  ctx.fill();
}
function drawArrow(ctx, x0, x1, y) {
  ctx.strokeStyle = "#8a7f70";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(x0, y);
  ctx.lineTo(x1 - 6, y);
  ctx.stroke();
  ctx.fillStyle = "#8a7f70";
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x1 - 26, y - 18);
  ctx.lineTo(x1 - 26, y + 18);
  ctx.closePath();
  ctx.fill();
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function SyntheticBoard({ position, rotY = 0, lang, hovered, ...handlers }) {
  const en = lang === "en";
  const tex = useTextTexture(
    (ctx, w, h, f) => {
      ctx.fillStyle = "#221D18";
      ctx.fillRect(0, 0, w, h);
      // encabezado
      ctx.fillStyle = "#5FE3D0";
      ctx.font = `500 34px ${f.mono}`;
      if ("letterSpacing" in ctx) ctx.letterSpacing = "6px";
      ctx.fillText(en ? "BUILT WITH CLAUDE + CURSOR" : "HECHO CON CLAUDE + CURSOR", 90, 110);
      if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
      ctx.fillStyle = "#F7F1E4";
      ctx.font = `600 92px ${f.serif}`;
      ctx.fillText(en ? "Synthetic-user generator" : "Generador de usuarios sintéticos", 90, 225);

      const mid = 640;
      const label = (txt, x) => {
        ctx.fillStyle = "#a99e8e";
        ctx.font = `500 28px ${f.mono}`;
        if ("letterSpacing" in ctx) ctx.letterSpacing = "4px";
        ctx.fillText(txt, x, 400);
        if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
      };

      // 1 · arquetipos
      label(en ? "ARCHETYPES" : "ARQUETIPOS", 90);
      ["A", "B", "C"].forEach((k, i) => {
        const y = 440 + i * 140;
        ctx.fillStyle = "#2f2822";
        roundRect(ctx, 90, y, 400, 110, 22);
        ctx.fill();
        drawAvatar(ctx, 160, y + 50, 36, ARCH_COLORS[i]);
        ctx.fillStyle = "#F7F1E4";
        ctx.font = `500 38px ${f.mono}`;
        ctx.fillText(`${en ? "Archetype" : "Arquetipo"} ${k}`, 220, y + 68);
      });

      drawArrow(ctx, 520, 640, mid);

      // 2 · el programa
      ctx.fillStyle = "#16120f";
      roundRect(ctx, 670, 470, 400, 340, 28);
      ctx.fill();
      ctx.strokeStyle = "#5FE3D0";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.textAlign = "center";
      ctx.fillStyle = "#F7F1E4";
      ctx.font = `600 66px ${f.serif}`;
      ctx.fillText(en ? "Generator" : "Generador", 870, 625);
      ctx.fillStyle = "#5FE3D0";
      ctx.font = `500 32px ${f.mono}`;
      ctx.fillText("Claude + Cursor", 870, 690);
      ctx.textAlign = "left";

      drawArrow(ctx, 1100, 1220, mid);

      // 3 · usuarios sintéticos: varios por arquetipo
      label(en ? "10 SYNTHETIC USERS" : "10 USUARIOS SINTÉTICOS", 1250);
      BOARD_USERS.forEach((a, i) => {
        const cx = 1300 + (i % 5) * 95;
        const cy = 540 + Math.floor(i / 5) * 190;
        drawAvatar(ctx, cx, cy, 40, ARCH_COLORS[a]);
      });

      // complemento: entrevistas moderadas
      ctx.strokeStyle = "#3a322b";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(90, 930);
      ctx.lineTo(w - 90, 930);
      ctx.stroke();
      drawAvatar(ctx, 130, 1030, 34, "#F7F1E4");
      ctx.fillStyle = "#F7F1E4";
      ctx.font = `500 40px ${f.mono}`;
      ctx.fillText(en ? "+ moderated interviews with real people" : "+ entrevistas moderadas con personas reales", 200, 1052);
    },
    [lang],
    1800,
    1180
  );
  const ref = useRef();
  const dim = useDimmed(0.35);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const s = hovered ? 1.02 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, 1), Math.min(1, dt * 8));
  });
  const w = 2.3;
  const h = (w * 1180) / 1800;
  return (
    <group ref={ref} position={position} rotation={[0, rotY, 0]} {...handlers}>
      <mesh castShadow>
        <boxGeometry args={[w + 0.08, h + 0.08, 0.06]} />
        <meshStandardMaterial color={FRAME_DARK} roughness={0.5} />
      </mesh>
      <mesh ref={dim} position={[0, 0, 0.031]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Visitantes: figuras de galería, mate y sin rasgos. Recorren la sala, se
// detienen frente a las obras y miran. Al visitar una obra se desvanecen para
// no tapar nada; con "reducir movimiento" se quedan quietos.
const PI = Math.PI;
const face = (from, to) => Math.atan2(to[0] - from[0], to[1] - from[1]);
const VISITOR_PATHS = [
  {
    color: "#8E7F6E",
    offset: 0,
    path: [
      { p: [-3.0, -5.6], look: PI, wait: 5 },
      { p: [-4.2, -3.4] },
      { p: [-4.9, 1.8], look: face([-4.9, 1.8], [-6.4, -0.6]), wait: 4 },
      { p: [-1.6, 3.6] },
      { p: [-1.4, -4.6], look: face([-1.4, -4.6], [0, -2.5]), wait: 3 },
    ],
  },
  {
    color: "#5D6B73",
    offset: 9,
    path: [
      { p: [5.0, -5.6], look: PI, wait: 5 },
      { p: [5.6, -2.4], look: PI / 2, wait: 4 },
      { p: [5.2, 2.6], look: PI / 2, wait: 4 },
      { p: [1.7, 4.4] },
      { p: [1.8, -4.4], look: PI, wait: 3 },
    ],
  },
  {
    color: "#A6604F",
    offset: 4,
    path: [
      { p: [-5.4, 4.4], look: -PI / 2, wait: 5 },
      { p: [-2.0, 6.8] },
      { p: [2.6, 6.2] },
      { p: [4.8, 4.6], look: PI / 2, wait: 4 },
      { p: [0.4, 3.6] },
    ],
  },
];
const WALK_SPEED = 0.55;

function buildTimeline(path) {
  const segs = [];
  let t = 0;
  path.forEach((wp, i) => {
    const next = path[(i + 1) % path.length];
    if (wp.wait) {
      segs.push({ type: "wait", t0: t, t1: t + wp.wait, p: wp.p, look: wp.look });
      t += wp.wait;
    }
    const d = Math.hypot(next.p[0] - wp.p[0], next.p[1] - wp.p[1]);
    segs.push({ type: "walk", t0: t, t1: t + d / WALK_SPEED, a: wp.p, b: next.p, look: face(wp.p, next.p) });
    t += d / WALK_SPEED;
  });
  return { segs, total: t };
}

function Visitor({ color, path, offset, hidden }) {
  const L = useContext(LightsContext);
  const root = useRef();
  const body = useRef();
  const legs = [useRef(), useRef()];
  const arms = [useRef(), useRef()];
  const mats = useRef([]);
  const state = useRef({ yaw: 0, swing: 0, opacity: 1, init: false });
  const { segs, total } = useMemo(() => buildTimeline(path), [path]);

  useEffect(() => {
    const list = [];
    root.current?.traverse((o) => {
      if (o.material) {
        o.material.transparent = true;
        list.push(o.material);
      }
    });
    mats.current = list;
  }, []);

  useFrame(({ clock }, dt) => {
    const g = root.current;
    if (!g) return;
    const st = state.current;
    const reduce = L.current.reduce;
    const t = reduce ? 0 : (clock.elapsedTime + offset) % total;
    const seg = segs.find((x) => t >= x.t0 && t < x.t1) || segs[0];
    let x, z, walking = false, phase = 0;
    if (seg.type === "wait") {
      [x, z] = seg.p;
    } else {
      const k = (t - seg.t0) / (seg.t1 - seg.t0);
      // arranque y frenada suaves
      const e = k * k * (3 - 2 * k);
      x = seg.a[0] + (seg.b[0] - seg.a[0]) * e;
      z = seg.a[1] + (seg.b[1] - seg.a[1]) * e;
      walking = k > 0.04 && k < 0.96;
      phase = (t - seg.t0) * WALK_SPEED * 5.2;
    }
    g.position.set(x, 0, z);
    // giro hacia donde camina o hacia la obra que mira
    let target = seg.look ?? st.yaw;
    let diff = Math.atan2(Math.sin(target - st.yaw), Math.cos(target - st.yaw));
    st.yaw = st.init ? st.yaw + diff * Math.min(1, dt * 5) : target;
    st.init = true;
    g.rotation.y = st.yaw;
    // ciclo de caminata: piernas y brazos opuestos, leve rebote
    st.swing += ((walking ? 1 : 0) - st.swing) * Math.min(1, dt * 6);
    const sw = Math.sin(phase) * 0.42 * st.swing;
    if (legs[0].current) legs[0].current.rotation.x = sw;
    if (legs[1].current) legs[1].current.rotation.x = -sw;
    if (arms[0].current) arms[0].current.rotation.x = -sw * 0.8;
    if (arms[1].current) arms[1].current.rotation.x = sw * 0.8;
    if (body.current) body.current.position.y = 0.84 + Math.abs(Math.cos(phase)) * 0.025 * st.swing;
    // se desvanecen mientras se visita una obra
    st.opacity += ((hidden ? 0 : 1) - st.opacity) * Math.min(1, dt * 5);
    g.visible = st.opacity > 0.02;
    for (const m of mats.current) m.opacity = st.opacity;
  });

  const skin = "#d9cbb8";
  return (
    <group ref={root}>
      {[-0.09, 0.09].map((x, i) => (
        <group key={x} ref={legs[i]} position={[x, 0.84, 0]}>
          <mesh position={[0, -0.42, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.055, 0.84, 12]} />
            <meshStandardMaterial color="#3a322b" roughness={0.8} />
          </mesh>
        </group>
      ))}
      <group ref={body} position={[0, 0.84, 0]}>
        <mesh position={[0, 0.34, 0]} castShadow>
          <cylinderGeometry args={[0.19, 0.24, 0.68, 20]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.68, 0]} castShadow>
          <sphereGeometry args={[0.19, 20, 12, 0, PI * 2, 0, PI / 2]} />
          <meshStandardMaterial color={color} roughness={0.85} />
        </mesh>
        {[-0.235, 0.235].map((x, i) => (
          <group key={x} ref={arms[i]} position={[x, 0.66, 0]}>
            <mesh position={[0, -0.3, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.045, 0.6, 10]} />
              <meshStandardMaterial color={color} roughness={0.85} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.1, 12]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <sphereGeometry args={[0.105, 20, 16]} />
          <meshStandardMaterial color={skin} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

// Piso de roble en tablas, dibujado en canvas (sin imágenes extra que bajar).
function useWoodTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext("2d");
    const rows = 8;
    const ph = c.height / rows;
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let r = 0; r < rows; r++) {
      let x = -rnd() * 400;
      while (x < c.width) {
        const len = 380 + rnd() * 420;
        const l = 44 + rnd() * 10;
        ctx.fillStyle = `hsl(${28 + rnd() * 6}, ${32 + rnd() * 8}%, ${l}%)`;
        ctx.fillRect(x, r * ph, len, ph);
        // vetas
        ctx.globalAlpha = 0.08;
        for (let g = 0; g < 9; g++) {
          ctx.fillStyle = rnd() > 0.5 ? "#2a1a0e" : "#fff2dc";
          ctx.fillRect(x, r * ph + rnd() * ph, len, 1 + rnd() * 2);
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(30,18,10,0.55)";
        ctx.fillRect(x, r * ph, 2, ph);
        x += len;
      }
      ctx.fillStyle = "rgba(30,18,10,0.6)";
      ctx.fillRect(0, r * ph, c.width, 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(6, 12);
    t.anisotropy = 8;
    return t;
  }, []);
}

function Pedestal({ position, w = 1.1, h = 1.1, d = 1.1 }) {
  return (
    <mesh position={[position[0], h / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color="#F7F3EC" roughness={0.7} />
    </mesh>
  );
}

// Escultura del Design System: piezas de colores (tokens, componentes
// primitivos y compuestos) que suben en espiral.
function SystemSculpture({ hovered, ...handlers }) {
  const ref = useRef();
  const spin = useRef();
  const colors = ["#3D5AFE", "#0EA5A0", "#FFB020", "#F43F5E", "#221D18", "#5B72FF"];
  useEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const c = new THREE.Color();
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < 89; i++) {
      const t = i / 88;
      const r = 0.12 + 0.36 * Math.sin(t * Math.PI);
      const a = i * golden;
      const pos = new THREE.Vector3(Math.cos(a) * r, t * 1.5, Math.sin(a) * r);
      q.setFromEuler(new THREE.Euler(0, -a, 0.3 * Math.sin(i)));
      const s = 0.85 + 0.3 * ((i * 37) % 7) / 7;
      m.compose(pos, q, new THREE.Vector3(s, s, s));
      ref.current.setMatrixAt(i, m);
      ref.current.setColorAt(i, c.set(colors[i % colors.length]));
    }
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.instanceColor.needsUpdate = true;
  }, []);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * (hovered ? 0.6 : 0.18);
  });
  return (
    <group position={[0, 0, -2.5]} {...handlers}>
      <Pedestal position={[0, 0, 0]} w={1.5} h={0.9} d={1.5} />
      <group ref={spin} position={[0, 1.02, 0]}>
        <instancedMesh ref={ref} args={[null, null, 89]} castShadow>
          <boxGeometry args={[0.11, 0.05, 0.07]} />
          <meshStandardMaterial roughness={0.35} metalness={0.1} />
        </instancedMesh>
      </group>
      {/* vitrina de vidrio */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.4, 1.8, 1.4]} />
        <meshStandardMaterial color="#dfe8ff" transparent opacity={0.08} roughness={0.05} metalness={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}

// Usuarios sintéticos: esferas que bajan en espiral por el embudo. Algunas
// abandonan en el camino (salen disparadas y se apagan), como en el funnel real.
const SYNTH_COUNT = 42;
function SyntheticUsers({ rings, topY, step, hovered }) {
  const ref = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const users = useMemo(
    () =>
      Array.from({ length: SYNTH_COUNT }, (_, i) => ({
        offset: i / SYNTH_COUNT,
        angle: (i * 2.399963) % (Math.PI * 2),
        // ~1 de cada 4 abandona, en un anillo distinto cada vez
        dropAt: (i * 7) % 4 === 0 ? 1 + ((i * 3) % (rings.length - 2)) : -1,
      })),
    [rings.length]
  );
  const colors = useMemo(() => {
    const c = new THREE.Color();
    const arr = new Float32Array(SYNTH_COUNT * 3);
    users.forEach((u, i) => {
      c.set(u.dropAt >= 0 ? "#F43F5E" : "#5FE3D0");
      c.toArray(arr, i * 3);
    });
    return arr;
  }, [users]);
  useEffect(() => {
    for (let i = 0; i < SYNTH_COUNT; i++) {
      ref.current.setColorAt(i, new THREE.Color().fromArray(colors, i * 3));
    }
    ref.current.instanceColor.needsUpdate = true;
  }, [colors]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const speed = hovered ? 0.16 : 0.09;
    const t0 = clock.elapsedTime * speed;
    users.forEach((u, i) => {
      const p = (t0 + u.offset) % 1; // 0 arriba → 1 abajo
      const ringF = p * (rings.length - 1);
      const ri = Math.floor(ringF);
      const r = THREE.MathUtils.lerp(rings[ri], rings[Math.min(ri + 1, rings.length - 1)], ringF - ri) * 1.12 + 0.04;
      const a = u.angle + p * Math.PI * 5;
      let x = Math.cos(a) * r;
      let z = Math.sin(a) * r;
      let y = topY + 0.35 - p * ((rings.length - 1) * step + 0.55);
      let scale = 1;
      if (u.dropAt >= 0 && ringF > u.dropAt) {
        // abandona: sale hacia afuera y cae
        const k = Math.min(1, (ringF - u.dropAt) / 1.6);
        x += Math.cos(a) * k * 0.9;
        z += Math.sin(a) * k * 0.9;
        y -= k * k * 0.8;
        scale = 1 - k;
      }
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(Math.max(scale, 0.001));
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[null, null, SYNTH_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[0.034, 12, 12]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

// Escultura del funnel: anillos que se angostan, de 10 pasos a 8.
function FunnelSculpture({ hovered }) {
  const rings = [0.62, 0.55, 0.48, 0.41, 0.34, 0.27, 0.2, 0.14];
  return (
    <group position={[-6.4, 0, -0.6]}>
      <SyntheticUsers rings={rings} topY={2.35} step={0.17} hovered={hovered} />
      <Pedestal position={[0, 0, 0]} w={1.2} h={0.9} d={1.2} />
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 2.35 - i * 0.17, 0]} castShadow>
          <cylinderGeometry args={[r, r * 0.92, 0.12, 48]} />
          <meshStandardMaterial
            color={new THREE.Color("#FFB020").lerp(new THREE.Color("#AC5142"), i / rings.length)}
            roughness={0.3}
            metalness={0.25}
            transparent
            opacity={0.82}
          />
        </mesh>
      ))}
    </group>
  );
}

function ManifestoWall({ lang, hovered, ...handlers }) {
  const lines = lang === "en"
    ? ["Understand before designing", "Find the friction", "Design with constraints", "Validate before defending", "Design with engineering", "Nothing is final"]
    : ["Entiendo antes de diseñar", "Busco la fricción", "Diseño con restricciones", "Valido antes de defender", "Diseño junto a desarrollo", "Nada es definitivo"];
  return (
    <group position={[7.93, 2.45, 3.2]} rotation={[0, -Math.PI / 2, 0]} {...handlers}>
      {lines.map((l, i) => (
        <ManifestoCard key={i} index={i} text={l} lang={lang} hovered={hovered} />
      ))}
    </group>
  );
}

function ManifestoCard({ index, text, lang, hovered }) {
  const tex = useTextTexture(
    (ctx, w, h, f) => {
      ctx.fillStyle = "#221D18";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#D9735F";
      ctx.font = `600 120px ${f.serif}`;
      ctx.fillText(`0${index + 1}`, 60, 170);
      ctx.fillStyle = "#F7F1E4";
      ctx.font = `500 68px ${f.serif}`;
      wrapText(ctx, text, 60, 330, w - 120, 84);
    },
    [text, lang],
    512,
    512
  );
  const col = index % 3;
  const row = Math.floor(index / 3);
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    const z = hovered ? 0.06 + 0.02 * Math.sin(index) : 0;
    ref.current.position.z += (z - ref.current.position.z) * Math.min(1, dt * 6);
  });
  return (
    <group ref={ref} position={[(col - 1) * 1.15, (0.5 - row) * 1.15, 0]}>
      <mesh>
        <boxGeometry args={[1.0, 1.0, 0.06]} />
        <meshStandardMaterial color={FRAME_GOLD} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial map={tex} roughness={0.7} />
      </mesh>
    </group>
  );
}

function WallTitle({ lang }) {
  const tex = useTextTexture(
    (ctx, w, h, f) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#221D18";
      ctx.textAlign = "center";
      // solo el nombre: el cargo ya está en grande en la portada
      ctx.font = `500 170px ${f.serif}`;
      ctx.fillText("Charly Gourves", w / 2, 190);
    },
    [lang],
    2048,
    300
  );
  const dim = useDimmed(0.06);
  return (
    <mesh ref={dim} position={[0, 5.15, -7.94]}>
      <planeGeometry args={[6.8, 1]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

// Banca de galería: tabla de roble sobre un zócalo negro retranqueado, así
// la tabla parece flotar y se separa bien del piso.
function Bench({ position }) {
  return (
    <group position={position}>
      <RoundedBox args={[2.4, 0.12, 0.62]} radius={0.03} position={[0, 0.46, 0]} castShadow>
        <meshStandardMaterial color="#D2B086" roughness={0.5} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.96, 0.4, 0.38]} />
        <meshStandardMaterial color="#2e2722" roughness={0.55} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Stanchions({ z = -6.7, xs = [-2.4, 0, 2.4] }) {
  return (
    <group>
      {xs.map((x) => (
        <group key={x} position={[x, 0, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1, 12]} />
            <meshStandardMaterial color={FRAME_GOLD} metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 1.02, 0]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color={FRAME_GOLD} metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.16, 0.18, 0.04, 24]} />
            <meshStandardMaterial color={FRAME_GOLD} metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {xs.slice(0, -1).map((x, i) => (
        <mesh key={x} position={[(x + xs[i + 1]) / 2, 0.9, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, xs[i + 1] - x, 8]} />
          <meshStandardMaterial color="#A3233A" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Skylight({ z }) {
  const L = useContext(LightsContext);
  const ref = useRef();
  const on = useMemo(() => new THREE.Color("#FFF3DC"), []);
  const off = useMemo(() => new THREE.Color("#2a241e"), []);
  useFrame(() => ref.current && ref.current.color.lerpColors(off, on, L.current.level));
  return (
    <mesh position={[0, 5.98, z]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 1.1]} />
      <meshBasicMaterial ref={ref} color="#FFF3DC" />
    </mesh>
  );
}

function Room() {
  const wood = useWoodTexture();
  return (
    <group>
      {/* piso pulido */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 4]} receiveShadow>
        <planeGeometry args={[16, 24]} />
        <MeshReflectorMaterial
          blur={[300, 80]}
          resolution={512}
          mixBlur={1}
          mixStrength={0.9}
          roughness={0.8}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          map={wood}
          color="#c9b49c"
          metalness={0.2}
        />
      </mesh>
      {/* muros */}
      <mesh position={[0, 3, -8]} receiveShadow>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[-8, 3, 4]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[8, 3, 4]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      <mesh position={[0, 3, 16]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[16, 6]} />
        <meshStandardMaterial color={WALL} roughness={0.95} />
      </mesh>
      {/* zócalos */}
      {[
        [[0, 0.08, -7.98], [16, 0.16, 0.04], 0],
        [[-7.98, 0.08, 4], [24, 0.16, 0.04], Math.PI / 2],
        [[7.98, 0.08, 4], [24, 0.16, 0.04], Math.PI / 2],
      ].map(([p, s, r], i) => (
        <mesh key={i} position={p} rotation={[0, r, 0]}>
          <boxGeometry args={s} />
          <meshStandardMaterial color="#2a221b" />
        </mesh>
      ))}
      {/* cornisa: separa muro y techo, da terminación */}
      {[
        [[0, 5.9, -7.95], [16, 0.2, 0.1], 0],
        [[-7.95, 5.9, 4], [24, 0.2, 0.1], Math.PI / 2],
        [[7.95, 5.9, 4], [24, 0.2, 0.1], Math.PI / 2],
      ].map(([p, s, r], i) => (
        <mesh key={i} position={p} rotation={[0, r, 0]}>
          <boxGeometry args={s} />
          <meshStandardMaterial color="#F6F1E8" roughness={0.8} />
        </mesh>
      ))}
      {/* vigas del techo entre los tragaluces */}
      {[-6.2, -2.75, 0.75, 4.25, 7.75, 11.25].map((z) => (
        <mesh key={z} position={[0, 5.82, z]}>
          <boxGeometry args={[16, 0.36, 0.3]} />
          <meshStandardMaterial color="#E9E2D6" roughness={0.9} />
        </mesh>
      ))}
      {/* techo con tragaluz */}
      <mesh position={[0, 6, 4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 24]} />
        <meshStandardMaterial color="#E6E0D6" roughness={1} />
      </mesh>
      {[-3.5, 0, 3.5, 7, 10.5].map((z) => (
        <Skylight key={z} z={z - 1} />
      ))}
      {/* rieles de luz */}
      {[-5.6, 5.6].map((x) => (
        <mesh key={x} position={[x, 5.85, 2]}>
          <boxGeometry args={[0.06, 0.06, 20]} />
          <meshStandardMaterial color="#1c1712" />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene({ lang, hoveredId, selectedId, setHoveredId, onSelect, texts, isMobile, lightsOn = true, focus = false }) {
  const on = (id) => hoveredId === id || selectedId === id;
  const fonts = useSiteFonts();
  const lights = useRef({ on: true, level: 1, changedAt: -100, reduce: false });
  useEffect(() => {
    lights.current.reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    if (lights.current.on === lightsOn) return;
    lights.current.on = lightsOn;
    lights.current.changedAt = now();
  }, [lightsOn]);
  const bind = (id) => ({
    onPointerOver: (e) => {
      e.stopPropagation();
      // con el dedo no hay "hover": si se marcara, la obra quedaba agrandada
      // y animándose después de cerrar la ficha
      if (e.pointerType === "touch") return;
      setHoveredId(id);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      setHoveredId(null);
      document.body.style.cursor = "auto";
    },
    onClick: (e) => {
      e.stopPropagation();
      onSelect(id);
    },
  });

  const st = Object.fromEntries(STATIONS.map((x) => [x.id, x]));
  const plaque = (id, extra) => ({
    number: `N.º ${String(STATIONS.findIndex((x) => x.id === id) + 1).padStart(2, "0")}`,
    title: texts[id].title,
    stat: st[id].stat,
    statLabel: texts[id].statLabel,
    color: st[id].color,
    lang,
    ...extra,
  });

  return (
    <LightsContext.Provider value={lights}>
    <FontContext.Provider value={fonts}>
      <LightsDriver />
      <Flashlight />
      <color attach="background" args={["#1a1613"]} />
      <fog attach="fog" args={["#1a1613", 18, 32]} />
      {/* menos luz de relleno y focos más marcados: las obras brillan y la
          sala gana profundidad, en vez de verse pareja y gris */}
      <SceneLights />

      <Room />
      {/* en celular el nombre ya está en la cabecera y el letrero quedaba tapado */}
      {!isMobile && <WallTitle lang={lang} />}

      {/* Sala 1: muro principal */}
      <Artwork
        src="/images/museo/viaje-landing-scroll.jpg"
        scroll
        active={on("landing-viajes")}
        w={4.2}
        h={3.15}
        position={[0, 2.85, -7.92]}
        frame={FRAME_GOLD}
        hovered={hoveredId === "landing-viajes"}
        {...bind("landing-viajes")}
      />
      <Plaque position={[3.05, 1.5, -7.95]} {...plaque("landing-viajes", {})} />
      <Spot position={[0, 5.8, -5.2]} target={[0, 2.85, -8]} intensity={2.9} angle={0.5} />
      <Stanchions />

      {/* Sala central: escultura del Design System */}
      <SystemSculpture hovered={hoveredId === "design-system"} {...bind("design-system")} />
      <Plaque position={[0, 0.5, -1.73]} scale={0.62} {...plaque("design-system", { stat: null, note: texts["design-system"].technique })} />
      <Spot position={[0, 5.8, -0.6]} target={[0, 1.5, -2.5]} intensity={2.7} angle={0.38} />

      {/* Muro del fondo, derecha: láminas reales del Design System */}
      <group {...bind("design-system")}>
        <Artwork
          src="/images/museo/ds-anatomia.jpg"
          w={1.9}
          h={1.24}
          position={[4.75, 3.0, -7.92]}
          hovered={hoveredId === "design-system"}
        />
        <Artwork
          src="/images/museo/ds-estados.jpg"
          live={uploaderLive}
          active={on("design-system")}
          lang={lang}
          w={0.76}
          h={1.24}
          mat={0.1}
          position={[6.6, 3.0, -7.92]}
          hovered={hoveredId === "design-system"}
        />
      </group>
      <Spot position={[5.4, 5.8, -5.4]} target={[5.4, 3.2, -8]} intensity={2.4} angle={0.5} />

      {/* Sala 2: muro izquierdo, funnel CSI */}
      <Artwork
        src="/images/museo/csi-planes.jpg"
        live={plansLive}
        active={on("funnel-csi")}
        w={3}
        h={2.25}
        position={[-7.92, 2.55, -3.0]}
        rotY={Math.PI / 2}
        hovered={hoveredId === "funnel-csi"}
        {...bind("funnel-csi")}
      />
      <SyntheticBoard position={[-7.92, 2.95, -6.45]} rotY={Math.PI / 2} lang={lang} hovered={hoveredId === "funnel-csi"} {...bind("funnel-csi")} />
      <Plaque position={[-7.95, 1.4, -6.45]} rotY={Math.PI / 2} {...plaque("funnel-csi", { stat: null, note: texts["funnel-csi"].technique })} />
      <group {...bind("funnel-csi")}>
        <FunnelSculpture hovered={hoveredId === "funnel-csi"} />
      </group>
      <Spot position={[-5.6, 5.8, -3.0]} target={[-8, 2.6, -3.0]} intensity={2.6} />
      <Spot position={[-5.6, 5.8, -6.45]} target={[-8, 2.6, -6.45]} intensity={2.2} angle={0.42} />
      <Spot position={[-5.6, 5.8, -0.6]} target={[-6.4, 1.6, -0.6]} intensity={1.6} angle={0.3} />

      {/* Sala 3: tríptico Beliv */}
      {[
        ["/images/museo/beliv-home-scroll.jpg", -4.3],
        ["/images/museo/beliv-score-scroll.jpg", -3],
        ["/images/museo/beliv-salud-scroll.jpg", -1.7],
      ].map(([src, z]) => (
        <Artwork
          key={src}
          src={src}
          w={0.95}
          h={2.0}
          mat={0.07}
          position={[7.92, 2.6, z]}
          scroll
          active={on("beliv")}
          rotY={-Math.PI / 2}
          hovered={hoveredId === "beliv"}
          {...bind("beliv")}
        />
      ))}
      <Plaque position={[7.95, 1.4, -0.15]} rotY={-Math.PI / 2} {...plaque("beliv", { stat: null, note: texts.beliv.technique })} />
      <Spot position={[5.6, 5.8, -3]} target={[8, 2.5, -3]} intensity={2.7} angle={0.5} />

      {/* Sala 5: muro del fondo, chatbot con sus pantallas reales */}
      <Artwork
        src="/images/museo/chatbot-chat.jpg"
        live={chatLive}
        active={on("chatbot")}
        lang={lang}
        w={2.3}
        h={1.27}
        position={[-5.85, 3.05, -7.92]}
        hovered={hoveredId === "chatbot"}
        {...bind("chatbot")}
      />
      {[
        ["/images/museo/chatbot-embudo.jpg", 3.55],
        ["/images/museo/chatbot-conversaciones.jpg", 2.5],
      ].map(([src, y]) => (
        <Artwork
          key={src}
          src={src}
          w={1.1}
          h={0.63}
          mat={0.08}
          position={[-3.45, y, -7.92]}
          live={src.includes("embudo") ? funnelLive : undefined}
          active={on("chatbot")}
          lang={lang}
          hovered={hoveredId === "chatbot"}
          {...bind("chatbot")}
        />
      ))}
      <Plaque position={[-5.85, 1.45, -7.95]} {...plaque("chatbot", { stat: null, note: texts.chatbot.technique })} />
      <Spot position={[-5.0, 5.8, -5.3]} target={[-5.0, 3.0, -8]} intensity={2.7} angle={0.48} />

      {/* Sala 4: manifiesto */}
      <ManifestoWall lang={lang} hovered={hoveredId === "manifiesto"} {...bind("manifiesto")} />
      <Spot position={[5.6, 5.8, 3.2]} target={[8, 2.4, 3.2]} intensity={2.3} angle={0.5} />

      {/* Vestíbulo: retrato del artista */}
      <Artwork
        src="/images/charly-photo.jpeg"
        w={1.5}
        h={1.5}
        position={[-7.92, 2.7, 3.2]}
        rotY={Math.PI / 2}
        frame={FRAME_GOLD}
        mat={0.18}
        hovered={hoveredId === "artista"}
        {...bind("artista")}
      />
      <Plaque position={[-7.95, 1.18, 3.2]} rotY={Math.PI / 2} {...plaque("artista", { stat: null, note: texts.artista.technique })} />
      <Spot position={[-5.6, 5.8, 3.2]} target={[-8, 2.7, 3.2]} intensity={2.5} angle={0.36} />

      {/* par de bancas simétricas, paralelas al muro principal y alineadas con
          los pedestales: la sala se lee ordenada y el centro queda libre */}
      <Bench position={[-3.3, 0, 0.9]} />
      <Bench position={[3.3, 0, 0.9]} />

      {/* visitantes que recorren la sala */}
      {VISITOR_PATHS.map((v) => (
        <Visitor key={v.color} {...v} hidden={focus} />
      ))}

      <ContactShadows position={[0, 0.005, 2]} scale={[16, 20]} resolution={isMobile ? 512 : 1024} far={2.5} blur={2.2} opacity={0.6} color="#1a120c" />
    </FontContext.Provider>
    </LightsContext.Provider>
  );
}


