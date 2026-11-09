import TopNav from "@/components/TopNav";
import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import HowIWork from "@/components/HowIWork";
import CaseIndex from "@/components/CaseIndex";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Charly Gourves — Product Designer · Versión rápida",
};

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
