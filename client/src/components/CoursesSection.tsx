import { CourseCard } from "./CourseCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

// todo: remove mock functionality
const courses = [
  {
    id: "intro-ml",
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning, from basic concepts to building your first models.",
    category: "Machine Learning",
    difficulty: "Beginner" as const,
    duration: "4 hours",
  },
  {
    id: "nlp-basics",
    title: "Natural Language Processing",
    description: "Understand how AI processes and generates human language. Build text analysis tools.",
    category: "NLP",
    difficulty: "Intermediate" as const,
    duration: "6 hours",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Mastery",
    description: "Master the art of crafting effective prompts for AI models like ChatGPT and Claude.",
    category: "Prompting",
    difficulty: "Beginner" as const,
    duration: "3 hours",
  },
  {
    id: "computer-vision",
    title: "Computer Vision Fundamentals",
    description: "Explore how AI sees and understands images. Learn about object detection and recognition.",
    category: "Computer Vision",
    difficulty: "Advanced" as const,
    duration: "8 hours",
  },
  {
    id: "ai-ethics",
    title: "AI Ethics & Responsible AI",
    description: "Understand the ethical implications of AI and learn to build responsible AI systems.",
    category: "Ethics",
    difficulty: "Beginner" as const,
    duration: "2 hours",
  },
  {
    id: "deep-learning",
    title: "Deep Learning Foundations",
    description: "Dive into neural networks and deep learning architectures used in modern AI.",
    category: "Deep Learning",
    difficulty: "Advanced" as const,
    duration: "10 hours",
  },
];

export function CoursesSection() {
  return (
    <section className="py-16 sm:py-20" data-testid="section-courses">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Learn AI Your Way
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Structured courses for every skill level
            </p>
          </div>
          <Link href="/courses">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-courses">
              View All Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
