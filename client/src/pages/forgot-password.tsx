import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowRight, KeyRound, CheckCircle2, ArrowLeft } from "lucide-react";
import { API_BASE_URL } from "@/config/api";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/user/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const contentType = res.headers.get("content-type");
            if (!contentType?.includes("application/json")) {
                throw new Error("Unexpected server response");
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setSent(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/20 via-blue-900/10 to-indigo-900/20" />
            <div className="absolute top-10 right-10 w-64 h-64 bg-[#1e3a8a]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

            <Card className="relative w-full max-w-md border-border/50 bg-card/60 backdrop-blur-xl shadow-xl">
                <CardContent className="p-8">
                    {!sent ? (
                        <>
                            <div className="text-center mb-6">
                                <Badge
                                    variant="secondary"
                                    className="mb-4 bg-[#1e3a8a]/10 text-[#1e3a8a] border-[#1e3a8a]/20"
                                >
                                    <KeyRound className="w-3 h-3 mr-1" />
                                    Password Recovery
                                </Badge>
                                <h1 className="text-2xl font-bold">Forgot your password?</h1>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Enter your email and we'll send you a reset link
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="email"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                                    />
                                </div>

                                {error && (
                                    <p className="text-sm text-red-500 text-center">{error}</p>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    disabled={loading}
                                    className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                    {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="text-sm text-muted-foreground hover:text-[#1e3a8a] inline-flex items-center gap-1"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    Back to Sign In
                                </Link>
                            </div>
                        </>
                    ) : (
                        /* Success state */
                        <div className="text-center py-4 space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold">Check your email</h1>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We've sent a password reset link to{" "}
                                <span className="font-semibold text-foreground">{email}</span>.
                                Please check your inbox and follow the instructions.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Didn't receive it? Check your spam folder or{" "}
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-[#1e3a8a] hover:underline font-medium"
                                >
                                    try again
                                </button>
                                .
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/login"
                                    className="text-sm text-muted-foreground hover:text-[#1e3a8a] inline-flex items-center gap-1"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    Back to Sign In
                                </Link>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
