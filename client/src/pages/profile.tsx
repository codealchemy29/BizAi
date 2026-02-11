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
import { Footer } from "@/components/Footer";
export default function Profile() {
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponData, setCouponData] = useState<any>(null);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [, setLocation] = useLocation();
  const CLAIM_URL = "http://localhost:5000";
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookedSlot, setBookedSlot] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);

  const authToken = localStorage.getItem("token");

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

      const res = await fetch(`${API_BASE_URL}/api/v1/slots/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          couponId: selectedCoupon._id,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      // ✅ Mark coupon as booked
      setCoupons((prev) =>
        prev.map((c) =>
          c._id === selectedCoupon._id ? { ...c, slotBooked: true } : c,
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
    }
  };

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

      if (!res.ok) throw new Error(json.message);

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

  const openSlotModal = async (coupon: any) => {
    setSelectedCoupon(coupon);
    setSlotModalOpen(true);

    const res = await fetch(`${API_BASE_URL}/api/v1/slots`);
    const json = await res.json();
    setSlots(json.data || []);
  };

  if (!user) return null;

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

      {/* ===== COUPONS SECTION ===== */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">My Coupons</h2>

        {coupons.length === 0 && (
          <div className="border rounded-xl p-6 text-center bg-background shadow-sm">
            <p className="text-muted-foreground">
              You don't have any coupons yet.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((c: any) => (
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

              {/* ACTION AREA */}
              <div className="mt-6">
                {!c.slotBooked && c.isRedeemed && (
                  <Button
                    size="sm"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    onClick={() => openSlotModal(c)}
                  >
                    Book Slot
                  </Button>
                )}

                {!c.slotBooked && !c.isRedeemed && (
                  <Button
                    size="sm"
                    disabled={redeemingId === c._id}
                    onClick={() => redeemCoupon(c)}
                    className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white rounded-xl"
                  >
                    {redeemingId === c._id ? "Redeeming..." : "Redeem"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== SLOT MODAL ===== */}
      <Dialog open={slotModalOpen} onOpenChange={setSlotModalOpen}>
        <DialogContent className="max-w-4xl p-8 rounded-2xl">

          <DialogHeader>
            <DialogTitle className="text-2xl">
              Select Your Session Slot
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
                        selectedDate === d.date && selectedTime === t
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
              disabled={!selectedDate || !selectedTime || bookingLoading}
              onClick={bookSlot}
            >
              {bookingLoading ? "Booking..." : "Confirm Booking"}
            </Button>

          </div>
        </DialogContent>
      </Dialog>

    </div>
  </div>
  <Footer />
  </div> 
);

}
