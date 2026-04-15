import { useState, useRef } from "react";
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

// 🔥 COURSES
const allCourses = [
  {
    id: "ai-beginners",
    title: "AI for Beginners",
    description:
      "Start from zero. Learn essential AI tools and how to use them in daily tasks.",
    category: "AI Foundations",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "3-5 hours",
  },
  {
    id: "ai-business",
    title: "AI for Business & Freelancing",
    description:
      "Automate your work, deliver faster, and start getting clients using AI.",
    category: "Business",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "4-6 hours",
  },
  {
    id: "ai-marketing",
    title: "AI for Marketing",
    description:
      "Create content, run ads, and scale marketing using AI automation.",
    category: "Marketing",
    difficulty: "Intermediate" as DifficultyLevel,
    duration: "4-6 hours",
  },
  {
    id: "ai-automation",
    title: "AI Automation Mastery",
    description: "Build powerful workflows and systems that run on autopilot.",
    category: "Automation",
    difficulty: "Advanced" as DifficultyLevel,
    duration: "6-8 hours",
  },
  {
    id: "ai-income",
    title: "AI Income Blueprint",
    description: "Step-by-step guide to making money using AI skills.",
    category: "Monetization",
    difficulty: "Beginner" as DifficultyLevel,
    duration: "5 hours",
  },
];

const categories = [
  "All",
  "AI Foundations",
  "Business",
  "Marketing",
  "Automation",
  "Monetization",
];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const timelineRef = useRef<HTMLDivElement | null>(null);

  // 🔥 HOVER SCROLL LOGIC
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = timelineRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    const scrollPercent = Math.pow(x / width, 1.2);
    const maxScroll = container.scrollWidth - container.clientWidth;

    container.scrollTo({
      left: maxScroll * scrollPercent,
      behavior: "smooth",
    });
  };

  // 🔍 FILTER
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || course.category === category;
    const matchesDifficulty =
      difficulty === "All" || course.difficulty === difficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });


  const timelineItems = [
  {
    step: "1",
    title: "🎥 Video Lessons",
    desc: "Step-by-step guidance to understand concepts clearly.",
  },
  {
    step: "2",
    title: "🛠 Real-world Projects",
    desc: "Build projects that strengthen your portfolio.",
  },
  {
    step: "3",
    title: "📦 Templates & Tools",
    desc: "Ready-to-use assets to speed up your workflow.",
  },
  {
    step: "4",
    title: "♾ Lifetime Access",
    desc: "Learn anytime with unlimited access.",
  },
  {
    step: "5",
    title: "🏆 Certificate",
    desc: "Showcase your skills with a certificate.",
  },
];
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="bg-muted/30 py-16 sm:py-20 border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Learn AI That Actually Makes You Money
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Practical AI courses focused on real skills, automation, and
                income.
              </p>
            </div>

            {/* FILTERS */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
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
                <SelectTrigger className="w-[180px]">
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
                >
                  Clear
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {filteredCourses.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No courses found.
                </p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? "s" : ""}
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

        {/* 🔥 HOVER SCROLL TIMELINE */}
        <section className="py-20 bg-gray-50 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        Course Structure
      </h2>
      <p className="text-gray-600 mt-3">
        A step-by-step journey from learning to execution
      </p>
    </div>

    {/* 💻 DESKTOP TIMELINE */}
    <div className="hidden md:block relative">
      <div className="absolute top-6 left-0 w-full h-1 bg-gray-200"></div>

      <div
        ref={timelineRef}
        onMouseMove={handleMouseMove}
        className="flex gap-10 overflow-x-auto pb-6 cursor-ew-resize no-scrollbar"
      >
        {timelineItems.map((item, index) => (
          <div key={index} className="min-w-[250px] relative">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold mb-4 relative z-10">
              {item.step}
            </div>
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* 📱 MOBILE ROADMAP */}
    <div className="md:hidden relative">

      {/* vertical line */}
      <div className="absolute left-5 top-0 h-full w-[2px] bg-gray-200"></div>

      <div className="space-y-10">
        {timelineItems.map((item, index) => (
          <div key={index} className="relative pl-14">

            {/* circle */}
            <div className="absolute left-0 top-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold z-10">
              {item.step}
            </div>

            {/* content */}
            <div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>

          </div>
        ))}
      </div>
    </div>

  </div>
</section>


<section className="py-24 bg-white dark:bg-[#0A0A23] transition-colors">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
      Why BizAI Skill?
    </h2>

    <p className="text-gray-600 dark:text-gray-300 text-lg mb-16 max-w-2xl mx-auto">
      Not just another course platform. Built for people who want real results.
    </p>

    {/* Grid */}
    <div className="grid md:grid-cols-2 gap-8 text-left">

      {/* Item */}
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-md dark:hover:border-white/30 transition">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          ⚡ Focus on Execution
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Learn by doing, not just watching. Every concept is applied instantly.
        </p>
      </div>

      {/* Item */}
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-md dark:hover:border-white/30 transition">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          💼 Real Business Use Cases
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Work on real-world problems that actually make money.
        </p>
      </div>

      {/* Item */}
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-md dark:hover:border-white/30 transition">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          🌍 Built for Global Learners
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Skills that work anywhere — freelance, job, or business.
        </p>
      </div>

      {/* Item */}
      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:shadow-md dark:hover:border-white/30 transition">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          🚀 Always Up-to-Date
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Stay ahead with constantly updated AI tools and workflows.
        </p>
      </div>

    </div>
  </div>
</section>
      </main>

      <Footer />
    </div>
  );
}
