import { pageMetadata } from "@/lib/seo";
import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import HowIWork from "@/components/HowIWork";
import CaseIndex from "@/components/CaseIndex";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export const metadata = pageMetadata({
  title: "Charly Gourves — AI Product Designer · Versión rápida",
  description:
    "AI Product Designer con 8+ años: chatbots con IA, usuarios sintéticos y Design Systems, con casos y métricas reales. Versión rápida del portafolio, sin 3D.",
  path: "/express",
});

export default function Express() {
  return (
    <main className="bg-paper min-h-screen">
      <TopNav />
      <Hero />
      <HowIThink />
      <HowIWork />
      <CaseIndex />
      <About />
      <Trajectory />
      <Resume />
      <Footer />
    </main>
  );
}
