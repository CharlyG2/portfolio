import { pageMetadata } from "@/lib/seo";
import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import FunnelDiagram from "@/components/FunnelDiagram";
import WireframeFlow from "@/components/WireframeFlow";

export const metadata = pageMetadata({
  title: "Reducir el funnel de contratación CSI — Charly Gourves",
  description:
    "De 10 a 8 pasos en el funnel de contratación de un seguro de salud: analítica, entrevistas y un generador propio de usuarios sintéticos hecho con Claude y Cursor. −12% de abandono.",
  path: "/casos/funnel-csi",
  image: "/images/museo/csi-landing.jpg",
});

// Cómo funciona el generador: de los arquetipos del producto a usuarios
// sintéticos, y de ahí a entrevistas moderadas con personas reales.
const SYNTH_FLOW = [
  {
    n: "01",
    t: "Arquetipos del producto",
    d: "Los perfiles de usuario que ya tiene el producto, con sus rangos de edad.",
  },
  {
    n: "02",
    t: "Generador propio",
    d: "Un programa que hice con Claude y Cursor: convierte cada arquetipo en usuarios sintéticos distintos.",
    tool: "Claude + Cursor",
  },
  {
    n: "03",
    t: "10 usuarios sintéticos",
    d: "Personas que ven el producto por primera vez, para comparar variantes rápido.",
    users: true,
  },
  {
    n: "04",
    t: "Entrevistas moderadas",
    d: "Personas reales que confirman o corrigen lo que encontré.",
  },
];

// colores por arquetipo en la mini grilla de usuarios (3 arquetipos)
const ARCHETYPE_TONES = ["bg-mint", "bg-signal", "bg-amber"];
const USER_ARCHETYPES = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2];

function SynthFlow() {
  return (
    <div className="not-prose rounded-2xl border border-line bg-paperSoft p-3 sm:p-5">
      <ol className="space-y-2">
        {SYNTH_FLOW.map((s, i) => {
          const dark = Boolean(s.tool);
          return (
            <li key={s.n} className="relative">
              {/* conector entre pasos */}
              {i < SYNTH_FLOW.length - 1 && (
                <span aria-hidden="true" className="absolute left-[38px] sm:left-[42px] top-full h-2 w-px bg-mutedLight/50" />
              )}
              <div
                className={`grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 rounded-xl p-4 sm:px-5 ${
                  dark ? "bg-ink" : "border border-line bg-surface"
                }`}
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs ${
                    dark ? "bg-[#5FE3D0] text-ink" : "border border-line bg-paper text-rust"
                  }`}
                >
                  {s.n}
                </span>
                <div>
                  <p className={`font-display text-base ${dark ? "text-paper" : "text-ink"}`}>{s.t}</p>
                  <p className={`text-sm mt-1 leading-relaxed ${dark ? "text-[#D9D0C1]" : "text-muted"}`}>{s.d}</p>
                </div>
                {s.tool && (
                  <p className="col-start-2 sm:col-start-3 justify-self-start rounded-full border border-[#5FE3D0]/50 px-3 py-1 font-mono text-[11px] text-[#5FE3D0] whitespace-nowrap">
                    {s.tool}
                  </p>
                )}
                {s.users && (
                  <div className="col-start-2 sm:col-start-3 justify-self-start w-max grid grid-cols-5 gap-1.5" aria-hidden="true">
                    {USER_ARCHETYPES.map((a, k) => (
                      <span key={k} className={`h-4 w-4 rounded-full ${ARCHETYPE_TONES[a]}`} />
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 px-1 font-mono text-[11px] leading-relaxed text-mutedLight">
        Cada color es un arquetipo: el generador arma varios usuarios distintos por cada uno.
      </p>
    </div>
  );
}

export default function FunnelCase() {
  return (
    <CaseLayout slug="funnel-csi">
      <CaseHeader
        eyebrow="caso 03 · funnel csi"
        title="De 10 a 8 pasos: menos fricción, más contratación"
        tldr="El flujo de contratación del Seguro Complementario de Salud (CSI) tenía 10 pasos. Con analítica de abandono, entrevistas a unas 15 personas, un generador propio de usuarios sintéticos (hecho con Claude y Cursor) para comparar variantes y dos leyes de UX como marco de decisión, lo reduje a 8: eliminé un paso, fusioné dos pantallas y reubiqué otra. Un mes después de implementado: −12% de abandono y +2% de contratación."
        stats={[
          { n: "10 → 8", l: "pasos en el flujo de contratación" },
          { n: "~15", l: "personas entrevistadas" },
          { n: "10", l: "usuarios sintéticos con IA para comparar variantes" },
          { n: "−12%", l: "tasa de abandono (primer mes)" },
          { n: "+2%", l: "contratación (relativo, primer mes)" },
        ]}
        meta="Rol: Product Designer, de discovery a implementación · Equipo: desarrolladores, PO, agilistas, leads y stakeholders de negocio · Herramientas: GA4, Pendo, Hotjar, Figma, y Claude + Cursor para el generador de usuarios sintéticos"
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

      <CaseSection tag="ia · usuarios sintéticos" title="Un generador de usuarios sintéticos hecho por mí">
        <p>
          Entrevistar toma tiempo, y conseguir personas que no conozcan el
          producto toma todavía más. Para tener una primera lectura rápida,
          creé con Claude y Cursor un programa que genera{" "}
          <strong className="text-ink font-medium">usuarios sintéticos</strong> a
          partir de los arquetipos de usuario del producto y sus rangos de
          edad. Por eso puedo armar usuarios distintos para cada producto, en
          vez de usar siempre los mismos.
        </p>
        <SynthFlow />
        <p>
          Para este funnel generé 10 usuarios sintéticos y con ellos comparé
          el flujo original con las versiones más cortas, como si fueran
          personas que ven el producto por primera vez. Así descarté rápido
          las ideas débiles antes de diseñarlas en alta fidelidad.
        </p>
        <p>
          Hoy lo complemento con entrevistas moderadas: los usuarios
          sintéticos me ayudan a llegar con mejores preguntas, y las personas
          reales confirman o corrigen lo que encontré.
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
          12% y la tasa de contratación subió 2% (relativo) en el primer mes
          tras el lanzamiento. Lo medimos comparando el mismo período del
          embudo antes y después del cambio.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="Priorizar por dónde ocurre la caída real">
        <p>
          El orden de los 10 pasos originales tenía sentido desde la lógica
          interna del proceso de contratación. Mirar la analítica real del
          funnel, y no solo la lógica del proceso, fue lo que permitió
          encontrar dónde valía la pena simplificar primero.
        </p>
        <p>
          Los usuarios sintéticos fueron un acelerador, no un oráculo: son
          muy buenos para encontrar fricción obvia y comparar variantes
          rápido, y débiles para predecir emociones o confianza. Por eso hoy
          los complemento con entrevistas moderadas a personas reales.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
