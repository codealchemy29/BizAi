import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Sparkles, RotateCcw, Copy, Check } from "lucide-react";

// todo: remove mock functionality
const examplePrompts = [
  "Explain machine learning in simple terms",
  "What is the difference between AI and ML?",
  "How do neural networks work?",
  "Write a Python function to sort a list",
];

// todo: remove mock functionality
const mockResponses: Record<string, string> = {
  "Explain machine learning in simple terms": "Machine learning is like teaching a computer to learn from examples, just like how you learned to recognize cats by seeing many pictures of cats. Instead of telling the computer exactly what to do, we show it lots of examples and let it figure out the patterns on its own.",
  "What is the difference between AI and ML?": "AI (Artificial Intelligence) is the broad concept of machines being able to carry out tasks in a way that we would consider \"smart\". ML (Machine Learning) is a subset of AI that focuses on the ability of machines to learn from data without being explicitly programmed.",
  default: "This is a demo response. In the full version, this would connect to an actual AI model to generate real responses based on your prompt.",
};

export function PlaygroundInterface() {
  const [activeTab, setActiveTab] = useState("chatbot");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResponse("");
    
    // todo: remove mock functionality - simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const mockResponse = mockResponses[prompt] || mockResponses.default;
    setResponse(mockResponse);
    setIsLoading(false);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div className="mx-auto max-w-5xl" data-testid="playground-interface">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="chatbot" data-testid="tab-chatbot">
            AI Chatbot
          </TabsTrigger>
          <TabsTrigger value="text" data-testid="tab-text">
            Text Generator
          </TabsTrigger>
          <TabsTrigger value="code" data-testid="tab-code">
            Code Assistant
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold">Your Prompt</h3>
                <Badge variant="secondary" className="text-xs">
                  {activeTab === "chatbot" ? "Conversational" : activeTab === "text" ? "Creative" : "Technical"}
                </Badge>
              </div>

              <Textarea
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[200px] resize-none"
                data-testid="input-prompt"
              />

              <div className="mt-4 flex flex-wrap gap-2">
                <p className="w-full text-xs text-muted-foreground">Try an example:</p>
                {examplePrompts.map((example, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => handleExampleClick(example)}
                    data-testid={`button-example-${i}`}
                  >
                    {example.length > 30 ? example.slice(0, 30) + "..." : example}
                  </Button>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isLoading}
                  className="flex-1 gap-2"
                  data-testid="button-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleReset}
                  data-testid="button-reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-semibold">AI Response</h3>
                {response && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="gap-1"
                    data-testid="button-copy"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="min-h-[200px] rounded-md border bg-muted/30 p-4">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                      <span>AI is thinking...</span>
                    </div>
                  </div>
                ) : response ? (
                  <p className="whitespace-pre-wrap text-sm leading-relaxed" data-testid="text-response">
                    {response}
                  </p>
                ) : (
                  <div className="flex h-full items-center justify-center text-center">
                    <p className="text-sm text-muted-foreground">
                      Enter a prompt and click Generate to see the AI response
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 text-xs text-muted-foreground">
                <span>Powered by advanced language models</span>
                <span>Demo mode</span>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
