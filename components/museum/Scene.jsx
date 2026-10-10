"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, MeshReflectorMaterial, RoundedBox } from "@react-three/drei";

const WALL = "#EFE9DF";
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

function Spot({ position, target, intensity = 2.2, angle = 0.42, color = "#fff4e0" }) {
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
        intensity={intensity}
        angle={angle}
        penumbra={0.65}
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
        <meshStandardMaterial map={tex} roughness={0.55} />
      </mesh>
    </group>
  );
}

function Plaque({ position, rotY = 0, title, subtitle, lang }) {
  const tex = useTextTexture(
    (ctx, w, h) => {
      ctx.fillStyle = "#FBF8F2";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#221D18";
      ctx.font = "600 64px Georgia, 'Times New Roman', serif";
      wrapText(ctx, title, 48, 110, w - 96, 74);
      ctx.fillStyle = "#6B6259";
      ctx.font = "36px 'Courier New', monospace";
      wrapText(ctx, subtitle, 48, h - 90, w - 96, 44);
    },
    [title, subtitle, lang]
  );
  return (
    <mesh position={position} rotation={[0, rotY, 0]}>
      <planeGeometry args={[0.9, 0.45]} />
      <meshStandardMaterial map={tex} roughness={0.8} />
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

// Escultura del funnel: anillos que se angostan, de 10 pasos a 8.
function FunnelSculpture() {
  const rings = [0.62, 0.55, 0.48, 0.41, 0.34, 0.27, 0.2, 0.14];
  return (
    <group position={[-6.4, 0, -0.6]}>
      <Pedestal position={[0, 0, 0]} w={1.2} h={0.9} d={1.2} />
      {rings.map((r, i) => (
        <mesh key={i} position={[0, 2.35 - i * 0.17, 0]} castShadow>
          <cylinderGeometry args={[r, r * 0.92, 0.12, 48]} />
          <meshStandardMaterial
            color={new THREE.Color("#FFB020").lerp(new THREE.Color("#AC5142"), i / rings.length)}
            roughness={0.3}
            metalness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function ManifestoWall({ lang, hovered, ...handlers }) {
  const lines = lang === "en"
    ? ["Question everything", "Find the friction", "Design with constraints", "Test before defending", "Build with the team", "Nothing is final"]
    : ["Cuestiono todo", "Busco la fricción", "Diseño con restricciones", "Pruebo antes de defender", "Construyo con quien lo sostiene", "Nada es definitivo"];
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
      ctx.font = "600 130px Georgia, 'Times New Roman', serif";
      ctx.fillText("Charly Gourves", w / 2, 150);
      ctx.fillStyle = "#AC5142";
      ctx.font = "44px 'Courier New', monospace";
      ctx.fillText(
        lang === "en" ? "PRODUCT DESIGN · PERMANENT EXHIBITION" : "DISEÑO DE PRODUCTO · EXPOSICIÓN PERMANENTE",
        w / 2,
        235
      );
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

function Bench({ position }) {
  return (
    <group position={position}>
      <RoundedBox args={[2.6, 0.14, 0.7]} radius={0.04} position={[0, 0.48, 0]} castShadow>
        <meshStandardMaterial color="#6b4a33" roughness={0.6} />
      </RoundedBox>
      {[-1.05, 1.05].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]}>
          <boxGeometry args={[0.1, 0.44, 0.6]} />
          <meshStandardMaterial color="#1c1712" metalness={0.5} roughness={0.4} />
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
          <meshStandardMaterial color="#7A1F2B" roughness={0.8} />
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
          mixStrength={0.6}
          roughness={0.85}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
          color="#8a735f"
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
      {/* techo con tragaluz */}
      <mesh position={[0, 6, 4]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 24]} />
        <meshStandardMaterial color="#E6E0D6" roughness={1} />
      </mesh>
      {[-3.5, 0, 3.5, 7, 10.5].map((z) => (
        <mesh key={z} position={[0, 5.98, z - 1]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 1.1]} />
          <meshBasicMaterial color="#FFF8EA" toneMapped={false} />
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
      <color attach="background" args={["#d9d2c6"]} />
      <fog attach="fog" args={["#d9d2c6", 18, 34]} />
      <ambientLight intensity={0.8} />
      <hemisphereLight args={["#fff8ec", "#3a2c22", 0.55]} />
      <directionalLight position={[4, 8, 6]} intensity={0.5} />

      <Room />
      <WallTitle lang={lang} />

      {/* Sala 1: muro principal */}
      <Artwork
        src="/images/viaje-landing-unificada.png"
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
        src="/images/csi-landing.png"
        w={3}
        h={2.25}
        position={[-7.92, 2.7, -3.3]}
        rotY={Math.PI / 2}
        hovered={hoveredId === "funnel-csi"}
        {...bind("funnel-csi")}
      />
      <Plaque position={[-7.95, 1.6, -5.3]} rotY={Math.PI / 2} title={texts["funnel-csi"].title} subtitle="BICE VIDA · −12%" lang={lang} />
      <group {...bind("funnel-csi")}>
        <FunnelSculpture />
      </group>
      <Spot position={[-5.6, 5.8, -3.3]} target={[-8, 2.6, -3.3]} intensity={2.4} />
      <Spot position={[-5.6, 5.8, -0.6]} target={[-6.4, 1.6, -0.6]} intensity={1.4} angle={0.3} />

      {/* Sala 3: tríptico Beliv */}
      {[
        ["/images/beliv-home.png", -4.3],
        ["/images/beliv-score.png", -3],
        ["/images/beliv-salud.png", -1.7],
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
      <Plaque position={[7.95, 1.2, -0.55]} rotY={-Math.PI / 2} title={texts.beliv.title} subtitle="Design Sprint · 8+" lang={lang} />
      <Spot position={[5.6, 5.8, -3]} target={[8, 2.5, -3]} intensity={2.4} angle={0.5} />

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
      <Plaque position={[-7.95, 1.45, 4.6]} rotY={Math.PI / 2} title={texts.artista.title} subtitle="Santiago, Chile" lang={lang} />
      <Spot position={[-5.6, 5.8, 3.2]} target={[-8, 2.7, 3.2]} intensity={2.2} angle={0.36} />

      <Bench position={[0, 0, 3.4]} />
    </>
  );
}
