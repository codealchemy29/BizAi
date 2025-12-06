import { ToolCard } from "./ToolCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, FileText, Image, Code, Mic, Brain } from "lucide-react";
import { Link } from "wouter";

// todo: remove mock functionality
const tools = [
  {
    id: "chatbot",
    title: "AI Chatbot",
    description: "Have intelligent conversations with our AI assistant. Ask questions and learn interactively.",
    icon: MessageSquare,
    usageCount: "1.2M",
    category: "Conversational",
  },
  {
    id: "text-generator",
    title: "Text Generator",
    description: "Generate creative content, summaries, and more with advanced language models.",
    icon: FileText,
    usageCount: "890K",
    category: "Writing",
  },
  {
    id: "image-analyzer",
    title: "Image Analyzer",
    description: "Upload images and get AI-powered descriptions, analysis, and insights.",
    icon: Image,
    usageCount: "456K",
    category: "Vision",
  },
  {
    id: "code-assistant",
    title: "Code Assistant",
    description: "Get help with coding, debugging, and understanding programming concepts.",
    icon: Code,
    usageCount: "678K",
    category: "Development",
  },
  {
    id: "speech-to-text",
    title: "Speech to Text",
    description: "Convert spoken words into written text with high accuracy.",
    icon: Mic,
    usageCount: "234K",
    category: "Audio",
  },
  {
    id: "concept-explainer",
    title: "Concept Explainer",
    description: "Get simple explanations of complex AI and tech concepts.",
    icon: Brain,
    usageCount: "567K",
    category: "Education",
  },
];

export function ToolsSection() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20" data-testid="section-tools">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Interactive AI Tools
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Practice and explore with hands-on tools
            </p>
          </div>
          <Link href="/tools">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-tools">
              View All Tools
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
