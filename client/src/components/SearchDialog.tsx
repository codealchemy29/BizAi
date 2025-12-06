import { useState, useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Wrench, FileText, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

// todo: remove mock functionality
const searchItems = {
  courses: [
    { id: "intro-ml", title: "Introduction to Machine Learning", href: "/courses/intro-ml" },
    { id: "nlp-basics", title: "Natural Language Processing", href: "/courses/nlp-basics" },
    { id: "prompt-engineering", title: "Prompt Engineering Mastery", href: "/courses/prompt-engineering" },
  ],
  tools: [
    { id: "chatbot", title: "AI Chatbot", href: "/playground?tool=chatbot" },
    { id: "text-generator", title: "Text Generator", href: "/playground?tool=text" },
    { id: "code-assistant", title: "Code Assistant", href: "/playground?tool=code" },
  ],
  resources: [
    { id: "transformers", title: "Understanding Transformers", href: "/resources" },
    { id: "video-series", title: "AI for Beginners Video Series", href: "/resources" },
  ],
};

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (href: string) => {
    setOpen(false);
    setLocation(href);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start gap-2 text-muted-foreground sm:w-64"
        onClick={() => setOpen(true)}
        data-testid="button-search"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search courses, tools...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground sm:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search courses, tools, and resources..." data-testid="input-search" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          <CommandGroup heading="Courses">
            {searchItems.courses.map((item) => (
              <CommandItem
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.href)}
                data-testid={`search-result-${item.id}`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Tools">
            {searchItems.tools.map((item) => (
              <CommandItem
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.href)}
                data-testid={`search-result-${item.id}`}
              >
                <Wrench className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Resources">
            {searchItems.resources.map((item) => (
              <CommandItem
                key={item.id}
                value={item.title}
                onSelect={() => handleSelect(item.href)}
                data-testid={`search-result-${item.id}`}
              >
                <FileText className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                <ArrowRight className="ml-auto h-3 w-3 opacity-50" />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
