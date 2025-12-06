import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  usageCount: string;
  category: string;
}

export function ToolCard({
  id,
  title,
  description,
  icon: Icon,
  usageCount,
  category,
}: ToolCardProps) {
  return (
    <Card
      className="group overflow-visible p-6 hover-elevate"
      data-testid={`card-tool-${id}`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-xs text-muted-foreground">{usageCount} uses</span>
          <Link href={`/playground?tool=${id}`}>
            <Button size="sm" variant="ghost" className="gap-1" data-testid={`button-try-${id}`}>
              Try Now
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
