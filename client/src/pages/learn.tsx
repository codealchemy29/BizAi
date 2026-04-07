import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    GraduationCap,
    Star,
    ArrowRight,
    Play,
    CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
declare global {
    interface Window {
        ethereum?: any;
    }
}
import { API_BASE_URL } from "@/config/api";
import {
    CLAIM_URL,
    RAZORPAY_KEY_ID,
    // DEOD_TOKEN_ADDRESS,
    // NETWORK,
    // PURCHASE_CONTRACT_ADDRESS,
    // STAKING_CONTRACT_ADDRESS,
} from "@/config/env";
// import { switchNetworks } from "@/utils/switchNetwork";
import useDeodPrice from "@/hooks/use-deodPrice";
import useUsdToInr from "@/hooks/use-usdToInr";
// import {
//     DEOD_TOKEN_ABI,
//     PURCHASE_CONTRACT_ABI,
//     STAKING_CONTRACT_ABI,
// } from "@/config/abi";

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: any) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6 },
    }),
};

const featuredCourses = [
    {
        title: "Build Your First AI Chatbot",
        instructor: "Sarah Chen",
        rating: 4.9,
        students: 3500,
        duration: "3 hours",
        level: "Beginner",
        progress: 0,
    },
    {
        title: "Advanced Prompt Engineering",
        instructor: "Mike Johnson",
        rating: 4.8,
        students: 2800,
        duration: "5 hours",
        level: "Intermediate",
        progress: 35,
    },
    {
        title: "RAG Applications with LangChain",
        instructor: "Emily Davis",
        rating: 4.9,
        students: 1900,
        duration: "6 hours",
        level: "Advanced",
        progress: 0,
    },
];

/* =======================
    HELPERS
======================= */

declare global {
    interface Window {
        Razorpay: any;
    }
}

