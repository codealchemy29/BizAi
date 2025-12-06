import { ResourceCard } from "../ResourceCard";
import { FileText } from "lucide-react";

export default function ResourceCardExample() {
  return (
    <div className="max-w-md">
      <ResourceCard
        title="Understanding Transformers"
        description="A beginner-friendly guide to transformer architecture and how it powers modern AI."
        type="article"
        icon={FileText}
        url="#"
      />
    </div>
  );
}
