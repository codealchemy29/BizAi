import { Zap, Workflow, Cpu, DollarSign } from "lucide-react";

const learnItems = [
  {
    title: "Work Faster with AI",
    icon: Zap,
    description: "Use powerful AI tools to complete tasks in minutes instead of hours.",
  },
  {
    title: "Automate Real Tasks",
    icon: Workflow,
    description: "Automate repetitive work like emails, content, and workflows.",
  },
  {
    title: "Build AI Workflows",
    icon: Cpu,
    description: "Create smart systems that connect tools and run on autopilot.",
  },
  {
    title: "Earn Using AI",
    icon: DollarSign,
    description: "Learn how to monetize AI skills through freelancing, jobs, or business.",
  },
];

export function WhatYouLearnSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">
            What You’ll Learn
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            No theory. Just real skills you’ll actually use.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {learnItems.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl border bg-background shadow-sm hover:shadow-md transition">
              <item.icon className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}