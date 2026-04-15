import { IndianRupee, Clock, FolderKanban, Rocket } from "lucide-react";

const outcomes = [
  {
    title: "Earn with AI Skills",
    icon: IndianRupee,
  },
  {
    title: "Save 10+ Hours/Week",
    icon: Clock,
  },
  {
    title: "Build Real Projects",
    icon: FolderKanban,
  },
  {
    title: "Become Future-Ready",
    icon: Rocket,
  },
];

export function OutcomesSection() {
  return (  
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-[#0A0A23]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          What You Get Out of This
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl border bg-background shadow-sm">
              <item.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}