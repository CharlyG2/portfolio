import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import Screenshot from "@/components/Screenshot";

export const metadata = {
  title: "Roma IA: un asistente que ayuda a elegir mejor — Charly Gourves",
};

const funnel = [
  { stage: "Contacto inicial", n: 278, pct: 100 },
  { stage: "Calificación", n: 225, pct: 80.9 },
  { stage: "Interés en planes", n: 193, pct: 69.4 },
];

export default function RomaIACase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 05 · roma ia"
        title="Roma IA: un asistente virtual que ayuda a decidir según el producto"
        tldr="Implementé Roma IA, un chatbot que acompaña al usuario dentro de cada producto de BICE VIDA para que tome una mejor decisión. Lo alimentamos con la base de datos de los productos, los dolores de los usuarios y las preguntas frecuentes del call center."
        stats={[
          { n: "611", l: "conversaciones en un mes (sep 2026)" },
          { n: "100%", l: "atendidas por el bot, sin derivar a ejecutivo" },
          { n: "69%", l: "de los contactos llegó a interés en planes" },
        ]}
        meta="Rol: Product Designer · implementación del asistente · Producto: Seguro Complementario de Salud, BICE VIDA"
      />

      <CaseSection tag="contexto" title="Las mismas dudas, una y otra vez">
        <p>
          Elegir un seguro genera muchas preguntas: qué cubre, cuánto
          cuesta, en qué se diferencia un plan de otro. Esas dudas llegaban
          al call center, y muchas eran siempre las mismas. Mientras tanto,
          la persona que estaba en la landing sin respuesta se iba.
        </p>
      </CaseSection>

      <CaseSection tag="propuesta" title="Un asistente que sabe en qué producto estás">
        <p>
          Roma IA no es un chat genérico. Sabe en qué producto se encuentra
          el usuario y responde con ese contexto. Para eso lo alimentamos con
          tres fuentes:
        </p>
        <div className="grid sm:grid-cols-3 gap-4 not-prose">
          {[
            { t: "productos", d: "La base de datos de cada producto: planes, coberturas y precios." },
            { t: "dolores", d: "Los dolores reales de los usuarios, para responder a lo que de verdad les preocupa." },
            { t: "call center", d: "Las preguntas frecuentes que ya resolvía el equipo de atención." },
          ].map((s) => (
            <div key={s.t} className="rounded-xl border border-line p-5">
              <p className="font-mono text-xs text-signalSoft mb-3">{s.t}</p>
              <p className="text-sm text-muted">{s.d}</p>
            </div>
          ))}
        </div>
        <p>
          En la landing del Seguro Complementario de Salud, el asistente se
          presenta y ofrece cuatro caminos claros: conocer y comparar planes,
          saber cuánto cuesta y cómo se paga, entender qué cubre el seguro e
          iniciar la contratación.
        </p>
        <Screenshot
          src="/images/roma/roma-chat.jpg"
          alt="Landing del Seguro Complementario de Salud con el asistente virtual abierto"
          caption="El asistente dentro de la landing CSI — ayuda a comparar, cotizar y contratar"
          width={1600}
          height={883}
        />
      </CaseSection>

      <CaseSection tag="medición" title="Saber qué pasa en cada conversación">
        <p>
          Un chatbot sin datos es una caja negra. Por eso cada conversación
          se mide: cuántas hubo, cuántos mensajes, cuántas resolvió el bot
          solo y hasta dónde llegó cada persona en el embudo de venta.
        </p>
        <Screenshot
          src="/images/roma/roma-analiticas.jpg"
          alt="Panel de analíticas con conversaciones, mensajes y atención por bot versus ejecutivo"
          caption="Panel de analíticas — septiembre 2026"
          width={1600}
          height={917}
        />
        <div className="not-prose rounded-xl border border-line p-5 space-y-4">
          <p className="font-mono text-xs text-signalSoft">
            embudo de ventas · septiembre 2026
          </p>
          {funnel.map((f) => (
            <div key={f.stage}>
              <div className="flex justify-between text-sm">
                <span className="text-ink">{f.stage}</span>
                <span className="text-muted">
                  {f.n}
                  {f.pct < 100 && <span className="text-mutedLight"> · {f.pct}%</span>}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 rounded-full bg-paperSoft overflow-hidden">
                <div className="h-full rounded-full bg-signal" style={{ width: `${f.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        <Screenshot
          src="/images/roma/roma-embudo.jpg"
          alt="Embudo de ventas y gráfico de conversaciones y mensajes por día"
          caption="Embudo de ventas y conversaciones por día"
          width={1600}
          height={913}
        />
      </CaseSection>

      <CaseSection tag="aprendizajes" title="La IA es tan buena como lo que le das">
        <p>
          La calidad de las respuestas no dependió del modelo, sino de con
          qué lo alimentamos. Los dolores de los usuarios y las preguntas del
          call center fueron lo que hizo que el asistente respondiera como
          alguien que conoce el producto, y no como un buscador.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
