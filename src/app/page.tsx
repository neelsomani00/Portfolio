import { Navbar } from "@/components/Navbar";
import { HeroBackground } from "@/components/animations/HeroBackground";
import { BentoGrid } from "@/components/BentoGrid";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ProcessAccordion } from "@/components/ProcessAccordion";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white pb-32">
      <Navbar />
      <HeroBackground />
      
      <section className="pt-40 pb-20 px-4 text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter">NEEL SOMANI</h1>
        <p className="text-xl text-slate-400 mb-20 uppercase tracking-widest">Building Intelligent Web Systems</p>
        
        <div id="projects" className="w-full max-w-7xl mx-auto mb-32 text-left px-4">
          <h2 className="text-3xl font-bold mb-10">Featured Work</h2>
          <ProjectCarousel />
        </div>

        <div className="w-full max-w-7xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-10 text-left px-4">Technical Arsenal</h2>
          <BentoGrid />
        </div>

        <ProcessAccordion />
        <CommandPalette />
      </section>
    </main>
  );
}
