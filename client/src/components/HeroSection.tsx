import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import heroBackground from "@assets/generated_images/ai_neural_network_hero_background.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Master AI Tools &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Transform Your Skills
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-gray-200 sm:text-xl">
            Learn artificial intelligence from scratch with hands-on courses, interactive tools,
            and expert-led training. No coding experience required.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/courses">
              <Button
                size="lg"
                className="gap-2"
                data-testid="button-explore-courses"
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/playground">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 backdrop-blur-md bg-white/10 border-white/30 text-white hover:bg-white/20"
                data-testid="button-try-tools"
              >
                <Play className="h-4 w-4" />
                Try AI Tools
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              {/* todo: remove mock functionality */}
              {["JD", "SK", "MT", "AR"].map((initials, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-white/20">
                  <AvatarFallback className="bg-primary/80 text-xs text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">50,000+</span> learners worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
