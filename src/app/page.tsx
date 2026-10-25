import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#171717]">
      {/* Slim Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Selected Projects (Featured UCHN + Additional Projects) */}
        <ProjectsSection />

        {/* Section 3 & 4: About, Video Editing, Education */}
        <About />

        {/* Section 3 (Continued): Skills Grid */}
        <Skills />

        {/* Section 5: Resume Download & Contact */}
        <Contact />
      </main>

      {/* Section 6: Minimal Understated Footer */}
      <Footer />
    </div>
  );
}

