import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Sharma",
    text: "This completely changed how I work. I'm saving hours every day using AI.",
  },
  {
    name: "Priya Verma",
    text: "I started freelancing with AI tools and got my first client within 2 weeks.",
  },
  {
    name: "Rahul Mehta",
    text: "The workflows are insanely powerful. This is not just another course.",
  },
];

export function SocialProofSection() {
  return (
    <section className="py-16 sm:py-20 ">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl font-bold sm:text-4xl">
          Loved by Learners Worldwide
        </h2>

        <p className="mt-3 text-lg text-muted-foreground">
          Join 1000+ learners building real AI skills
        </p>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl border bg-background shadow-sm text-left">
              <div className="flex gap-1 mb-3">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">"{item.text}"</p>
              <p className="mt-4 font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}