import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMe } from "@/utils/auth";
import { API_BASE_URL } from "@/config/api";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Navbar } from "@/components/Navbar";
import { toast } from "@/hooks/use-toast";

interface IntroAIType {
    _id: string;
    userId: string;
    usdAmount: number;
    deodAmount: number;
    senderWalletAddress: string;
    transactionHash: string;
    date: string;
    time: string;
    weekType: string;
    isEnrolled: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default function Profile() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [, setLocation] = useLocation();
    const [slotModalOpen, setSlotModalOpen] = useState(false);
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookedSlot, setBookedSlot] = useState<{
        date: string;
        time: string;
    } | null>(null);
    const [redeemingId, setRedeemingId] = useState<string | null>(null);
    const [selectedPlanID, setSelectedPlanID] = useState<string | null>(null);
    const [mySlots, setMySlots] = useState<any[]>([]);
    const [isReschedulingIntroAI, setIsReschedulingIntroAI] = useState(false);

    useEffect(() => {
        getMe().then((data) => {
            if (!data) {
                setLocation("/login");
            } else {
                setUser(data);
            }
        });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(`${API_BASE_URL}/api/v1/coupons/my-coupons`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((r) => r.json())
            .then((j) => {
                const active = j.data || [];
                setCoupons(active);
            });
    }, []);

    const bookSlot = async () => {
        try {
            setBookingLoading(true);

            const token = localStorage.getItem("token");

            const payload = {
                couponId: selectedCoupon._id,
                packageId: selectedPlanID,
                date: selectedDate,
                time: selectedTime,
            };

            // console.log("payload =>>", payload);

            const res = await fetch(`${API_BASE_URL}/api/v1/slots/book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();
            // console.log(json);
            if (json.status === 200) {
                toast({ title: "Success", description: json.message });
            } else {
                toast({
                    title: "Error",
                    description: json.message,
                    variant: "destructive",
                });
            }
            if (!res.ok) throw new Error(json.message);

            // ✅ Mark coupon as booked
            setCoupons((prev) =>
                prev.map((c) =>
                    c._id === selectedCoupon._id
                        ? { ...c, slotBooked: true }
                        : c,
                ),
            );

            // Optional: store booked slot info
            setBookedSlot({
                date: selectedDate!,
                time: selectedTime!,
            });

            // ✅ Close modal after short delay
            setTimeout(() => {
                setSlotModalOpen(false);
                setSelectedDate(null);
                setSelectedTime(null);
            }, 800);
        } catch (err) {
            console.error(err);
            alert("Booking failed");
        } finally {
            setBookingLoading(false);
            fetchMySlots();
        }
    };

    const [plans, setPlans] = useState<any[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [introAI, setIntroAI] = useState<IntroAIType | null>(null);
    const [loadingIntroAI, setLoadingIntroAI] = useState(true);
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
    // console.log("plans =>>", plans);

    const redeemCoupon = async (coupon: any) => {
        try {
            setRedeemingId(coupon._id);

            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/api/v1/coupons/redeem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ code: coupon.code }),
            });

            const json = await res.json();

            if (json.status === 200) {
                toast({ title: "Success", description: json.message });
            } else {
                toast({
                    title: "Error",
                    description: json.message,
                    variant: "destructive",
                });
            }

            // update local state → turn card green
            setCoupons((prev: any[]) =>
                prev.map((c) =>
                    c._id === coupon._id ? { ...c, isRedeemed: true } : c,
                ),
            );
        } catch (err) {
            console.error(err);
        } finally {
            setRedeemingId(null);
        }
    };

    const fetchMySlots = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_BASE_URL}/api/v1/slots/my-slots`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await res.json();
        setMySlots(json.data || []);
        // console.log("my-slots =>>", json);
    };

    const fetchIntroAI = async () => {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/api/v1/intro-ai`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();
        setIntroAI(result.data);
    };

    console.log("introAI =>>", introAI);

    useEffect(() => {
        fetchPackages();
        fetchMySlots();
        fetchIntroAI();
    }, []);

    const openSlotModal = async (coupon: any) => {
        setIsReschedulingIntroAI(false);
        setSelectedCoupon(coupon);
        setSlotModalOpen(true);

        const res = await fetch(`${API_BASE_URL}/api/v1/slots`);
        const json = await res.json();
        setSlots(json.data || []);
    };

    if (!user) return null;

    const handleBookSlotButton = (c: any, planId: string) => {
        openSlotModal(c);
        setSelectedPlanID(planId);
    };

    const openIntroAIRescheduleModal = async () => {
        setIsReschedulingIntroAI(true);
        setSlotModalOpen(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/intro-ai/slots`);
            const json = await res.json();
            setSlots(json.data || []);
        } catch (err) {
            console.error(err);
            toast({
                title: "Error",
                description: "Failed to fetch slots",
                variant: "destructive",
            });
        }
    };

    const confirmIntroAIReschedule = async () => {
        if (!introAI || !introAI._id) return;
        setBookingLoading(true);
        try {
            const token = localStorage.getItem("token");
            // Find weekType
            const selectedSlotObj = slots.find((s) => s.date === selectedDate);
            const weekType = selectedSlotObj?.weekType;

            const payload = {
                date: selectedDate,
                time: selectedTime,
                weekType: weekType,
            };

            const res = await fetch(
                `${API_BASE_URL}/api/v1/intro-ai/${introAI._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                },
            );
            const json = await res.json();
            if (res.ok) {
                toast({ title: "Success", description: json.message });
                fetchIntroAI(); // Refetch to be sure
                setSlotModalOpen(false);
                setSelectedDate(null);
                setSelectedTime(null);
            } else {
                toast({
                    title: "Error",
                    description: json.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setBookingLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background py-12 px-6">
                <div className="max-w-6xl mx-auto space-y-10">
                    {/* ===== HEADER ===== */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                Welcome, {user.name}
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Manage your coupons and session bookings
                            </p>
                        </div>

                        <Button
                            className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl px-6"
                            onClick={() => setLocation("/")}
                        >
                            Go Home
                        </Button>
                    </div>

                    {/* ===== INTRO AI WORKSHOP SECTION ===== */}
                    {introAI !== null && (
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">
                                Workshops
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="border rounded-2xl p-6 bg-background shadow-sm hover:shadow-lg transition-all duration-200">
                                    {/* TOP */}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                                Workshop Name
                                            </p>
                                            <p className="text-2xl font-bold tracking-widest text-indigo-600 mt-2">
                                                {"Introduction to AI"}
                                            </p>
                                        </div>
                                        {/* STATUS BADGE */}
                                        <div>
                                            <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t bg-emerald-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
  <div className="flex items-center justify-between gap-2 mb-3">
    <div className="flex items-center gap-2">
      <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      <p className="text-sm font-semibold text-emerald-700">
        Session Scheduled
      </p>
    </div>
  </div>

  <div className="bg-white/60 p-3 rounded-xl border border-emerald-100 space-y-2">
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground text-xs uppercase font-medium">
        Date
      </span>
      <span className="font-semibold text-foreground">
        2026-02-18
      </span>
    </div>

    <div className="h-px bg-emerald-100/50" />

    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground text-xs uppercase font-medium">
        Time
      </span>
      <span className="font-semibold text-foreground">
       1:00 PM - 02:00 PM
      </span>
    </div>
  </div>
</div>

                                    {/* ACTION AREA */}
                                    {/* <Button
                                        size="sm"
                                        disabled={false}
                                        onClick={openIntroAIRescheduleModal}
                                        className="w-full mt-4 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl"
                                    >
                                        Reschedule
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== COUPONS SECTION ===== */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Courses</h2>

                        {coupons.length === 0 && (
                            <div className="border rounded-xl p-6 text-center bg-background shadow-sm">
                                <p className="text-muted-foreground">
                                    You don't have any coupons yet.
                                </p>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coupons.map((c: any) => {
                                const plan = plans.find(
                                    (p: any) => p._id === c.packageId,
                                );
                                const slot = mySlots.find(
                                    (s: any) => s.packageId === c.packageId,
                                );
                                return (
                                    <div
                                        key={c._id}
                                        className="border rounded-2xl p-6 bg-background shadow-sm hover:shadow-lg transition-all duration-200"
                                    >
                                        {/* TOP */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                                    Coupon Code
                                                </p>

                                                <p className="text-2xl font-bold tracking-widest text-indigo-600 mt-2">
                                                    {c.code}
                                                </p>

                                                {/* PACKAGE DETAILS */}
                                                {plan && (
                                                    <div className="mt-4 pt-4 border-t">
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {plan.title}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                                            {plan.description}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* SLOT DETAILS */}
                                            </div>

                                            {/* STATUS BADGE */}
                                            <div>
                                                {c.slotBooked ? (
                                                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium">
                                                        Booked
                                                    </span>
                                                ) : c.isRedeemed ? (
                                                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                                                        Redeemed
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium">
                                                        Active
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {slot && (
                                            <div className="mt-4 pt-4 border-t bg-emerald-50/50 -mx-6 -mb-6 p-6 rounded-b-2xl">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                    <p className="text-sm font-semibold text-emerald-700">
                                                        Session Scheduled
                                                    </p>
                                                </div>
                                                <div className="bg-white/60 p-3 rounded-xl border border-emerald-100 space-y-2">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-muted-foreground text-xs uppercase font-medium">
                                                            Date
                                                        </span>
                                                        <span className="font-semibold text-foreground">
                                                            {slot.date}
                                                        </span>
                                                    </div>
                                                    <div className="h-px bg-emerald-100/50" />
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-muted-foreground text-xs uppercase font-medium">
                                                            Time
                                                        </span>
                                                        <span className="font-semibold text-foreground">
                                                            {slot.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ACTION AREA */}
                                        {!slot && (
                                            <div className="mt-6">
                                                {!c.slotBooked &&
                                                    c.isRedeemed && (
                                                        <Button
                                                            size="sm"
                                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                                                            onClick={() =>
                                                                handleBookSlotButton(
                                                                    c,
                                                                    plan._id,
                                                                )
                                                            }
                                                        >
                                                            Book Slot
                                                        </Button>
                                                    )}

                                                {!c.slotBooked &&
                                                    !c.isRedeemed && (
                                                        <Button
                                                            size="sm"
                                                            disabled={
                                                                redeemingId ===
                                                                c._id
                                                            }
                                                            onClick={() =>
                                                                redeemCoupon(c)
                                                            }
                                                            className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl"
                                                        >
                                                            {redeemingId ===
                                                            c._id
                                                                ? "Redeeming..."
                                                                : "Redeem"}
                                                        </Button>
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* ===== SLOT MODAL ===== */}
                <Dialog open={slotModalOpen} onOpenChange={setSlotModalOpen}>
                    <DialogContent className="max-w-4xl p-8 rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                {isReschedulingIntroAI
                                    ? "Reschedule Your Workshop"
                                    : "Select Your Session Slot"}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-2">
                            {slots.map((d: any) => (
                                <div
                                    key={d.date}
                                    className="border rounded-xl p-5 bg-muted/30"
                                >
                                    <p className="font-semibold text-lg">
                                        {d.day}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {d.date}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {d.slots.map((t: string) => (
                                            <Button
                                                key={`${d.date}-${t}`}
                                                variant={
                                                    selectedDate === d.date &&
                                                    selectedTime === t
                                                        ? "default"
                                                        : "outline"
                                                }
                                                className="rounded-xl"
                                                onClick={() => {
                                                    setSelectedDate(d.date);
                                                    setSelectedTime(t);
                                                }}
                                            >
                                                {t}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <Button
                                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl mt-4"
                                disabled={
                                    !selectedDate ||
                                    !selectedTime ||
                                    bookingLoading
                                }
                                onClick={
                                    isReschedulingIntroAI
                                        ? confirmIntroAIReschedule
                                        : bookSlot
                                }
                            >
                                {bookingLoading
                                    ? isReschedulingIntroAI
                                        ? "Rescheduling..."
                                        : "Booking..."
                                    : isReschedulingIntroAI
                                      ? "Confirm Reschedule"
                                      : "Confirm Booking"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        // </div>
    );
}
