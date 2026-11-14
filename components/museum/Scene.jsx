"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, MeshReflectorMaterial, RoundedBox, ContactShadows } from "@react-three/drei";

const WALL = "#E9E2D6";
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

// Textura de texto dibujada en canvas: placas, títulos y el manifiesto.
function useTextTexture(draw, deps, w = 1024, h = 512) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    draw(ctx, w, h);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
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

function Spot({ position, target, intensity = 2.2, angle = 0.42, color = "#ffeccc" }) {
  const targetObj = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    targetObj.position.set(...target);
    targetObj.updateMatrixWorld();
  }, [targetObj, target]);
  return (
    <>
      <primitive object={targetObj} />
      <spotLight
        position={position}
        target={targetObj}
        intensity={intensity * 1.5}
        angle={angle}
        penumbra={0.55}
        decay={0}
        distance={14}
        color={color}
      />
      {/* lámpara de riel en el techo */}
      <mesh position={position}>
        <cylinderGeometry args={[0.09, 0.13, 0.32, 16]} />
        <meshStandardMaterial color="#1c1712" metalness={0.6} roughness={0.35} />
      </mesh>
    </>
  );
}

// Marco con passe-partout. `rotY` orienta el cuadro según el muro.
function Artwork({ src, w, h, position, rotY = 0, frame = FRAME_DARK, mat = 0.12, hovered, ...handlers }) {
  const tex = useCroppedTexture(src, w / h);
  const group = useRef();
  useFrame((_, dt) => {
    if (!group.current) return;
    const s = hovered ? 1.025 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, 1), Math.min(1, dt * 8));
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
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[w, h]} />
        {/* sin luz propia: la captura se ve nítida y con sus colores reales */}
        <meshBasicMaterial map={tex} color="#ececec" />
      </mesh>
    </group>
  );
}

function Plaque({ position, rotY = 0, title, subtitle, lang }) {
  const tex = useTextTexture(
    (ctx, w, h) => {
      ctx.fillStyle = "#FBF8F2";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#D8CDBB";
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, w - 6, h - 6);
      ctx.fillStyle = "#1A1511";
      ctx.font = "700 72px Georgia, 'Times New Roman', serif";
      wrapText(ctx, title, 48, 115, w - 96, 82);
      ctx.fillStyle = "#6E2A1F";
      ctx.font = "700 46px 'Courier New', monospace";
      wrapText(ctx, subtitle, 48, h - 60, w - 96, 46);
    },
    [title, subtitle, lang]
  );
  return (
    <mesh position={position} rotation={[0, rotY, 0]}>
      <planeGeometry args={[1.1, 0.55]} />
      {/* sin sombreado: la cartela se lee igual dentro y fuera del foco */}
      <meshBasicMaterial map={tex} color="#fbf6ec" />
    </mesh>
  );
}

function Pedestal({ position, w = 1.1, h = 1.1, d = 1.1 }) {
  return (
    <mesh position={[position[0], h / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color="#F7F3EC" roughness={0.7} />
    </mesh>
  );
}

// Escultura del Design System: 89 piezas, una por componente, en espiral.
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
    (ctx, w, h) => {
      ctx.fillStyle = "#221D18";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#D9735F";
      ctx.font = "700 120px Georgia, serif";
      ctx.fillText(`0${index + 1}`, 60, 170);
      ctx.fillStyle = "#F7F1E4";
      ctx.font = "600 70px Georgia, serif";
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
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#221D18";
      ctx.textAlign = "center";
      ctx.font = "600 150px Georgia, 'Times New Roman', serif";
      ctx.fillText("Charly Gourves", w / 2, 160);
      // rojo oscuro y en negrita: el rust original se perdía sobre el muro
      ctx.fillStyle = "#6E2A1F";
      ctx.font = "700 72px 'Courier New', monospace";
      ctx.fillText("AI PRODUCT DESIGNER", w / 2, 262);
    },
    [lang],
    2048,
    300
  );
  return (
    <mesh position={[0, 5.15, -7.94]}>
      <planeGeometry args={[6.8, 1]} />
      <meshBasicMaterial map={tex} transparent toneMapped={false} />
    </mesh>
  );
}

function Bench({ position, rotY = 0 }) {
  return (
    <group position={position} rotation={[0, rotY, 0]}>
      <RoundedBox args={[2.6, 0.14, 0.7]} radius={0.04} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#D9B98F" roughness={0.55} />
      </RoundedBox>
      {/* canto más oscuro para que la tabla se lea como volumen */}
      <mesh position={[0, 0.405, 0]}>
        <boxGeometry args={[2.5, 0.02, 0.62]} />
        <meshStandardMaterial color="#8C6A45" roughness={0.6} />
      </mesh>
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]}>
          <boxGeometry args={[0.08, 0.4, 0.56]} />
          <meshStandardMaterial color="#141414" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
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

