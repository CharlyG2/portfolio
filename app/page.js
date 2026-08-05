import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Principles from "@/components/Principles";
import CaseIndex from "@/components/CaseIndex";
import Trajectory from "@/components/Trajectory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ink min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <Principles />
      <CaseIndex />
      <Trajectory />
      <Footer />
    </main>
  );
}
