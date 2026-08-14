import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowIThink from "@/components/HowIThink";
import Marquee from "@/components/Marquee";
import CaseIndex from "@/components/CaseIndex";
import About from "@/components/About";
import Trajectory from "@/components/Trajectory";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-paper min-h-screen">
      <Nav />
      <Hero />
      <HowIThink />
      <Marquee />
      <CaseIndex />
      <About />
      <Trajectory />
      <Resume />
      <Footer />
    </main>
  );
}
