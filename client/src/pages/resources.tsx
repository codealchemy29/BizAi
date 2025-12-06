import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResourceCard } from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, FileCode, Search } from "lucide-react";

// todo: remove mock functionality
const allResources = [
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
  {
    title: "Introduction to Neural Networks",
    description: "Visual guide explaining how neural networks learn and process information.",
    type: "article" as const,
    icon: FileText,
    url: "#",
  },
  {
    title: "Prompt Engineering Workshop",
    description: "Comprehensive video workshop on crafting effective AI prompts.",
    type: "video" as const,
    icon: Video,
    url: "#",
  },
  {
    title: "Building AI Applications with APIs",
    description: "Hands-on tutorial for integrating AI APIs into web applications.",
    type: "tutorial" as const,
    icon: BookOpen,
    url: "#",
  },
  {
    title: "The History of AI: From Turing to GPT",
    description: "Comprehensive timeline of artificial intelligence development.",
    type: "article" as const,
    icon: FileText,
    url: "#",
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Video course covering core ML concepts with practical examples.",
    type: "video" as const,
    icon: Video,
    url: "#",
  },
  {
    title: "Attention Is All You Need",
    description: "The groundbreaking paper that introduced the transformer architecture.",
    type: "paper" as const,
    icon: FileCode,
    url: "#",
  },
  {
    title: "Creating AI-Powered Search",
    description: "Tutorial on building semantic search using embeddings and vector databases.",
    type: "tutorial" as const,
    icon: BookOpen,
    url: "#",
  },
  {
    title: "Understanding Large Language Models",
    description: "Deep dive into how LLMs are trained and why they work.",
    type: "paper" as const,
    icon: FileCode,
    url: "#",
  },
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeTab === "all" || resource.type === activeTab;
    return matchesSearch && matchesType;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Learning Resources
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Articles, videos, tutorials, and papers to deepen your AI knowledge
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-resources"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                <TabsTrigger value="article" data-testid="tab-articles">Articles</TabsTrigger>
                <TabsTrigger value="video" data-testid="tab-videos">Videos</TabsTrigger>
                <TabsTrigger value="tutorial" data-testid="tab-tutorials">Tutorials</TabsTrigger>
                <TabsTrigger value="paper" data-testid="tab-papers">Papers</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredResources.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-lg text-muted-foreground">
                      No resources found matching your criteria.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearch("");
                        setActiveTab("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="mb-6 text-sm text-muted-foreground">
                      Showing {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""}
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredResources.map((resource, i) => (
                        <ResourceCard key={i} {...resource} />
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