function Room() {
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
          color="#7a6a5c"
          metalness={0.25}
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
      {/* techo con tragaluz */}
      <mesh position={[0, 6, 4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 24]} />
        <meshStandardMaterial color="#E6E0D6" roughness={1} />
      </mesh>
      {[-3.5, 0, 3.5, 7, 10.5].map((z) => (
        <mesh key={z} position={[0, 5.98, z - 1]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 1.1]} />
          <meshBasicMaterial color="#FFF3DC" />
        </mesh>
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

export default function Scene({ lang, hoveredId, setHoveredId, onSelect, texts }) {
  const bind = (id) => ({
    onPointerOver: (e) => {
      e.stopPropagation();
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

  return (
    <>
      <color attach="background" args={["#1a1613"]} />
      <fog attach="fog" args={["#1a1613", 16, 30]} />
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#fff3df", "#3a2e25", 0.7]} />
      <directionalLight position={[4, 8, 6]} intensity={0.25} />

      <Room />
      <WallTitle lang={lang} />

      {/* Sala 1: muro principal */}
      <Artwork
        src="/images/museo/viaje-landing-unificada.jpg"
        w={4.2}
        h={3.15}
        position={[0, 2.85, -7.92]}
        frame={FRAME_GOLD}
        hovered={hoveredId === "landing-viajes"}
        {...bind("landing-viajes")}
      />
      <Plaque position={[2.9, 1.7, -7.95]} title={texts["landing-viajes"].title} subtitle="BICE VIDA · +16%" lang={lang} />
      <Spot position={[0, 5.8, -5.2]} target={[0, 2.85, -8]} intensity={2.6} angle={0.5} />
      <Stanchions />

      {/* Sala central: escultura del Design System */}
      <SystemSculpture hovered={hoveredId === "design-system"} {...bind("design-system")} />
      <Spot position={[0, 5.8, -1]} target={[0, 1.5, -2.5]} intensity={2.4} angle={0.38} />

      {/* Sala 2: muro izquierdo, funnel CSI */}
      <Artwork
        src="/images/museo/csi-landing.jpg"
        w={3}
        h={2.25}
        position={[-7.92, 2.7, -3.3]}
        rotY={Math.PI / 2}
        hovered={hoveredId === "funnel-csi"}
        {...bind("funnel-csi")}
      />
      <Plaque position={[-7.95, 1.6, -5.55]} rotY={Math.PI / 2} title={texts["funnel-csi"].title} subtitle="BICE VIDA · −12%" lang={lang} />
      <group {...bind("funnel-csi")}>
        <FunnelSculpture hovered={hoveredId === "funnel-csi"} />
      </group>
      <Spot position={[-5.6, 5.8, -3.3]} target={[-8, 2.6, -3.3]} intensity={2.4} />
      <Spot position={[-5.6, 5.8, -0.6]} target={[-6.4, 1.6, -0.6]} intensity={1.4} angle={0.3} />

      {/* Sala 3: tríptico Beliv */}
      {[
        ["/images/museo/beliv-home.jpg", -4.3],
        ["/images/museo/beliv-score.jpg", -3],
        ["/images/museo/beliv-salud.jpg", -1.7],
      ].map(([src, z]) => (
        <Artwork
          key={src}
          src={src}
          w={0.95}
          h={2.0}
          mat={0.07}
          position={[7.92, 2.6, z]}
          rotY={-Math.PI / 2}
          hovered={hoveredId === "beliv"}
          {...bind("beliv")}
        />
      ))}
      <Plaque position={[7.95, 1.2, -0.4]} rotY={-Math.PI / 2} title={texts.beliv.title} subtitle="Design Sprint · 8+" lang={lang} />
      <Spot position={[5.6, 5.8, -3]} target={[8, 2.5, -3]} intensity={2.4} angle={0.5} />

      {/* Sala 5: muro del fondo, chatbot */}
      <Artwork
        src="/images/museo/chatbot.jpg"
        w={2.7}
        h={1.5}
        position={[-4.9, 2.75, -7.92]}
        hovered={hoveredId === "chatbot"}
        {...bind("chatbot")}
      />
      <Plaque position={[-4.9, 1.45, -7.95]} title={texts["chatbot"].title} subtitle="BICE VIDA · 611" lang={lang} />
      <Spot position={[-4.9, 5.8, -5.2]} target={[-4.9, 2.75, -8]} intensity={2.4} angle={0.42} />

      {/* Sala 4: manifiesto */}
      <ManifestoWall lang={lang} hovered={hoveredId === "manifiesto"} {...bind("manifiesto")} />
      <Spot position={[5.6, 5.8, 3.2]} target={[8, 2.4, 3.2]} intensity={2} angle={0.5} />

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
      <Plaque position={[-7.95, 1.45, 4.75]} rotY={Math.PI / 2} title={texts.artista.title} subtitle="Santiago, Chile" lang={lang} />
      <Spot position={[-5.6, 5.8, 3.2]} target={[-8, 2.7, 3.2]} intensity={2.2} angle={0.36} />

      {/* banca a un costado: queda a la vista y no detrás del texto de la portada */}
      <Bench position={[3.6, 0, 0.6]} rotY={-0.35} />
      <ContactShadows position={[0, 0.005, 2]} scale={[16, 20]} resolution={1024} far={2.5} blur={2.2} opacity={0.55} color="#1a120c" />
    </>
  );
}