function getLevelColor(level: string) {
    switch (level) {
        case "Beginner":
            return "bg-green-500/10 text-green-600 dark:text-green-400";
        case "Intermediate":
            return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
        case "Advanced":
            return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
        default:
            return "bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
}

/* =======================
    PAGE
======================= */

export default function Learn() {
    const [open, setOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    // const couponCode = "DEOD50";
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [enrollOpen, setEnrollOpen] = useState(false);
    const [couponOpen, setCouponOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();
    const { usdToInrRate, setUsdToInrRate } = useUsdToInr();
    const [plans, setPlans] = useState<any[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [couponData, setCouponData] = useState<any>(null);
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState<string | null>(null);

    const [successOpen, setSuccessOpen] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);
    const [, setLocation] = useLocation();
    // Check for existing coupons
    const [purchasedPackageIds, setPurchasedPackageIds] = useState<string[]>(
        [],
    );



    console.log("selectedPlan >>>", selectedPlan);

    useEffect(() => {
        const fetchUserCoupons = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/v1/coupons/my-coupons`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (res.ok) {
                    const json = await res.json();

                    // json.data is an array of coupon objects
                    // Based on user provided response, packageId is a string reference
                    const lids = json.data.map((c: any) => c.packageId);
                    setPurchasedPackageIds(lids);
                }
            } catch (err) {
                console.error("Failed to fetch user coupons", err);
            }
        };
        fetchUserCoupons();
    }, [open, enrollOpen]); // Re-fetch when modals close/open to refresh state

    const initiatePayment = async (data: any) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCouponLoading(false);
            toast({
                title: "Error ❌",
                description: "Please login to purchase a plan",
                variant: "destructive",
            });
            return;
        }
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/v1/payment/initiate-payment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                },
            );
            const json = await res.json();
            return json;
        } catch (error) {
            console.error("Error initiating payment:", error);
            return { status: false, message: "Failed to initiate payment" };
        }
    };

    const handleInitiatePayment = async (packageId: string, amount: number) => {
        if (!selectedPlan) return;
        const token = localStorage.getItem("token");
        if (!token) {
            setCouponLoading(false);
            toast({
                title: "Error ❌",
                description: "Please login to purchase a plan",
                variant: "destructive",
            });
            return;
        }
        const data = {
            amount,
            packageId,
        };
        console.log(data);
        const response = await initiatePayment(data);
        if (response.status === 200) {
            console.log(response);
            setCouponLoading(false);
            // Pass orderId directly to avoid state update delay issues
            handleProcessPayment(response.data.amount, response.data.orderId);
        } else {
            setCouponLoading(false);
        }
    };

    const verifyPayment = async (token: string, data: any) => {
        try {
            const res = await fetch(
                `${API_BASE_URL}/api/v1/coupons`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                },
            );
            const json = await res.json();
            return json;
        } catch (error) {
            console.error("Error verifying payment:", error);
            return { status: false, message: "Failed to verify payment" };
        }
    };

    const handleProcessPayment = async (amount: number, rzpOrderId: string) => {
        if (!selectedPlan) return;
        setCouponLoading(true);
        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "Biz Technologies IT Solutions Ltd.",
            description: `Payment for Invoice #${selectedPlan._id}`,
            image: "https://biztechnologies.in/images/logo.png",
            order_id: rzpOrderId,
            handler: async function (rzpResponse: any) {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast({
                        variant: "destructive",
                        title: "Authentication Required",
                        description: "Please login to continue",
                    });
                    setCouponLoading(false);
                    return;
                }
                const data = {
                    packageId: selectedPlan._id,
                    paymentId: rzpResponse.razorpay_payment_id,
                    orderId: rzpOrderId,
                    signature: rzpResponse.razorpay_signature,
                };
                const res = await verifyPayment(token, data);
                console.log("Payment Response:", res);
                if (res.status === 200) {
    setPurchasedPackageIds((prev) => [...prev, selectedPlan._id]);

    // Save success data (coupon / package info)
    setSuccessData({
        packageName: selectedPlan.title,
        code: res.data?.code || "N/A", // adjust based on API response
    });

    setOpen(false);
    setEnrollOpen(false);
    setSuccessOpen(true);

    // Auto redirect after 3 sec
    // setTimeout(() => {
    //     window.location.href = "/profile";
    // }, 3000);
} else {
                    toast({
                        variant: "destructive",
                        title: "Payment Failed",
                        description:
                            res.message || "Payment verification failed",
                    });
                }
                setCouponLoading(false);
            },
            prefill: {
                name: "Client",
                email: "[EMAIL_ADDRESS]",
                contact: "9876543210",
            },
            notes: {
                address: "",
                invoiceId: selectedPlan._id,
            },
            theme: {
                color: "#2563eb",
            },
            modal: {
                ondismiss: function () {
                    setCouponLoading(false);
                },
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response: any) {
            console.error("Payment Failed:", response.error);
            setCouponLoading(false);
            toast({
                variant: "destructive",
                title: "Payment Failed",
                description: response.error.description,
            });
        });
        rzp1.open();
    };
    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/packages`);
                const json = await res.json();

                if (res.ok) {
                    setPlans(json.data.filter((p: any) => p.isActive));
                }
            } catch (err) {
                console.error("Failed to fetch packages", err);
            } finally {
                setLoadingPlans(false);
            }
        };

        fetchPackages();
    }, []);

    // 🔹 CLICK HANDLER
    const handleEnrollClick = (plan: any) => {
        setSelectedPlan(plan);
        setEnrollOpen(true);
    };

    // const handleCopy = async () => {
    //   try {
    //     await navigator.clipboard.writeText(COUPON_CODE);
    //     setCopied(true);
    //     setTimeout(() => setCopied(false), 2000);
    //   } catch (err) {
    //     console.error("Copy failed");
    //   }
    // };

    // const [walletAddress, setWalletAddress] = useState<string | null>(null);
    // const [walletError, setWalletError] = useState<string | null>(null);

    // const connectMetaMask = async () => {
    //     try {
    //         if (!window.ethereum) {
    //             toast({
    //                 variant: "destructive",
    //                 title: "MetaMask Not Found",
    //                 description: "Please install MetaMask to continue.",
    //             });
    //             setWalletError("MetaMask is not installed");
    //             return;
    //         }

    //         const accounts = await window.ethereum.request({
    //             method: "eth_requestAccounts",
    //         });

    //         setWalletAddress(accounts[0]);
    //         setWalletError(null);
    //         toast({
    //             title: "Wallet Connected",
    //             description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
    //         });
    //     } catch (err: any) {
    //         console.error(err);
    //         setWalletError("Wallet connection failed");
    //         toast({
    //             variant: "destructive",
    //             title: "Connection Failed",
    //             description: "Could not connect wallet.",
    //         });
    //     }
    // };
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            {/* ================= HERO ================= */}
            <section className="relative overflow-hidden border-b border-border">
                {/* Themed Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-teal-50 dark:from-[#1e3a8a]/10 dark:via-background dark:to-teal-900/10" />

                <div className="relative max-w-7xl mx-auto px-6 py-28">
                    <Badge className="mb-6 bg-[#1e3a8a]/10 text-[#1e3a8a] dark:text-blue-300 border-[#1e3a8a]/20">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        AI Education
                    </Badge>

                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Learn AI Skills That{" "}
                        <span className="bg-gradient-to-r from-[#1e3a8a] to-teal-600 dark:from-blue-400 dark:to-teal-400 bg-clip-text text-transparent">
                            Actually Matter
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-10">
                        From beginner fundamentals to advanced AI engineering.
                        Master the skills that will define the future of
                        technology with structured learning paths and hands-on
                        projects.
                    </p>

                    {/* <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            onClick={() => setOpen(true)}
                            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                        >
                            Start Learning
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            size="lg"
                            onClick={() => setOpen(true)}
                            variant="outline"
                            className="border-border"
                        >
                            Learn AI With Tutor
                        </Button>
                    </div> */}

                    <div className="flex flex-wrap gap-6 mt-8 text-sm text-muted-foreground">
                        {[
                            "Free to start",
                            "Project-based learning",
                            "Certificate on completion",
                        ].map((item, i) => (
                            <span key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= LEARNING PATHS ================= */}
            {/* <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose your path and progress from fundamentals to advanced topics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-md dark:hover:shadow-[#1e3a8a]/10 transition">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-[#1e3a8a]/10 flex items-center justify-center">
                      <path.icon className="h-6 w-6 text-[#1e3a8a] dark:text-blue-400" />
                    </div>
                    <Badge className={getLevelColor(path.level)}>
                      {path.level}
                    </Badge>
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    {path.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {path.topics.slice(0, 3).map((topic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        {topic}
                      </Badge>
                    ))}
                    {path.topics.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        +{path.topics.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {path.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {path.students}
                    </span>
                  </div>

                  <Button variant="outline" className="w-full hover:bg-[#1e3a8a]/10 hover:text-[#1e3a8a] border-border">
                    Start Path
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

            <section className="py-28 bg-gray-50 dark:bg-background border-y border-border">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        AI Course Pricing Plans
                    </h2>

                    <p className="text-muted-foreground text-lg">
                        Choose the plan that fits your learning stage and goals.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan._id}
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={cardVariants}
                                whileHover={{ scale: 1.05 }}
                                className={`relative rounded-2xl shadow-xl p-8 border transition
            bg-white dark:bg-card text-foreground
            ${plan.isPopular ? "border-indigo-600" : "border-border"}
          `}
                            >
                                <div className="flex flex-col justify-between h-full ">
                                    <div>
                                        {plan.isPopular && (
                                            <span
                                                className="absolute -top-3 left-1/2 -translate-x-1/2
                                        bg-indigo-600 text-white text-sm px-4 py-1 rounded-full"
                                            >
                                                Most Popular
                                            </span>
                                        )}

                                        {/* Title */}
                                        {/* Title */}
                                        <h2 className="text-2xl font-bold">
                                            {plan.title}
                                        </h2>

                                        <p className="text-indigo-600 font-medium capitalize">
                                            {plan.level} level
                                        </p>

                                        {/* Price */}
                                        <div className="mt-6 flex items-end justify-center gap-2">
                                            <span className="line-through text-muted-foreground">
                                                ${plan.originalPrice}
                                            </span>

                                            <span className="text-4xl font-bold">
                                                ${plan.discountedPrice}
                                            </span>

                                            <span className="text-sm text-muted-foreground">
                                                {plan.currency}
                                            </span>
                                        </div>

                                        {/* Features */}
                                        <div className="mt-6 text-left">
                                            <h4 className="font-semibold mb-2">
                                                What you’ll get:
                                            </h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {plan.features.map(
                                                    (
                                                        feature: string,
                                                        i: number,
                                                    ) => (
                                                        <li
                                                            key={i}
                                                            className="flex gap-2"
                                                        >
                                                            <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5" />
                                                            <span>
                                                                {feature}
                                                            </span>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>

                                        {/* Best For */}
                                        <p className="mt-4 text-left text-sm text-muted-foreground">
                                            <strong className="text-foreground">
                                                Best for:
                                            </strong>{" "}
                                            {plan.bestFor.join(", ")}
                                        </p>
                                    </div>

                                    {/* CTA */}
                                    <button
                                        onClick={() => handleEnrollClick(plan)}
                                        disabled={purchasedPackageIds.includes(
                                            plan._id,
                                        )}
                                        className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
                                            purchasedPackageIds.includes(
                                                plan._id,
                                            )
                                                ? "bg-green-600 text-white cursor-not-allowed opacity-80"
                                                : plan.isPopular
                                                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                                                  : "bg-gray-900 text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        {purchasedPackageIds.includes(plan._id)
                                            ? "Subscribed"
                                            : "Buy Package"}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FEATURED COURSES ================= */}
            <section className="py-28 bg-muted/30 border-y border-border">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">
                                Featured Courses
                            </h2>
                            <p className="text-muted-foreground">
                                Hand-picked courses from top AI instructors.
                            </p>
                        </div>
                        <Button variant="outline" className="border-border">
                            View All Courses
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCourses.map((course, index) => (
                            <Card
                                key={index}
                                className="bg-card border-border hover:shadow-md transition overflow-hidden"
                            >
                                <div className="aspect-video bg-gradient-to-br from-[#1e3a8a]/20 to-teal-500/20 flex items-center justify-center">
                                    <Play className="h-10 w-10 text-[#1e3a8a] dark:text-blue-400" />
                                </div>

                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            className={getLevelColor(
                                                course.level,
                                            )}
                                        >
                                            {course.level}
                                        </Badge>
                                        <span className="flex items-center gap-1 text-sm">
                                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                            {course.rating}
                                        </span>
                                    </div>

                                    <h3 className="font-semibold text-lg">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        By {course.instructor}
                                    </p>

                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>{course.duration}</span>
                                        <span>
                                            {course.students.toLocaleString()}{" "}
                                            students
                                        </span>
                                    </div>

                                    {course.progress > 0 && (
                                        <Progress
                                            value={course.progress}
                                            className="h-1.5 bg-muted"
                                        />
                                    )}

                                    <Button
                                        className="w-full"
                                        variant={
                                            course.progress > 0
                                                ? "default"
                                                : "outline"
                                        }
                                        style={
                                            course.progress > 0
                                                ? { backgroundColor: "#1e3a8a" }
                                                : {}
                                        }
                                    >
                                        {course.progress > 0
                                            ? "Continue Learning"
                                            : "Start Course"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= COMING SOON ================= */}
            <section className="py-24 bg-background border-t border-border">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <Badge className="mb-4 bg-[#1e3a8a] text-white">
                        Coming Soon
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4">
                        Interactive Labs & Certifications
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8">
                        Interactive coding labs, AI sandbox environments, and
                        industry-recognized certifications are launching soon.
                    </p>
                    <Link href="/newsletter">
                        <Button
                            size="lg"
                            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white"
                        >
                            Notify Me
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-xl p-6">
                    <DialogHeader>
                        <DialogTitle>Course Registration</DialogTitle>
                    </DialogHeader>

                    <form className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input placeholder="Enter your name" />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label>Phone Number</Label>
                            <Input
                                type="tel"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {/* Course Select */}
                        <div className="space-y-1">
                            <Label>Select Course</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">
                                        Beginner Level
                                    </SelectItem>
                                    <SelectItem value="intermediate">
                                        Intermediate Level
                                    </SelectItem>
                                    <SelectItem value="pro">
                                        Pro Level
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Payment Option */}
                        <div className="space-y-1">
                            <Label>Payment Option</Label>

                            <Select
                                onValueChange={(value) =>
                                    setPaymentMethod(value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="deod-usdt">
                                        Deod / USDT
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {paymentMethod === "deod-usdt" && (
                            <div className="mt-4 border border-dashed border-indigo-500 rounded-xl p-4 bg-indigo-50 dark:bg-indigo-950/30">
                                <p className="text-sm text-muted-foreground mb-2">
                                    🎁 You received a coupon code
                                </p>

                                <div className="flex items-center justify-between bg-white dark:bg-card border rounded-lg px-4 py-3">
                                    <span className="text-lg font-bold tracking-widest text-indigo-600">
                                        DEOD50
                                    </span>

                                    <Badge className="bg-indigo-600 text-white">
                                        50% OFF
                                    </Badge>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <Button
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                                        onClick={() =>
                                            alert("Coupon redeemed!")
                                        }
                                    >
                                        Redeem Now
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() =>
                                            alert("You can redeem later")
                                        }
                                    >
                                        Redeem Later
                                    </Button>
                                </div>

                                <p className="text-xs text-muted-foreground mt-2">
                                    You can use this coupon now or later during
                                    payment.
                                </p>
                            </div>
                        )}

                        {/* Submit */}
                        <Button className="w-full bg-[#1e3a8a] text-white mt-4">
                            Register Now
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={enrollOpen} onOpenChange={setEnrollOpen}>
                <DialogContent className="max-w-lg p-6">
                    {!selectedPlan ? (
                        <div className="text-center text-muted-foreground">
                            Loading plan...
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4 sm:gap-2">
                                <div className="pr-2">
                                    <h2 className="text-xl sm:text-2xl font-bold break-words">
                                        {selectedPlan.title}
                                    </h2>
                                    <p className="text-indigo-600 capitalize">
                                        {selectedPlan.level} level
                                    </p>
                                </div>

                                {/* <Button
                                    variant="outline"
                                    size="sm"
                                    className="shrink-0 w-fit bg-indigo-600 text-white"
                                    onClick={connectMetaMask}
                                >
                                    {walletAddress
                                        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                                        : "Connect Wallet"}
                                </Button> */}
                            </div>

                            <div className="flex items-end gap-3 mb-2">
                                <span className="line-through text-muted-foreground text-lg sm:text-xl">
                                    ${selectedPlan.originalPrice}
                                </span>
                                <span className="text-3xl sm:text-4xl font-bold">
                                    ${selectedPlan.discountedPrice}
                                </span>
                            </div>

                            {usdToInrRate && (
                                <>
                                    <p className="text-sm text-muted-foreground break-words">
                                        1 USD ≈{" "}
                                        <span className="font-bold">
                                            {usdToInrRate.toFixed(2)} INR
                                        </span>
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-6 break-words">
                                        {selectedPlan.discountedPrice} USD ≈{" "}
                                        <span className="font-bold">
                                            {(
                                                selectedPlan.discountedPrice *
                                                usdToInrRate
                                            ).toFixed(2)}{" "}
                                            INR
                                        </span>
                                    </p>
                                </>
                            )}

                            <p className="text-sm text-muted-foreground mb-6">
                                The amount shown may vary based on the current
                                exchange rate of USD to INR.
                            </p>

                            <div className="flex flex-col gap-3 mb-6">
                                {/* <Badge className="whitespace-normal h-auto py-2 text-left leading-relaxed">
                                    <span className="font-bold mr-1">
                                        
                                    </span>{" "}
                                    You will be staking 50% of the total amount
                                    of package, which you can claim from your
                                    dashboard later.
                                </Badge> */}

                                {/* <Badge className="whitespace-normal h-auto py-2 text-left leading-relaxed bg-yellow-600 hover:bg-yellow-700 text-white">
                                    <span className="font-bold mr-1">
                                        Pro Tip:
                                    </span>{" "}
                                    Please connect your registered wallet
                                </Badge> */}
                            </div>

                            <Button
                                className="w-full bg-[#1e3a8a] text-white"
                                disabled={couponLoading}
                                onClick={() =>
                                    handleInitiatePayment(
                                        selectedPlan._id,
                                        selectedPlan.discountedPrice,
                                    )
                                }
                            >
                                {couponLoading
                                    ? "Generating Coupon..."
                                    : "Buy Now"}
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={couponOpen} onOpenChange={setCouponOpen}>
                <DialogContent className="max-w-md p-6">
                    {couponData ? (
                        <div className="space-y-6 text-center">
                            <h2 className="text-2xl font-bold">
                                🎉 Coupon Generated
                            </h2>

                            <p className="text-muted-foreground">
                                Use this coupon during payment
                            </p>

                            <div
                                className="flex items-center justify-between gap-3
          border border-dashed border-indigo-600 rounded-xl
          px-4 py-3 bg-indigo-50 dark:bg-indigo-950/30"
                            >
                                <span className="text-xl font-bold tracking-widest text-indigo-600">
                                    {couponData.code}
                                </span>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            couponData.code,
                                        )
                                    }
                                >
                                    <Copy className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>Amount: ${couponData.usdAmount}</p>
                                <p>
                                    Wallet:{" "}
                                    {couponData.senderWalletAddress.slice(0, 6)}
                                    …
                                </p>
                            </div>

                            <a
                                href={`${CLAIM_URL}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="w-full bg-[#1e3a8a] text-white">
                                    Claim Coupon
                                </Button>
                            </a>
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">
                            No coupon available
                        </p>
                    )}

                    {couponError && (
                        <p className="text-sm text-red-500 text-center mt-2">
                            {couponError}
                        </p>
                    )}
                </DialogContent>
            </Dialog>


            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
    <DialogContent className="max-w-md p-6 text-center">
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-green-600">
                🎉 Payment Successful!
            </h2>

            <p className="text-muted-foreground">
                You have successfully purchased:
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 border rounded-xl p-4">
                <p className="font-semibold text-lg">
                    {successData?.packageName}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                    Your Access Code:
                </p>

                <div className="mt-2 text-xl font-bold tracking-widest text-green-600">
                    {successData?.code}
                </div>
            </div>

             <div className="flex flex-col gap-3 mt-4">
                <Button
                    className="w-full bg-[#1e3a8a] text-white"
                    onClick={() => setLocation("/profile")}
                >
                    Go to Profile 🚀
                </Button>

                {/* <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSuccessOpen(false)}
                >
                    Stay Here
                </Button> */}
            </div>

             <p className="text-xs text-muted-foreground">
                You can access your package anytime from your profile.
            </p>
        </div>
    </DialogContent>
</Dialog>
            <Footer />
        </div>
    );
}
