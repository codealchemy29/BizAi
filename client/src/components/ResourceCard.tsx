import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, type LucideIcon } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  type: "article" | "video" | "tutorial" | "paper";
  icon: LucideIcon;
  url: string;
}

const typeColors: Record<string, string> = {
  article: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  video: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  tutorial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  paper: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
};

export function ResourceCard({
  title,
  description,
  type,
  icon: Icon,
  url,
}: ResourceCardProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Card
        className="group cursor-pointer overflow-visible p-4 hover-elevate"
        data-testid={`card-resource-${title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-medium leading-tight group-hover:text-primary">
                {title}
              </h4>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
            <Badge className={`mt-2 text-xs ${typeColors[type]}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
        </div>
      </Card>
    </a>
  );
}
