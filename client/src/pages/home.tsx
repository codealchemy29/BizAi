import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { CoursesSection } from "@/components/CoursesSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <CoursesSection />
        <ToolsSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
}
