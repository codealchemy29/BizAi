import { Users, BookOpen, Wrench, Award } from "lucide-react";

// todo: remove mock functionality
const stats = [
  {
    label: "Active Learners",
    value: "50,000+",
    icon: Users,
  },
  {
    label: "Courses Available",
    value: "25+",
    icon: BookOpen,
  },
  {
    label: "AI Tools",
    value: "12",
    icon: Wrench,
  },
  {
    label: "Certificates Issued",
    value: "15,000+",
    icon: Award,
  },
];

export function StatsSection() {
  return (
    <section className="border-y bg-card py-12" data-testid="section-stats">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4"
              data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
