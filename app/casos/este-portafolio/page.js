import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import HowIBuiltThis from "@/components/HowIBuiltThis";

export const metadata = {
  title: "Este portafolio: proceso y sistema — Charly Gourves",
};

export default function PortfolioCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 06 · este portafolio"
        title="Este mismo portafolio, como caso de estudio"
        tldr="Dirigí cada decisión de diseño — paleta, tipografía, estructura, copy, interacciones — e iteré con Claude para la implementación del código, usando Cursor para correrlo localmente y GitHub Desktop + Vercel para publicarlo."
        stats={[
          { n: "5", l: "secciones rediseñadas por feedback real" },
          { n: "3", l: "herramientas en el flujo: Claude, Cursor, GitHub Desktop" },
          { n: "1", l: "sistema de diseño propio, con tokens y componentes reutilizables" },
        ]}
      />

      <CaseSection tag="contexto" title="Tenía el CV en PDF, pero eso no demuestra nada">
        <p>
          Un PDF no muestra cómo pienso ni cómo reacciono cuando algo no
          funciona. Decidí construir el portafolio dirigiendo yo cada
          decisión de diseño, usando IA para la implementación — un flujo
          que de paso dice algo real sobre cómo trabajo hoy.
        </p>
      </CaseSection>

      <CaseSection tag="proceso" title="Iterar de verdad, no aceptar la primera versión">
        <p>
          El hero pasó por más de ocho versiones distintas antes de llegar a
          la actual: probamos texto a dos columnas, collage de capturas
          superpuestas, fondo oscuro con blobs de color, hasta llegar a la
          versión final — nombre gigante con tratamiento tipográfico mixto
          (relleno y contorno), profundidad real con paralaje entre planos,
          y microinteracción al pasar el cursor.
        </p>
        <p>
          Varias direcciones se descartaron por completo cuando dejaron de
          funcionar — incluyendo un momento donde prioricé efectos por
          sobre claridad y tuve que revertir a una versión más simple antes
          de seguir. Ese tipo de decisión también es parte del criterio de
          producto: saber cuándo un camino no está funcionando y cortar a
          tiempo.
        </p>
      </CaseSection>

      <CaseSection tag="cómo lo hice" title="Honestamente, no sabía programar cuando empecé esto">
        <p>
          Lo que sí sabía era exactamente qué quería que se sintiera —
          así que en vez de aprender React desde cero, dirigí cada
          decisión y dejé que Claude escribiera el código. Cualquiera
          podría hacer esto mismo, así fue paso a paso:
        </p>
        <HowIBuiltThis />
      </CaseSection>

      <CaseSection tag="sistema" title="Un Design System chico, pero real">
        <p>
          El sitio tiene su propio sistema de tokens: una paleta de color
          por caso de estudio (cada proyecto tiene su identidad visual
          propia), una jerarquía tipográfica de cuatro familias con roles
          claros (Anton para impacto, Space Grotesk para títulos, Inter
          para cuerpo, IBM Plex Mono para datos), y componentes reutilizables
          para cada caso — el mismo principio que documenté en el caso del
          Design System de BICE VIDA, aplicado acá a mi propio proyecto.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="Dirigir bien también es una habilidad de producto">
        <p>
          Construir este sitio confirmó algo que ya sabía por experiencia
          en BICE VIDA: la calidad de un producto no depende de quién
          escribe cada línea de código, depende de quién toma las
          decisiones correctas y sabe cuándo pedir un cambio. Ese fue mi
          trabajo acá — y es, en el fondo, el mismo trabajo que hago todos
          los días como Product Designer.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
