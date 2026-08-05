import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import MobileGallery from "@/components/MobileGallery";

export const metadata = {
  title: "Beliv: una app completa en un sprint de 3 días — Charly Gourves",
};

const screens = [
  { src: "/images/beliv-onboarding.png", alt: "Onboarding de Beliv", caption: "onboarding" },
  { src: "/images/beliv-home.png", alt: "Home de la app Beliv", caption: "home" },
  { src: "/images/beliv-salud.png", alt: "Sección salud de Beliv", caption: "salud" },
  { src: "/images/beliv-social.png", alt: "Sección social de Beliv", caption: "social" },
  { src: "/images/beliv-score.png", alt: "Beliv Score, indicador de bienestar", caption: "beliv score" },
  { src: "/images/beliv-ranking.png", alt: "Ranking y vida activa en Beliv", caption: "vida activa" },
  { src: "/images/beliv-telesalud.png", alt: "Telesalud 360 dentro de Beliv", caption: "telesalud" },
  { src: "/images/beliv-perfil.png", alt: "Perfil y filtros de contenido de Beliv", caption: "perfil / filtros" },
];

export default function BelivCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 05 · beliv"
        title="Una app de bienestar completa, en un sprint de 3 días"
        tldr="BICE VIDA necesitaba una app de bienestar propia, rápido y con el menor costo posible. Lideré el equipo de diseño en un design sprint de 3 días: de la idea a las pantallas completas de onboarding, home, salud, social, gamificación y telesalud."
        stats={[
          { n: "3", l: "días de sprint" },
          { n: "8+", l: "pantallas de producto diseñadas" },
          { n: "1", l: "equipo de diseño liderado" },
        ]}
      />

      <CaseSection tag="contexto" title="Bienestar, no solo seguros">
        <p>
          BICE VIDA quería ofrecer algo más allá de pólizas: una app propia
          de bienestar donde las personas pudieran cuidar su salud física,
          mental y social en un mismo lugar — Beliv. El desafío no era solo
          de diseño, era de tiempo y presupuesto: había que validar el
          concepto completo sin el costo de un desarrollo largo.
        </p>
      </CaseSection>

      <CaseSection tag="restricción" title="3 días, el menor gasto posible">
        <p>
          La restricción definió el proceso completo: nada de iteraciones
          largas ni research extenso. El objetivo era llegar a pantallas
          suficientemente sólidas como para decidir si el proyecto pasaba a
          desarrollo — un sprint de diseño clásico, comprimido al máximo.
        </p>
      </CaseSection>

      <CaseSection tag="decisiones" title="Un home organizado por hábito, no por menú">
        <p>
          En vez de un home genérico, la app se organiza en las categorías
          que realmente componen el bienestar de una persona: Salud, Vida
          activa, Social y Beneficios — cada una con su propia sección
          completa, no solo un acceso directo.
        </p>
        <p>
          El corazón del producto es el <strong>Beliv Score</strong>: un
          indicador único que combina salud preventiva, reflexión y vida
          activa en un solo número, pensado para dar una sensación de
          progreso constante y motivar el uso diario — el mismo patrón que
          usan apps de hábitos, aplicado a bienestar corporativo.
        </p>
        <MobileGallery images={screens} />
      </CaseSection>

      <CaseSection tag="proceso" title="Reutilizar en vez de inventar">
        <p>
          Con solo 3 días, apoyarme en decisiones ya validadas del Design
          System de BICE VIDA (componentes, tipografía, patrones de tarjeta)
          fue lo que hizo posible cubrir tantas pantallas sin sacrificar
          consistencia. Diseñar el sistema antes es lo que permitió que un
          sprint así fuera viable.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="Diseñar bajo restricción real de negocio">
        <p>
          Sin la presión de tiempo y costo, probablemente hubiéramos
          iterado mucho más el Beliv Score o la estructura del home. La
          restricción obligó a decidir rápido con el criterio disponible —
          una habilidad distinta a la de un proyecto sin límite de tiempo, y
          igual de necesaria en producto real.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
