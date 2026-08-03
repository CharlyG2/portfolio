import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import TextfieldDemo from "@/components/TextfieldDemo";
import Screenshot from "@/components/Screenshot";

export const metadata = {
  title: "El Design System de BICE VIDA — Charly Gourves",
};

export default function DesignSystemCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 01 · design system"
        title="Construir el primer Design System de BICE VIDA"
        tldr="BICE VIDA nunca había tenido un lenguaje de diseño compartido entre equipos. Propuse la metodología (diseño atómico), definí las reglas de entrada y salida junto al equipo de desarrollo, y hoy el sistema tiene 89 componentes en producción entre app y web."
        stats={[
          { n: "118", l: "componentes diseñados (Figma)" },
          { n: "89", l: "componentes en producción (Storybook)" },
          { n: "22", l: "fundamentos definidos (tokens, tipografía, grillas)" },
        ]}
      />

      <CaseSection tag="contexto" title="Un producto vivo sin idioma común">
        <p>
          BICE VIDA construye y mantiene varios productos digitales en
          paralelo — Seguro Complementario de Salud, seguro de viaje, entre
          otros — con equipos de diseño y desarrollo trabajando en células
          separadas. Antes del Design System, cada equipo resolvía sus
          propios componentes: botones, inputs y cards se veían y se
          comportaban distinto según qué producto estuvieras usando.
        </p>
        <p>
          El costo no era solo estético. Cada vez que un componente debía
          escalar de un producto a otro, alguien lo rehacía desde cero — sin
          reglas de estados, sin acuerdo sobre accesibilidad, sin
          documentación para desarrollo.
        </p>
      </CaseSection>

      <CaseSection tag="problema" title="Diseño y desarrollo hablando distinto">
        <p>
          No existía un acuerdo formal entre diseño y desarrollo sobre qué
          hace que un componente esté "listo" para pasar a producción, ni
          sobre cuándo un componente merece entrar al sistema versus quedarse
          como una solución puntual. Eso generaba fricción en el handoff y
          duplicación de esfuerzo en ambos lados.
        </p>
      </CaseSection>

      <CaseSection tag="propuesta" title="Metodología atómica, propuesta y liderada de punta a punta">
        <p>
          Propuse trabajar bajo diseño atómico — átomos, moléculas,
          organismos, plantillas y páginas — como estructura para escalar
          componentes sin perder consistencia. La propuesta incluyó también
          el modelo de trabajo con el equipo de desarrollo: qué se necesita
          para que un componente entre a discovery, y qué se necesita para
          que salga a producción (delivery).
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">
              DoR — listo para empezar
            </p>
            <ul className="text-sm space-y-2 text-muted">
              <li>Se usa en más de un producto</li>
              <li>Es escalable y fácil de mantener</li>
              <li>Tiene comportamiento responsive</li>
              <li>Fue testeado antes de implementarse</li>
            </ul>
          </div>
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">
              DoD — listo para producción
            </p>
            <ul className="text-sm space-y-2 text-muted">
              <li>Tipografía y color con accesibilidad AA/AAA</li>
              <li>Espaciados, anatomía y casos de uso definidos</li>
              <li>Creado como componente principal en Figma</li>
              <li>Revisado por UX/UI antes de entrar a la librería</li>
            </ul>
          </div>
        </div>
      </CaseSection>

      <CaseSection tag="evidencia" title="El Textfield como ejemplo de profundidad">
        <p>
          En vez de documentar componentes de forma superficial, cada uno
          define anatomía, zona segura, tamaños mínimos y máximos,
          comportamiento por estado y casos de qué no hacer. El Textfield es
          el ejemplo más completo: cinco estados documentados, comportamiento
          en mobile y desktop, y reglas explícitas de qué no modificar sobre
          el componente base.
        </p>
        <TextfieldDemo />
        <p className="text-xs text-mutedLight">
          Prueba los estados — este componente reproduce las reglas reales
          definidas en la documentación del sistema.
        </p>
      </CaseSection>

      <CaseSection tag="en producto" title="El mismo sistema, dos productos distintos">
        <p>
          La prueba de que un Design System funciona no es la librería de
          Figma — es que dos productos con lógicas de negocio distintas
          (salud y viaje) puedan compartir botones, cards y tipografía sin
          que un usuario note la diferencia entre equipos.
        </p>
        <Screenshot
          src="/images/csi-landing.png"
          alt="Landing del Seguro Complementario de Salud con comparador de 4 planes"
          caption="Landing CSI — comparador de planes construido con los componentes del sistema"
          width={1200}
          height={2400}
        />
        <Screenshot
          src="/images/viaje-landing-unificada.png"
          alt="Landing de seguro de viaje unificando Viajero Protegido y Viajero Frecuente"
          caption="Landing de seguro de viaje — mismos átomos, producto y lógica de negocio distintos"
          width={900}
          height={2200}
        />
      </CaseSection>

      <CaseSection tag="adopción" title="De la librería a producción real">
        <p>
          El sistema se mide por separado en app y web, porque cada
          plataforma avanza a su propio ritmo de adopción:
        </p>
        <div className="grid sm:grid-cols-2 gap-4 not-prose">
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">app</p>
            <p className="text-sm text-muted">
              8 fundamentos · 46 componentes diseñados · 31 en producción
              (Storybook)
            </p>
          </div>
          <div className="rounded-xl border border-line p-5">
            <p className="font-mono text-xs text-signalSoft mb-3">web</p>
            <p className="text-sm text-muted">
              14 fundamentos · 72 componentes diseñados · 58 en producción
              (Storybook)
            </p>
          </div>
        </div>
        <p>
          La brecha entre lo diseñado y lo que ya está en producción no es un
          problema — es la señal de que el pipeline sigue activo: el sistema
          se sigue deployando, no se hizo una vez y se abandonó.
        </p>
      </CaseSection>

      <CaseSection tag="aprendizajes" title="Lo que cambiaría si empezara de nuevo">
        <p>
          Definir el DoR/DoD junto al equipo de desarrollo desde el principio
          —y no después de tener componentes ya construidos— hubiera evitado
          retrabajo temprano. También aprendí que la adopción real no se mide
          por cuántos componentes existen en Figma, sino por cuántos llegan a
          Storybook y se usan en producto: por eso separamos ambas métricas
          en vez de mostrar un solo número inflado.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
