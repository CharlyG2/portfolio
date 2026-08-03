import CaseLayout, { CaseHeader, CaseSection } from "@/components/CaseLayout";
import Screenshot from "@/components/Screenshot";

export const metadata = {
  title: "Unificar dos seguros de viaje en una sola landing — Charly Gourves",
};

export default function ViajesCase() {
  return (
    <CaseLayout>
      <CaseHeader
        eyebrow="caso 02 · landing viajes"
        title="Unificar dos seguros de viaje en una sola experiencia"
        tldr="BICE VIDA vendía Viajero Protegido (cobertura por viaje puntual) y Viajero Frecuente (cobertura anual) como productos separados. Rediseñé la landing para que el usuario compare ambos lado a lado desde una sola cotización, en vez de tener que saber de antemano cuál producto buscar."
        stats={[
          { n: "2", l: "productos unificados en una sola landing" },
          { n: "1", l: "cotizador compartido para ambos" },
        ]}
      />

      <CaseSection tag="contexto" title="Dos productos, una misma necesidad">
        <p>
          Viajero Protegido cubre un viaje puntual con fechas exactas.
          Viajero Frecuente cubre todo el año, sin importar cuántas veces
          viajes. Son mecánicas de cobertura distintas, pero desde la mirada
          del usuario resuelven la misma pregunta: "¿cómo aseguro mi
          próximo viaje?"
        </p>
      </CaseSection>

      <CaseSection tag="problema" title="Obligar a elegir antes de entender">
        <p>
          Tener los dos productos en landings separadas exige que el usuario
          ya sepa cuál necesita antes de cotizar — una decisión que en
          realidad depende de cuánto viaja al año, algo que muchas personas
          no tienen claro de entrada.
        </p>
      </CaseSection>

      <CaseSection tag="decisión" title="Comparar antes de elegir">
        <p>
          La landing rediseñada cotiza ambos productos en paralelo y los
          muestra lado a lado con la misma estructura de tarjeta, para que la
          diferencia entre "para un viaje" y "para todo el año" se entienda
          por comparación directa, no por descripción.
        </p>
        <Screenshot
          src="/images/viaje-landing-unificada.png"
          alt="Landing unificada de seguro de viaje mostrando Viajero Protegido y Viajero Frecuente lado a lado"
          caption="Landing unificada — cotizador único, comparación directa entre ambos productos"
          width={900}
          height={2200}
        />
      </CaseSection>

      <CaseSection tag="detalle" title="El comparador de planes">
        <p>
          Una vez que el usuario cotiza, entra al comparador con filtros por
          precio, compañía de asistencia y montos de cobertura — reutilizando
          los mismos componentes de card y filtro del Design System.
        </p>
        <Screenshot
          src="/images/viaje-comparador.jpg"
          alt="Comparador de planes de seguro de viaje con filtros por precio y cobertura"
          caption="Comparador de planes — filtros y cards del sistema aplicados al flujo de viaje"
        />
      </CaseSection>

      <CaseSection tag="pendiente" title="Lo que falta para cerrar este caso">
        <p className="text-mutedLight">
          Esta sección queda abierta a propósito: para completar el caso con
          el nivel de detalle del brief (restricciones, iteraciones
          descartadas, validación con usuarios, métrica de impacto) falta
          confirmar contigo el proceso previo a este resultado — qué
          alternativas se probaron antes de llegar a esta versión y si hay
          algún dato de conversión o feedback de usuario que podamos citar.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
