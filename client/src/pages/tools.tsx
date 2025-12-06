import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { MessageSquare, FileText, Image, Code, Mic, Brain, Wand2, BarChart3, Globe, Lightbulb, Zap, Bot } from "lucide-react";

// todo: remove mock functionality
const allTools = [
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
  {
    id: "prompt-helper",
    title: "Prompt Helper",
    description: "Craft better prompts for AI models with guided suggestions.",
    icon: Wand2,
    usageCount: "345K",
    category: "Writing",
  },
  {
    id: "data-analyzer",
    title: "Data Analyzer",
    description: "Upload data and get AI-powered insights and visualizations.",
    icon: BarChart3,
    usageCount: "189K",
    category: "Analytics",
  },
  {
    id: "translator",
    title: "AI Translator",
    description: "Translate text between languages with context-aware AI.",
    icon: Globe,
    usageCount: "456K",
    category: "Language",
  },
  {
    id: "idea-generator",
    title: "Idea Generator",
    description: "Brainstorm ideas for projects, content, and creative endeavors.",
    icon: Lightbulb,
    usageCount: "234K",
    category: "Creative",
  },
  {
    id: "summarizer",
    title: "Text Summarizer",
    description: "Condense long articles and documents into key points.",
    icon: Zap,
    usageCount: "567K",
    category: "Writing",
  },
  {
    id: "assistant",
    title: "Personal Assistant",
    description: "Get help with tasks, scheduling, and organization.",
    icon: Bot,
    usageCount: "789K",
    category: "Productivity",
  },
];

export default function Tools() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI Tools
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Interactive tools to practice and explore AI capabilities
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTools.map((tool) => (
                <ToolCard key={tool.id} {...tool} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
