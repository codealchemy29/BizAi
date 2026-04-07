import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams } from "wouter";
import {
    UserPlus,
    User,
    Mail,
    Phone,
    Lock,
    ArrowRight,
    RouteOffIcon,
    UserSearchIcon,
    SquareCode,
    Eye,
    EyeOff,
} from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { switchNetworks } from "@/utils/switchNetwork";
import { PURCHASE_CONTRACT_ABI } from "@/config/abi";
import { DEFAULT_REFFERAL_WALLET_ADDRESS, NETWORK, PURCHASE_CONTRACT_ADDRESS } from "@/config/env";
// import { register } from "module";

export default function Register() {
    const { toast } = useToast();
    const params = useParams<{ ref?: string }>();
    const query = new URLSearchParams(window.location.search);
    const refQuery = query.get("ref");
    const referralFromUrl = params.ref || refQuery || "";

    // const [walletAddress, setWalletAddress] = useState("");

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        referral: referralFromUrl,
    });

    // const connectWallet = async () => {
    //     try {
    //         await switchNetworks(NETWORK);
    //         if (!window.ethereum) {
    //             alert("Install MetaMask");
    //             return;
    //         }
    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         });
    //         setWalletAddress(accounts[0]);
    //         toast({
    //             title: "Wallet Connected 🎉",
    //             description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [, setLocation] = useLocation();

    // OTP related state
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);

    const handleSendOtp = async () => {
        if (!form.email) {
            toast({
                title: "Error ❌",
                description: "Email is required to send OTP",
                variant: "destructive",
            });
            return;
        }
        setOtpLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/auth/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: form.email }),
            });

            const data = await res.json();

            if (!res.ok || (data.status && data.status !== 200)) {
                throw new Error(data.message || "Failed to send OTP");
            }

            setIsOtpSent(true);
            toast({
                title: "OTP Sent! 🎉",
                description: data.message || "Verification email sent successfully!",
            });
        } catch (err: any) {
            toast({
                title: "Error ❌",
                description: err.message || "Something went wrong while sending OTP",
                variant: "destructive",
            });
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            toast({
                title: "Error ❌",
                description: "Please enter the OTP",
                variant: "destructive",
            });
            return;
        }
        setVerifyLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: form.email, otp }),
            });

            const data = await res.json();

            if (!res.ok || (data.status && data.status !== 200)) {
                throw new Error(data.message || "Failed to verify OTP");
            }

            setIsEmailVerified(true);
            toast({
                title: "Email Verified ✅",
                description: data.message || "Your email has been verified successfully.",
            });
        } catch (err: any) {
            toast({
                title: "Error ❌",
                description: err.message || "Something went wrong while verifying OTP",
                variant: "destructive",
            });
        } finally {
            setVerifyLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Referral from URL:", referralFromUrl);

        // const refWalletAddress =
        //     referralFromUrl ||
        //     form.referral ||
        //     DEFAULT_REFFERAL_WALLET_ADDRESS; // DEFAULT REFERRAL

        // // if (!walletAddress) {
        // //     setError("Please connect your wallet before registering");
        // //     return;
        // }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(null);
        setLoading(true);

        // try {
        //     if (!window.ethereum) throw new Error("No crypto wallet found");
        //     await switchNetworks(NETWORK);
        //     const provider = new ethers.BrowserProvider(window.ethereum);
        //     const signer = await provider.getSigner();
        //     const transferContract = new ethers.Contract(
        //         PURCHASE_CONTRACT_ADDRESS,
        //         PURCHASE_CONTRACT_ABI,
        //         signer,
        //     );

            // const register = await transferContract.register(refWalletAddress);
            // await register.wait();

            console.log("Registration success:", Register);
            toast({
                title: "Registration successful 🎉",
                description: "You have been registered successfully",
            });
        // } catch (error: any) {
        //     console.log("Full error:", error);
        //     let message = "Transaction failed";
        //     if (error?.reason) {
        //         message = error.reason;
        //     } else if (error?.revert?.args?.[0]) {
        //         message = error.revert.args[0];
        //     } else if (error?.shortMessage) {
        //         message = error.shortMessage;
        //     }
        //     toast({
        //         title: "Transaction Failed ❌",
        //         description: message,
        //     });
        //     setError(message);
        //     return;
        // } finally {
        //     setLoading(false);
        // }

        try {
            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
                confirmPassword: form.confirmPassword,
                // wallet_address: walletAddress,
                // ref_wallet_address: refWalletAddress,
            };
            console.log("Payload:", payload);

            const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // console.log("Registration success:", data);

            if (data.data?.token) {
                const token = data.data.token;

                localStorage.setItem("token", token);

                // 🔥 UPDATE USER PROFILE
                await fetch(`${API_BASE_URL}/api/v1/user`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // body: JSON.stringify({
                    //     wallet_address: walletAddress,
                    //     ref_wallet_address: refWalletAddress || null,
                    // }),
                });
            }
            setLocation("/login");
        } catch (err: any) {
            setError(err.message);
            return;
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
                            <UserPlus className="w-3 h-3 mr-1" />
                            Create Account
                        </Badge>
                        <h1 className="text-2xl font-bold">Join BizAiSkill</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Start building, learning, and earning with AI
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                name="name"
                                placeholder="Full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                disabled={isOtpSent || isEmailVerified}
                                required
                                className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none ${isOtpSent || isEmailVerified ? "opacity-70 cursor-not-allowed" : ""}`}
                            />
                        </div>

                        {!isEmailVerified && !isOtpSent && (
                            <Button
                                type="button"
                                size="lg"
                                disabled={otpLoading}
                                onClick={handleSendOtp}
                                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                            >
                                {otpLoading ? "Sending OTP..." : "Send OTP"}
                            </Button>
                        )}

                        {!isEmailVerified && isOtpSent && (
                            <>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="lg"
                                    disabled={verifyLoading}
                                    onClick={handleVerifyOtp}
                                    className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                                >
                                    {verifyLoading ? "Verifying..." : "Verify Email"}
                                </Button>
                                <div className="text-center mt-2">
                                    <button
                                        type="button"
                                        disabled={otpLoading}
                                        onClick={handleSendOtp}
                                        className="text-sm font-medium text-[#1e3a8a] hover:underline disabled:opacity-50"
                                    >
                                        {otpLoading ? "Resending..." : "Didn't receive code? Resend"}
                                    </button>
                                </div>
                            </>
                        )}

                        {isEmailVerified && (
                            <>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-10 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-10 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        <div className="relative">
                            <SquareCode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                name="referral"
                                placeholder="Referral Wallet Address (optional)"
                                value={form.referral}
                                disabled={!!referralFromUrl}
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-2 rounded-xl border bg-background focus:ring-2 focus:ring-[#1e3a8a] outline-none ${referralFromUrl ? "opacity-70 cursor-not-allowed" : ""}`}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}

                        {/* <Button
                            type="button"
                            size="lg"
                            disabled={loading || !!walletAddress}
                            onClick={connectWallet}
                            className={`w-full text-[#1e3a8a] ${walletAddress ? "bg-black hover:bg-black/90 text-white" : "bg-[#ffffff] hover:bg-[#ffffff]/90"}`}
                        >
                            {walletAddress
                                ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                : "Connect Wallet"}
                            {!walletAddress && (
                                <ArrowRight className="ml-2 h-4 w-4" />
                            )}
                        </Button> */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={loading}
                            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                            {!loading && (
                                <ArrowRight className="ml-2 h-4 w-4" />
                            )}
                        </Button>
                            </>
                        )}
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#1e3a8a] hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
