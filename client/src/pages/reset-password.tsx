import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { toast } from "@/hooks/use-toast";

export default function ResetPassword() {
    const [, setLocation] = useLocation();

    // Read token from query string
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || "";

    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (form.newPassword !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (form.newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/user/reset-password`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ password: form.newPassword }),
            });

            const contentType = res.headers.get("content-type");
            if (!contentType?.includes("application/json")) {
                throw new Error("Unexpected server response");
            }

            const data = await res.json();

            if(res.ok){
                toast({
                    title: "Password Reset Successful",
                    description: data.message,
                    variant: "default",
                });
            }else{
                toast({
                    title: "Password Reset Failed",
                    description: data.message,
                    variant: "destructive",
                });
            }

            // Redirect to login on success
            setLocation("/login");
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
                    <div className="text-center mb-6">
                        <Badge
                            variant="secondary"
                            className="mb-4 bg-[#1e3a8a]/10 text-[#1e3a8a] border-[#1e3a8a]/20"
                        >
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Reset Password
                        </Badge>
                        <h1 className="text-2xl font-bold">Set a new password</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Choose a strong password for your account
                        </p>
                    </div>

                    {!token && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                            Invalid or missing reset token. Please request a new reset link.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type={showNew ? "text" : "password"}
                                name="newPassword"
                                placeholder="New password"
                                value={form.newPassword}
                                onChange={handleChange}
                                required
                                disabled={!token}
                                className="w-full pl-10 pr-10 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={!token}
                                className="w-full pl-10 pr-10 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Password strength hint */}
                        {form.newPassword && (
                            <p className={`text-xs ${form.newPassword.length >= 8 ? "text-green-500" : "text-muted-foreground"}`}>
                                {form.newPassword.length >= 8
                                    ? "✓ Password meets minimum length"
                                    : `${8 - form.newPassword.length} more characters needed`}
                            </p>
                        )}

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading || !token}
                            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </form> 

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-muted-foreground hover:text-[#1e3a8a]"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
