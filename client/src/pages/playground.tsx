import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PlaygroundInterface } from "@/components/PlaygroundInterface";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function Playground() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                AI Playground
              </h1>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Interactive Demo
              </Badge>
            </div>
            <p className="mt-2 text-lg text-muted-foreground">
              Experiment with AI tools in real-time and see the power of modern language models
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <PlaygroundInterface />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
