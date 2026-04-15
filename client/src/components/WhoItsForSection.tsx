import { Users, Briefcase, Megaphone, Building2, TrendingUp } from "lucide-react";

const audience = [
  {
    title: "Students",
    icon: Users,
    description: "Start early and gain AI skills that give you an unfair advantage in your career.",
  },
  {
    title: "Freelancers",
    icon: Briefcase,
    description: "Deliver work faster, take more clients, and increase your income using AI.",
  },
  {
    title: "Marketers",
    icon: Megaphone,
    description: "Create content, run campaigns, and analyze data 10x faster with AI tools.",
  },
  {
    title: "Business Owners",
    icon: Building2,
    description: "Automate operations, reduce costs, and scale your business efficiently.",
  },
  {
    title: "Professionals",
    icon: TrendingUp,
    description: "Upgrade your skills and stay relevant in a fast-changing AI-driven world.",
  },
];

export function WhoItsForSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Who This Is For
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            No matter where you are — AI can level you up
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audience.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl border bg-background shadow-sm hover:shadow-md transition">
              <item.icon className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}