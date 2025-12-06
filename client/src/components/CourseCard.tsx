import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: DifficultyLevel;
  duration: string;
  imageUrl?: string;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export function CourseCard({
  id,
  title,
  description,
  category,
  difficulty,
  duration,
}: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`}>
      <Card
        className="group cursor-pointer overflow-visible p-6 hover-elevate"
        data-testid={`card-course-${id}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Badge className={`text-xs ${difficultyColors[difficulty]}`}>
              {difficulty}
            </Badge>
          </div>

          <div>
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {duration}
              </span>
              <span className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                {difficulty}
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
