import { ResourceCard } from "./ResourceCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Video, BookOpen, FileCode } from "lucide-react";
import { Link } from "wouter";

// todo: remove mock functionality
const resources = [
  {
    title: "Understanding Transformers",
    description: "A beginner-friendly guide to transformer architecture and how it powers modern AI models.",
    type: "article" as const,
    icon: FileText,
    url: "#",
  },
  {
    title: "AI for Beginners Video Series",
    description: "10-part video series covering AI fundamentals from zero to practical applications.",
    type: "video" as const,
    icon: Video,
    url: "#",
  },
  {
    title: "Build Your First Chatbot",
    description: "Step-by-step tutorial to create a simple chatbot using modern AI APIs.",
    type: "tutorial" as const,
    icon: BookOpen,
    url: "#",
  },
  {
    title: "GPT Architecture Explained",
    description: "Technical deep-dive into how GPT models work, with visual explanations.",
    type: "paper" as const,
    icon: FileCode,
    url: "#",
  },
];

export function ResourcesSection() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-resources">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Learning Resources
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Articles, videos, and tutorials to deepen your knowledge
            </p>
          </div>
          <Link href="/resources">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-resources">
              View All Resources
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {resources.map((resource, i) => (
            <ResourceCard key={i} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
