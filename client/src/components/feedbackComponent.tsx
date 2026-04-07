import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    feedback: z.string().min(10, {
        message: "Feedback must be at least 10 characters.",
    }),
});

export type feedbackComponentProps = {
    feedbackType: string;
    feedbackTitle: string;
    feedbackDescription: string;
};

const FeedbackComponent = ({
    feedbackType,
    feedbackTitle,
    feedbackDescription,
}: feedbackComponentProps) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [, setLocation] = useLocation();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            feedback: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            const payload = {
                email: values.email,
                feedback: values.feedback,
            };

            const feedbackUrl =
                feedbackType === "intro"
                    ? `${API_BASE_URL}/api/v1/intro-ai/feedback`
                    : `${API_BASE_URL}/api/v1/feedback`;

            const resp = await fetch(feedbackUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            const data = await resp.json();
            console.log(data);
            toast({
                title: "Feedback submitted successfully",
                description: "Thank you for your feedback.",
            });
            setTimeout(() => {
                setLocation("/");
            }, 1000);
        } catch (error) {
            console.log(error);
            toast({
                title: "Feedback submission failed",
                description: "Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full max-w-xl border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">
                    We call it feedback for{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        {feedbackTitle}
                    </span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                    {feedbackDescription}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email (Registered Email ID)*
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Please submit the form with your
                                        registered email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Feedback*</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us what you think..."
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white border-0"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Feedback"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default FeedbackComponent;
