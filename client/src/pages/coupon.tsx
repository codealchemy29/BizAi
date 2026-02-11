import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API_BASE_URL } from "@/config/api";

export default function CouponRedeem() {
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const CLAIM_URL = "http://localhost:5000";
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const coupon = params.get("coupon");

    if (coupon) {
      setCouponCode(coupon);
    }
  }, []);

 const redeemCopuon = async (code: string) => {
  const token = localStorage.getItem("token");

  const resp = await fetch(`${API_BASE_URL}/api/v1/coupons/redeem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });

  const result = await resp.json();
  console.log(result);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 text-center space-y-6">
          <h1 className="text-2xl font-bold">Redeem Coupon</h1>

          {couponCode ? (
            <>
              <div className="border border-dashed rounded-xl px-4 py-6">
                <p className="text-xs text-muted-foreground">
                  Coupon Code
                </p>
                <p className="text-3xl font-bold tracking-widest text-indigo-600">
                  {couponCode}
                </p>
              </div>

              
                <Button onClick={()=>redeemCopuon(couponCode)} className="w-full bg-[#1e3a8a] text-white">
                 Redeem Now
                </Button>
            </>
          ) : (
            <p className="text-muted-foreground">
              No coupon found
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
