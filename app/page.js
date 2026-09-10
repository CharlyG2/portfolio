import LeftNav from "@/components/LeftNav";
import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import CaseIndex from "@/components/CaseIndex";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen md:pl-[88px] pt-[52px] md:pt-0">
      <LeftNav />
      <Hero />
      <HowIThink />
      <CaseIndex />
      <About />
      <Trajectory />
      <Resume />
      <Footer />
    </main>
  );
}
