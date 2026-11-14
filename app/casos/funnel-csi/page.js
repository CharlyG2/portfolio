import { pageMetadata } from "@/lib/seo";
import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import FunnelDiagram from "@/components/FunnelDiagram";
import WireframeFlow from "@/components/WireframeFlow";

export const metadata = pageMetadata({
  title: "Reducir el funnel de contratación CSI — Charly Gourves",
  description:
    "De 10 a 8 pasos en el funnel de contratación de un seguro de salud: analítica, entrevistas y un programa de usuarios sintéticos con IA para comparar variantes antes de construirlas. −12% de abandono.",
  path: "/casos/funnel-csi",
  image: "/images/museo/csi-landing.jpg",
});

const SYNTH_STEPS = [
  {
    n: "01",
    t: "10 perfiles a partir de datos reales",
    d: "Armé 10 usuarios sintéticos a partir de los arquetipos de cada producto y de los rangos de edad que ya conocíamos por GA4, Pendo y las entrevistas: qué buscan, qué les preocupa al contratar y qué tan cómodos se sienten con trámites digitales.",
  },
  {
    n: "02",
    t: "Recorrer el flujo paso a paso",
    d: "El programa le muestra a cada perfil, con un modelo de lenguaje, el contenido de cada pantalla en orden. En cada paso el usuario sintético dice si sigue o abandona, qué duda le aparece y qué dato no entiende por qué se lo piden.",
  },
  {
    n: "03",
    t: "Comparar variantes lado a lado",
    d: "Corrí el mismo grupo de perfiles por el flujo original de 10 pasos y por las variantes de 8 pasos. El resultado es una tabla por paso y por segmento: dónde se acumula la fricción y qué cambia entre una versión y otra.",
  },
  {
    n: "04",
    t: "Llevar lo dudoso a personas reales",
    d: "Los usuarios sintéticos no reemplazan a los reales. Sirven para descartar rápido las ideas débiles y llegar a las entrevistas y al test con las dos o tres preguntas que de verdad importan.",
  },
];

const SYNTH_COMPARE = [
  { k: "Dónde aparece la primera duda fuerte", a: "Paso 4: datos bancarios antes de ver los planes", b: "Recién en el pago, cuando ya eligió plan" },
  { k: "Datos que piden sin explicar por qué", a: "Contacto y datos personales en pantallas separadas", b: "Una sola pantalla con el motivo de cada dato" },
  { k: "Segmento más afectado", a: "Personas con poca costumbre de contratar en línea", b: "La fricción baja en todos los segmentos" },
  { k: "Qué se llevó a entrevistas", a: "¿Confías en dar tu cuenta bancaria tan temprano?", b: "¿Se entiende el plan antes de pagar?" },
];

