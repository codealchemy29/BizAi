import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { CoursesSection } from "@/components/CoursesSection";
import { ToolsSection } from "@/components/ToolsSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { Footer } from "@/components/Footer";
import { WhoItsForSection } from "@/components/WhoItsForSection";
import { WhatYouLearnSection } from "@/components/WhatYouLearnSection";
import { SocialProofSection } from "@/components/SocialProofSection";
import { OutcomesSection } from "@/components/OutcomesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <WhoItsForSection />
        <WhatYouLearnSection />
        <CoursesSection />
        <OutcomesSection />
        <ToolsSection />
        <ResourcesSection />
         <SocialProofSection />
      </main>
      <Footer />
    </div>
  );
}
