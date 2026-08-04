# Portfolio — Charly Gourves

Next.js 14 + Tailwind + Framer Motion. Escrito para que lo abras en Cursor,
lo revises y lo publiques en Vercel sin fricción.

## Cómo abrirlo en Cursor 

1. Descomprime esta carpeta.
2. Ábrela en Cursor (`Archivo → Abrir carpeta`).
3. En la terminal integrada de Cursor:
   ```
   npm install
   npm run dev
   ```
4. Abre `http://localhost:3000` — ahí ves el sitio en vivo mientras lo editas.

## Cómo publicarlo (Vercel, gratis)

1. Crea una cuenta en [vercel.com](https://vercel.com) (puedes usar tu cuenta de GitHub).
2. Sube esta carpeta a un repositorio de GitHub (Cursor tiene un botón de
   "Publish to GitHub" integrado, o puedes usar `git init` manualmente).
3. En Vercel: "Add New Project" → conecta el repo → Deploy.
   No hay que configurar nada más, Vercel detecta que es Next.js solo.
4. Cada vez que subas un cambio a GitHub, Vercel lo publica automáticamente.

## Qué está listo

- Home completa: hero, principios, índice de casos, trayectoria, contacto.
- Caso de estudio completo: **Design System de BICE VIDA**
  (`/casos/design-system`), con componente Textfield interactivo real.

## Qué falta (marcado como "en construcción" en el sitio)

- Caso 2: Funnel de contratación CSI — falta el material de las pantallas
  antes/después de reducir de 10 a 8 pasos.
- Caso 3: Renovación IMTT-207 — falta el material de los mockups /
  pantallas del flujo de renovación.

Cuando tengas ese material, dile a Claude "tengo el material del funnel /
IMTT-207" y seguimos construyendo esos casos con el mismo sistema de
componentes (`CaseLayout`, `CaseHeader`, `CaseSection`) que ya está armado
en `/components`.

## Estructura

```
app/
  layout.js          → fuentes + metadata global
  page.js             → home
  globals.css         → tokens de color/tipografía
  casos/
    design-system/page.js
components/
  Nav, Hero, Principles, CaseIndex, Trajectory, Footer
  SystemGraph.jsx      → el gráfico animado de átomo→página (elemento de marca)
  TextfieldDemo.jsx     → componente interactivo del caso Design System
  CaseLayout.jsx        → header + secciones reutilizables para cada caso
```

## Sistema de diseño del sitio (tokens)

- **Colores:** `ink` #0B0E14 (fondo), `signal` #3D5AFE (acento primario),
  `amber` #FFB020 (acento secundario, poco uso), `paper` texto claro,
  `muted` texto secundario. Definidos en `tailwind.config.js`.
- **Tipografía:** Space Grotesk (títulos), Inter (cuerpo), IBM Plex Mono
  (datos, etiquetas, números — el detalle "de sistema" en toda la UI).
- **Movimiento:** Framer Motion para reveals al hacer scroll y para el
  gráfico animado del hero. Nada decorativo — cada animación construye el
  gráfico de átomo→página o revela contenido, no hay efectos sueltos.
