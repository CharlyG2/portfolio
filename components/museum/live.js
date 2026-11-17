// Obras vivas: animaciones que se dibujan encima de cada captura cuando el
// visitante pasa el mouse (o abre la obra). Todo está en coordenadas de la
// imagen original, así que el primer cuadro calza con la captura y la
// animación arranca sin salto.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const seg = (t, a, b) => clamp((t - a) / (b - a));

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrap(ctx, text, maxW) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  lines.push(line);
  return lines;
}

// Puntero de mouse, con un pequeño "clic" (press 0→1).
export function drawCursor(ctx, x, y, s = 1, press = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s * (1 - press * 0.12), s * (1 - press * 0.12));
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 17);
  ctx.lineTo(4.2, 13.2);
  ctx.lineTo(7.2, 19.6);
  ctx.lineTo(10, 18.4);
  ctx.lineTo(7.1, 12.2);
  ctx.lineTo(12.6, 12.2);
  ctx.closePath();
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 3;
  ctx.shadowOffsetY = 1;
  ctx.fillStyle = "#111";
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.restore();
}

function ripple(ctx, x, y, k, color) {
  if (k <= 0 || k >= 1) return;
  ctx.save();
  ctx.globalAlpha = (1 - k) * 0.55;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y, 6 + k * 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

// ---------------------------------------------------------------------------
// Chatbot: alguien escribe una pregunta, el bot "escribe…" y responde.
// Imagen 1280×706. El panel del chat va de x 976 a 1264 y de y 167 a 487.
const CHAT = {
  es: {
    q: "¿Cuánto cuesta el plan familiar?",
    a: "Los planes parten desde $21.692 al mes, con la misma cobertura en Isapre o Fonasa. ¿Te ayudo a cotizar?",
  },
  en: {
    q: "How much is the family plan?",
    a: "Plans start at $21,692 a month, with the same coverage on Isapre or Fonasa. Want a quote?",
  },
};
export const chatLive = {
  period: 13,
  draw(ctx, t, { image, fonts, lang }) {
    const copy = CHAT[lang] || CHAT.es;
    const sans = fonts.sans;
    const out = 1 - ease(seg(t, 12.1, 12.8)); // al final todo vuelve a la captura
    const sentK = easeOut(seg(t, 2.6, 2.95));
    const typingK = easeOut(seg(t, 3.1, 3.35)) * (1 - seg(t, 4.6, 4.7));
    const replyK = easeOut(seg(t, 4.65, 5.0));

    // tamaños de los mensajes nuevos
    ctx.font = `500 11.5px ${sans}`;
    const qW = Math.min(200, ctx.measureText(copy.q).width) + 22;
    ctx.font = `400 11px ${sans}`;
    const aLines = wrap(ctx, copy.a, 165);
    const aH = aLines.length * 15.5 + 20;

    const y0 = 446;
    const qH = 28;
    const userBottom = y0 + qH * sentK;
    const typingBottom = userBottom + (10 + 26) * typingK;
    const replyBottom = userBottom + (10 + aH) * replyK;
    const bottom = Math.max(typingBottom, replyBottom);
    const scroll = Math.max(0, bottom + 14 - 487) * out;

    if (sentK > 0 && out > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(976, 167, 288, 320);
      ctx.clip();
      ctx.fillStyle = "#f9fafc";
      ctx.fillRect(976, 167, 288, 320);
      // la conversación original, desplazada hacia arriba
      ctx.drawImage(image, 976, 167, 288, 320, 976, 167 - scroll, 288, 320);
      ctx.translate(0, -scroll);
      ctx.globalAlpha = out;
      // pregunta del usuario
      ctx.globalAlpha = out * sentK;
      ctx.fillStyle = "#1d61f2";
      rr(ctx, 1250 - qW, y0 + (1 - sentK) * 8, qW, qH, 12);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = `500 11.5px ${sans}`;
      ctx.fillText(copy.q, 1250 - qW + 11, y0 + 18 + (1 - sentK) * 8, qW - 22);
      // avatar del bot (copiado de la captura)
      const by = userBottom + 10;
      const showBot = Math.max(typingK, replyK);
      if (showBot > 0) {
        ctx.globalAlpha = out * showBot;
        ctx.drawImage(image, 988, 207, 28, 28, 988, by, 28, 28);
      }
      // "escribiendo…"
      if (typingK > 0 && replyK === 0) {
        ctx.globalAlpha = out * typingK;
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#e3e7ee";
        rr(ctx, 1021, by, 50, 26, 10);
        ctx.fill();
        ctx.stroke();
        for (let i = 0; i < 3; i++) {
          const b = Math.max(0, Math.sin((t * 7) - i * 0.9));
          ctx.fillStyle = "#9aa3b2";
          ctx.beginPath();
          ctx.arc(1035 + i * 11, by + 13 - b * 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // respuesta
      if (replyK > 0) {
        ctx.globalAlpha = out * replyK;
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#e3e7ee";
        rr(ctx, 1021, by + (1 - replyK) * 8, 189, aH, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#1f2937";
        ctx.font = `400 11px ${sans}`;
        aLines.forEach((l, i) => ctx.fillText(l, 1033, by + (1 - replyK) * 8 + 21 + i * 15.5));
      }
      ctx.restore();
    }

    // escribiendo en el campo de texto
    const typing = seg(t, 0.5, 2.4);
    if (t > 0.45 && t < 2.6) {
      const n = Math.round(copy.q.length * typing);
      ctx.fillStyle = "#ffffff";
      rr(ctx, 990, 503, 224, 26, 12);
      ctx.fill();
      ctx.fillStyle = "#111827";
      ctx.font = `400 12px ${sans}`;
      const txt = copy.q.slice(0, n);
      ctx.fillText(txt, 1000, 520, 205);
      if (Math.floor(t * 2.5) % 2 === 0 || typing < 1) {
        const cx = 1000 + Math.min(205, ctx.measureText(txt).width) + 1;
        ctx.fillRect(cx, 509, 1.2, 14);
      }
    }
    ripple(ctx, 1237, 515, seg(t, 2.5, 3.0), "#1d61f2");
  },
};

// ---------------------------------------------------------------------------
// Embudo: las barras se vacían y vuelven a llenarse; las cifras cuentan.
// Imagen 1050×600.
export const funnelLive = {
  period: 7,
  draw(ctx, t, { fonts }) {
    const down = 1 - ease(seg(t, 0, 0.35));
    const p1 = Math.max(down, easeOut(seg(t, 0.5, 1.7)));
    const p2 = Math.max(down, easeOut(seg(t, 0.75, 1.95)));
    const bars = [
      { x: 72, y: 246, w: 900, h: 13, full: 1, p: p1, color: "#287cd4", track: "#e8f1fa" },
      { x: 73, y: 380, w: 900, h: 12, full: 727 / 900, p: p2, color: "#2a99d1", track: "#f4fbfe" },
    ];
    for (const b of bars) {
      ctx.fillStyle = b.track;
      rr(ctx, b.x - 2, b.y - 2, b.w + 7, b.h + 4, (b.h + 4) / 2);
      ctx.fill();
      const fw = b.w * b.full * b.p;
      if (fw > 1) {
        ctx.fillStyle = b.color;
        rr(ctx, b.x, b.y, Math.max(b.h, fw), b.h, b.h / 2);
        ctx.fill();
      }
    }
    const nums = [
      { v: 278, x: 973, y: 225, box: [905, 196, 72, 33], bg: "#eef5fd", color: "#1d4f7a", p: p1 },
      { v: 225, x: 818, y: 359, box: [750, 329, 72, 34], bg: "#eff7fb", color: "#1b5c6e", p: p2 },
    ];
    ctx.textAlign = "right";
    for (const n of nums) {
      ctx.fillStyle = n.bg;
      ctx.fillRect(...n.box);
      ctx.fillStyle = n.color;
      ctx.font = `700 31px ${fonts.sans}`;
      ctx.fillText(String(Math.round(n.v * n.p)), n.x, n.y);
    }
    ctx.textAlign = "left";
  },
};

// ---------------------------------------------------------------------------
// Design System, estados del file uploader: el archivo sube de 25% a 100%.
// Imagen 778×1280.
export const uploaderLive = {
  period: 6,
  draw(ctx, t, { fonts, lang }) {
    const p = 0.25 + 0.75 * ease(seg(t, 0.4, 3.4));
    const done = p >= 0.999;
    ctx.fillStyle = "#fefefe";
    ctx.fillRect(86, 532, 442, 9);
    ctx.fillStyle = "#e2e3e7";
    rr(ctx, 91, 535, 434, 4, 2);
    ctx.fill();
    ctx.fillStyle = done ? "#1f9d55" : "#235be4";
    rr(ctx, 91, 535, Math.max(4, 434 * p), 4, 2);
    ctx.fill();
    // porcentaje
    ctx.fillStyle = "#fdfdff";
    ctx.fillRect(530, 530, 40, 14);
    ctx.fillStyle = "#4b5060";
    ctx.font = `400 10.5px ${fonts.sans}`;
    ctx.textAlign = "right";
    ctx.fillText(`${Math.round(p * 100)}%`, 558, 541);
    ctx.textAlign = "left";
    // estado
    if (done) {
      ctx.fillStyle = "#fefefe";
      ctx.fillRect(128, 508, 160, 13);
      ctx.fillStyle = "#1f9d55";
      ctx.beginPath();
      ctx.arc(136, 514.5, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(133.6, 514.6);
      ctx.lineTo(135.4, 516.4);
      ctx.lineTo(138.6, 512.8);
      ctx.stroke();
      ctx.fillStyle = "#4b5060";
      ctx.font = `400 10.5px ${fonts.sans}`;
      ctx.fillText(lang === "en" ? "File uploaded" : "Archivo subido", 145, 518.5);
    }
  },
};

// ---------------------------------------------------------------------------
// Planes CSI: un cursor recorre los planes; la tarjeta activa se destaca y
// al final hace clic en "Cotizar plan". Imagen 1280×960.
const CARDS = [
  { x: 143, w: 231, h: 517, btn: 691 },
  { x: 397, w: 231, h: 517, btn: 692 },
  { x: 651, w: 232, h: 517, btn: 692 },
  { x: 906, w: 232, h: 545, btn: 728 },
];
export const plansLive = {
  period: 8,
  draw(ctx, t) {
    // ruta del cursor: entra, pasa por cada tarjeta y hace clic en Plus
    const stops = [
      [640, 900],
      [258, 420],
      [512, 420],
      [766, 420],
      [1021, 420],
      [512, 692],
    ];
    const tt = [0, 0.7, 1.9, 3.1, 4.3, 5.6];
    let i = 0;
    while (i < tt.length - 2 && t > tt[i + 1]) i++;
    const k = ease(seg(t, tt[i] + 0.2, tt[i + 1]));
    const [ax, ay] = stops[i];
    const [bx, by] = stops[i + 1];
    let x = ax + (bx - ax) * k;
    let y = ay + (by - ay) * k;
    // tarjeta activa: la que tiene el cursor encima
    const active = CARDS.findIndex((c) => x > c.x && x < c.x + c.w && y > 247 && y < 247 + c.h);
    const fadeOut = 1 - seg(t, 7.3, 7.9);
    if (active >= 0) {
      const c = CARDS[active];
      ctx.save();
      ctx.globalAlpha = fadeOut;
      ctx.shadowColor = "rgba(29,97,242,0.45)";
      ctx.shadowBlur = 18;
      ctx.strokeStyle = "#2364f4";
      ctx.lineWidth = 3;
      rr(ctx, c.x - 2, 245, c.w + 4, c.h + 4, 16);
      ctx.stroke();
      ctx.restore();
    }
    const press = t > 6.0 && t < 6.35 ? Math.sin(seg(t, 6.0, 6.35) * Math.PI) : 0;
    if (t > 5.9) {
      ctx.save();
      ctx.globalAlpha = 0.18 * press * fadeOut;
      ctx.fillStyle = "#000";
      rr(ctx, 416, 673, 193, 38, 19);
      ctx.fill();
      ctx.restore();
    }
    ripple(ctx, 512, 692, seg(t, 6.05, 6.7), "#ffffff");
    ctx.save();
    ctx.globalAlpha = fadeOut;
    drawCursor(ctx, x, y, 2.6, press);
    ctx.restore();
  },
};

// ---------------------------------------------------------------------------
// Scroll de una página larga, por tramos, como alguien que la va leyendo.
// Devuelve 0 (arriba) → 1 (abajo). `viewports` = cuántas pantallas mide.
export function scrollAt(t, viewports) {
  const range = Math.max(0.0001, viewports - 1);
  const steps = Math.max(1, Math.ceil(range / 0.75));
  const move = 0.95;
  const pause = 0.75;
  const start = 0.5;
  const down = steps * (move + pause);
  const hold = 1.4;
  const up = 1.6;
  const cycle = start + down + hold + up + 0.8;
  const c = t % cycle;
  if (c < start) return 0;
  if (c < start + down) {
    const s = c - start;
    const n = Math.floor(s / (move + pause));
    const f = ease(clamp((s - n * (move + pause)) / move));
    return Math.min(1, (n + f) / steps);
  }
  if (c < start + down + hold) return 1;
  return 1 - ease(clamp((c - start - down - hold) / up));
}
