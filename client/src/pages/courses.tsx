import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard, type DifficultyLevel } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

// todo: remove mock functionality
const allCourses = [
  {
    id: "intro-ml",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning, from basic concepts to building your first models.",
    category: "Machine Learning",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "4 hours",
  },
  {
    id: "nlp-basics",
    title: "Natural Language Processing",
    description: "Understand how AI processes and generates human language. Build text analysis tools.",
    category: "NLP",
    difficulty: "Intermediate" as DifficultyLevel,
    duration: "6 hours",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Mastery",
    description: "Master the art of crafting effective prompts for AI models like ChatGPT and Claude.",
    category: "Prompting",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "3 hours",
  },
  {
    id: "computer-vision",
    title: "Computer Vision Fundamentals",
    description: "Explore how AI sees and understands images. Learn about object detection and recognition.",
    category: "Computer Vision",
    difficulty: "Advanced" as DifficultyLevel,
    duration: "8 hours",
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Responsible AI",
    description: "Understand the ethical implications of AI and learn to build responsible AI systems.",
    category: "Ethics",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "2 hours",
  },
  {
    id: "deep-learning",
    title: "Deep Learning Foundations",
    description: "Dive into neural networks and deep learning architectures used in modern AI.",
    category: "Deep Learning",
    difficulty: "Advanced" as DifficultyLevel,
    duration: "10 hours",
  },
  {
    id: "generative-ai",
    title: "Generative AI Applications",
    description: "Learn to build applications using generative AI models for text, images, and more.",
    category: "Generative AI",
    difficulty: "Intermediate" as DifficultyLevel,
    duration: "5 hours",
  },
  {
    id: "ai-business",
    title: "AI for Business Leaders",
    description: "Strategic overview of AI technologies and how to implement them in your organization.",
    category: "Business",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "3 hours",
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    description: "Explore how AI agents learn through trial and error to make optimal decisions.",
    category: "Machine Learning",
    difficulty: "Advanced" as DifficultyLevel,
    duration: "7 hours",
  },
];

const categories = ["All", "Machine Learning", "NLP", "Prompting", "Computer Vision", "Ethics", "Deep Learning", "Generative AI", "Business"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    const matchesDifficulty = difficulty === "All" || course.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI Courses
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Structured learning paths for every skill level
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-courses"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px]" data-testid="select-difficulty">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(search || category !== "All" || difficulty !== "All") && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setDifficulty("All");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredCourses.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No courses found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setDifficulty("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
