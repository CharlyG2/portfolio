import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import HowIThink from "@/components/HowIThink";
import Marquee from "@/components/Marquee";
import CaseIndex from "@/components/CaseIndex";
import Impact from "@/components/Impact";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen">
      <Nav />
      <Hero />
      <ValueProp />
      <HowIThink />
      <Marquee />
      <CaseIndex />
      <Impact />
      <About />
      <Trajectory />
      <Resume />
      <Footer />
    </main>
  );
}
