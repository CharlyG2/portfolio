import MagneticLink from "./MagneticLink";
import Reveal, { RevealGroup } from "./Reveal";
import { PROFILE } from "@/lib/profile";

const LINK =
  "inline-flex items-center gap-2 rounded-full px-5 py-3 transition-[color,background-color,border-color,box-shadow] duration-base";

export default function Footer() {
  return (
    <footer id="contacto" className="py-24 md:py-32 bg-ink text-paper">
      <div className="max-w-content mx-auto px-6 md:px-10">
        <RevealGroup>
        <Reveal as="p" className="eyebrow text-[#E08A74] mb-5">contacto</Reveal>
        <Reveal as="p" className="font-display text-3xl md:text-5xl max-w-2xl leading-tight">
          Busco mi próximo equipo de producto.
        </Reveal>
        <Reveal as="p" className="mt-5 text-base md:text-lg text-paper/75 max-w-xl leading-relaxed">
          Estoy disponible para roles de AI Product Designer, Product Designer y Design Systems
          en Santiago, en modalidad híbrida o la que use tu equipo.
          Escríbeme y conversemos.
        </Reveal>
        <Reveal className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
          <MagneticLink
            href={`mailto:${PROFILE.email}`}
            className={`${LINK} group bg-[#5FE3D0] text-ink font-medium hover:bg-[#8FE9DA] hover:shadow-[0_10px_30px_-10px_rgba(95,227,208,0.55)]`}
          >
            {PROFILE.email}{" "}
            <span aria-hidden="true" className="inline-block transition-transform duration-base group-hover:translate-x-1">
              →
            </span>
          </MagneticLink>
          <MagneticLink
            href={PROFILE.linkedin}
            target="_blank"
            className={`${LINK} border border-paper/25 text-paper hover:border-paper hover:bg-paper/10`}
          >
            linkedin.com/in/charlygourves
          </MagneticLink>
          <MagneticLink
            href="https://behance.net/elnido"
            target="_blank"
            className={`${LINK} border border-paper/25 text-paper hover:border-paper hover:bg-paper/10`}
          >
            behance.net/elnido
          </MagneticLink>
        </Reveal>
        </RevealGroup>
        <div className="mt-16 pt-6 border-t border-paper/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-paper/60">
          <p>Santiago, Chile — {new Date().getFullYear()}</p>
          <a
            href="/files/charly-gourves-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper underline underline-offset-4"
          >
            Descargar CV (PDF)
          </a>
        </div>
      </div>
    </footer>
  );
}
