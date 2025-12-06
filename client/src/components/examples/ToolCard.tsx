import { ToolCard } from "../ToolCard";
import { MessageSquare } from "lucide-react";

export default function ToolCardExample() {
  return (
    <div className="max-w-sm">
      <ToolCard
        id="chatbot"
        title="AI Chatbot"
        description="Have intelligent conversations with our AI assistant. Ask questions, get explanations, and learn interactively."
        icon={MessageSquare}
        usageCount="1.2M"
        category="Conversational AI"
      />
    </div>
  );
}