export default function FunnelCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 03 · funnel csi"
        title="De 10 a 8 pasos: menos fricción, más contratación"
        tldr="El flujo de contratación del Seguro Complementario de Salud tenía 10 pasos. Con analítica de abandono, entrevistas a unas 15 personas, un programa propio de usuarios sintéticos con IA para comparar variantes y dos leyes de UX como marco de decisión, lo reduje a 8 — eliminando un paso completo y reordenando otro. Un mes después de implementado: -12% en abandono, +2% en contratación."
        stats={[
          { n: "10 → 8", l: "pasos en el flujo de contratación" },
          { n: "~15", l: "personas entrevistadas" },
          { n: "10", l: "usuarios sintéticos con IA para comparar variantes" },
          { n: "-12%", l: "tasa de abandono (primer mes)" },
          { n: "+2%", l: "contratación (relativo, primer mes)" },
        ]}
        meta="Rol: Product Designer, de discovery a implementación · Equipo: desarrolladores, PO, agilistas, leads y stakeholders de negocio · Herramientas: GA4, Pendo, Hotjar, Figma, y Claude + Cursor para el programa de usuarios sintéticos"
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
          Con analítica real del funnel (mayo 2026) se vio un patrón claro:
          la conversión era baja aunque entraba gente al flujo, y casi nadie
          pasaba del paso 4. La causa era que el flujo pedía demasiada
          información al inicio, antes de que la persona llegara siquiera a
          ver los planes disponibles.
        </p>
      </CaseSection>

      <CaseSection tag="research" title="Datos para ver dónde, entrevistas para entender por qué">
        <p>
          La analítica decía en qué paso se caía la gente, pero no por qué.
          Para eso combiné dos tipos de datos:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalInk mb-3">
              Cuantitativo · GA4, Pendo y Hotjar
            </p>
            <p className="text-sm text-muted">
              Embudo por paso, mapas de calor y grabaciones de sesión para
              ver dónde había más abandono y más fricción dentro de cada
              pantalla.
            </p>
          </div>
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalInk mb-3">
              Cualitativo · ~15 entrevistas
            </p>
            <p className="text-sm text-muted">
              Entrevistas con usuarios para verificar cuánta confianza les
              daba cada paso y cuáles sentían necesarios. Con eso decidimos
              qué mantener, qué fusionar y qué quitar.
            </p>
          </div>
        </div>
        <p>
          Antes de diseñar, también hicimos sesiones con los stakeholders de
          negocio: ellos son el punto de partida de qué se puede cambiar en
          un proceso de contratación de seguros y qué no.
        </p>
      </CaseSection>

      <CaseSection tag="ia · usuarios sintéticos" title="Un programa para probar el flujo antes de construirlo">
        <p>
          Entrevistar es lento y cada variante del flujo cuesta un sprint de
          desarrollo. Para no apostar a ciegas, construí con Claude y Cursor un
          programa que genera <strong className="text-ink font-medium">usuarios sintéticos</strong> con
          IA y los hace recorrer el funnel, para comparar el flujo original
          con las versiones más cortas antes de diseñarlas en alta.
        </p>
        <ol className="not-prose grid sm:grid-cols-2 gap-4">
          {SYNTH_STEPS.map((s) => (
            <li key={s.n} className="rounded-xl border border-line bg-surface p-5">
              <p className="font-mono text-xs text-rust">{s.n}</p>
              <p className="font-display text-base text-ink mt-2">{s.t}</p>
              <p className="text-sm text-muted mt-2 leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="not-prose overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[520px] text-sm text-left">
            <thead className="bg-paperSoft font-mono text-xs text-ink">
              <tr>
                <th className="p-3 font-medium">Comparativa</th>
                <th className="p-3 font-medium">Flujo original · 10 pasos</th>
                <th className="p-3 font-medium">Propuesta · 8 pasos</th>
              </tr>
            </thead>
            <tbody>
              {SYNTH_COMPARE.map((r) => (
                <tr key={r.k} className="border-t border-line align-top">
                  <td className="p-3 text-ink font-medium">{r.k}</td>
                  <td className="p-3 text-muted">{r.a}</td>
                  <td className="p-3 text-muted">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Lo que dijeron los usuarios sintéticos coincidió con lo que ya
          mostraba la analítica (casi nadie pasaba del paso 4) y agregó el
          porqué de cada abandono. Eso nos permitió descartar variantes en
          horas, no en semanas, y llegar a las entrevistas con hipótesis
          concretas. La decisión final se tomó con personas reales y con los
          datos del funnel en producción.
        </p>
      </CaseSection>

      <CaseSection tag="decisión" title="Dos leyes de UX como marco, no como excusa">
        <p>
          En vez de rediseñar por intuición, usé dos principios como
          criterio de priorización:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalInk mb-3">
              Ley de Hick
            </p>
            <p className="text-sm text-muted">
              Más opciones o pasos visibles a la vez aumentan el tiempo y el
              esfuerzo de decisión. Cada paso que no aporta a la decisión de
              contratar es candidato a eliminarse o moverse.
            </p>
          </div>
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalInk mb-3">
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
        <FunnelDiagram />
        <p>
          Con el flujo definido, bajé cada paso a wireframes para revisar la
          estructura con el PO y desarrollo antes de pasar a alta fidelidad
          con los componentes del Design System.
        </p>
        <WireframeFlow />
        <p>
          Los hallazgos de las entrevistas y las decisiones de diseño
          quedaron documentados en Confluence y registrados en Airtable,
          para que cualquier célula pudiera entender por qué el flujo
          quedó así.
        </p>
      </CaseSection>

      <CaseSection tag="impacto" title="Medido un mes después de implementado">
        <p>
          Con el flujo de 8 pasos en producción, la tasa de abandono bajó un
          12% y la tasa de contratación subió un 2% sobre la que había, en el
          primer mes tras el
          lanzamiento — medido comparando el mismo período de embudo antes y
          después del cambio.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="Priorizar por dónde ocurre la caída real">
        <p>
          El orden de los 10 pasos originales tenía sentido desde la lógica
          interna del proceso de contratación. Mirar la analítica real del
          funnel —y no solo la lógica del proceso— fue lo que permitió
          encontrar dónde valía la pena simplificar primero.
        </p>
        <p>
          Los usuarios sintéticos fueron un acelerador, no un oráculo: son
          muy buenos para encontrar fricción obvia y comparar variantes
          rápido, y débiles para predecir emociones o confianza. Por eso
          siempre terminan en una conversación con una persona real.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
