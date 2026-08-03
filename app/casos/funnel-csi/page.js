import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";

export const metadata = {
  title: "Reducir el funnel de contratación CSI — Charly Gourves",
};

export default function FunnelCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 03 · funnel csi"
        title="De 10 a 8 pasos: menos fricción, más contratación"
        tldr="El flujo de contratación del Seguro Complementario de Salud tenía 10 pasos. Con datos reales de abandono y dos leyes de UX como marco de decisión, lo reduje a 8 — eliminando un paso completo y reordenando otro. Un mes después de implementado: -12% en abandono, +2% en contratación."
        stats={[
          { n: "10 → 8", l: "pasos en el flujo de contratación" },
          { n: "-12%", l: "tasa de abandono (primer mes)" },
          { n: "+2%", l: "tasa de contratación (primer mes)" },
        ]}
      />

      <CaseSection tag="contexto" title="Un flujo largo para un producto simple">
        <p>
          Contratar el Seguro Complementario de Salud requería pasar por 10
          pantallas: datos personales, contacto, dirección, cuenta bancaria,
          selección de plan, pago, entre otros. Cada paso adicional es una
          oportunidad más para que alguien abandone antes de contratar.
        </p>
      </CaseSection>

      <CaseSection tag="problema" title="Los datos mostraban dónde se rompía">
        <p>
          Con analítica real del funnel (mayo 2026) se identificó una caída
          crítica en uno de los primeros pasos — antes de que el usuario
          llegara siquiera a ver los planes disponibles. Ahí estaba
          perdiendo a la mayoría de la gente que abandonaba el flujo
          completo.
        </p>
      </CaseSection>

      <CaseSection tag="decisión" title="Dos leyes de UX como marco, no como excusa">
        <p>
          En vez de rediseñar por intuición, usé dos principios como
          criterio de priorización:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">
              Ley de Hick
            </p>
            <p className="text-sm text-muted">
              Más opciones o pasos visibles a la vez aumentan el tiempo y el
              esfuerzo de decisión. Cada paso que no aporta a la decisión de
              contratar es candidato a eliminarse o moverse.
            </p>
          </div>
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">
              Ley de Miller
            </p>
            <p className="text-sm text-muted">
              Las personas retienen un número limitado de piezas de
              información a la vez. Pantallas que pedían datos de contacto y
              datos personales por separado, sin necesidad, se fusionaron en
              una.
            </p>
          </div>
        </div>
        <p>
          Con ese criterio, se eliminó el paso de cuenta bancaria como
          pantalla propia (se movió a un punto posterior, solo si era
          necesario), se fusionaron las pantallas de contacto y datos
          personales, y se reubicó el ingreso de dirección más cerca del
          pago, donde el usuario ya está comprometido con la compra.
        </p>
      </CaseSection>

      <CaseSection tag="impacto" title="Medido un mes después de implementado">
        <p>
          Con el flujo de 8 pasos en producción, la tasa de abandono bajó un
          12% y la tasa de contratación subió un 2% en el primer mes tras el
          lanzamiento — medido comparando el mismo período de embudo antes y
          después del cambio.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="El dato manda, no el orden lógico del negocio">
        <p>
          El orden de los 10 pasos originales tenía sentido desde la lógica
          interna del proceso de contratación, no desde el comportamiento
          real del usuario. Priorizar por dónde ocurre la caída real —no por
          dónde "debería" ocurrir según el proceso— fue lo que hizo que el
          cambio funcionara.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
