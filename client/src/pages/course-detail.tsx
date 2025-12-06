import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams, Link } from "wouter";
import {
  Clock,
  BarChart3,
  Users,
  Play,
  CheckCircle2,
  BookOpen,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

// todo: remove mock functionality
const courseData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  difficulty: string;
  duration: string;
  lessons: number;
  students: string;
  modules: { title: string; lessons: { title: string; duration: string; completed?: boolean }[] }[];
}> = {
  "intro-ml": {
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning, from basic concepts to building your first models.",
    longDescription: "This comprehensive course introduces you to the exciting world of machine learning. You'll learn how computers can learn from data, understand different types of ML algorithms, and gain hands-on experience building your first predictive models. Perfect for beginners with no prior ML experience.",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "4 hours",
    lessons: 12,
    students: "15,234",
    modules: [
      {
        title: "Getting Started with ML",
        lessons: [
          { title: "What is Machine Learning?", duration: "15 min", completed: true },
          { title: "Types of Machine Learning", duration: "20 min", completed: true },
          { title: "Setting Up Your Environment", duration: "10 min" },
        ],
      },
      {
        title: "Core Concepts",
        lessons: [
          { title: "Understanding Data", duration: "25 min" },
          { title: "Features and Labels", duration: "20 min" },
          { title: "Training and Testing", duration: "15 min" },
        ],
      },
      {
        title: "Your First Model",
        lessons: [
          { title: "Introduction to Algorithms", duration: "20 min" },
          { title: "Building a Simple Model", duration: "30 min" },
          { title: "Evaluating Model Performance", duration: "25 min" },
        ],
      },
      {
        title: "Next Steps",
        lessons: [
          { title: "Common ML Libraries", duration: "20 min" },
          { title: "Real-World Applications", duration: "15 min" },
          { title: "Course Wrap-up", duration: "10 min" },
        ],
      },
    ],
  },
};

const defaultCourse = {
  title: "Course Not Found",
  description: "This course could not be found.",
  longDescription: "Please check the URL and try again.",
  category: "Unknown",
  difficulty: "Unknown",
  duration: "N/A",
  lessons: 0,
  students: "0",
  modules: [],
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = courseData[id || ""] || defaultCourse;
  const [activeTab, setActiveTab] = useState("overview");

  const completedLessons = course.modules.reduce(
    (acc, module) => acc + module.lessons.filter((l) => l.completed).length,
    0
  );
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="mb-4 gap-1" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
                Back to Courses
              </Button>
            </Link>

            <div className="flex flex-wrap items-start gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge
                className={
                  course.difficulty === "Beginner"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : course.difficulty === "Intermediate"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                }
              >
                {course.difficulty}
              </Badge>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {course.lessons} lessons
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                {course.difficulty}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {course.students} students
              </span>
            </div>

            {progress > 0 && (
              <div className="mt-6 max-w-md">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="gap-2" data-testid="button-start-course">
                <Play className="h-4 w-4" />
                {progress > 0 ? "Continue Learning" : "Start Course"}
              </Button>
              <Button size="lg" variant="outline" data-testid="button-preview">
                Preview Course
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" data-testid="tab-curriculum">Curriculum</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <div className="max-w-3xl">
                  <h2 className="text-xl font-semibold">About This Course</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {course.longDescription}
                  </p>

                  <h3 className="mt-8 text-lg font-semibold">What You'll Learn</h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      "Understand core machine learning concepts and terminology",
                      "Differentiate between supervised and unsupervised learning",
                      "Build and evaluate simple machine learning models",
                      "Apply ML techniques to real-world problems",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-0">
                <div className="max-w-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {course.modules.map((module, i) => (
                      <AccordionItem key={i} value={`module-${i}`}>
                        <AccordionTrigger className="text-left" data-testid={`accordion-module-${i}`}>
                          <div className="flex items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-sm font-medium">
                              {i + 1}
                            </span>
                            <span>{module.title}</span>
                            <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                              {module.lessons.length} lessons
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="ml-10 space-y-2">
                            {module.lessons.map((lesson, j) => (
                              <li
                                key={j}
                                className="flex items-center justify-between gap-4 rounded-md p-2 hover:bg-muted/50"
                              >
                                <div className="flex items-center gap-3">
                                  {lesson.completed ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                                  )}
                                  <span className={lesson.completed ? "text-muted-foreground" : ""}>
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {lesson.duration}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
