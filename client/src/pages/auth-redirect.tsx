import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AuthRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentToken = params.get("paymentToken");

    const user = localStorage.getItem("bizai_user");

    if (!user) {
      navigate(`/login?redirect=/payment?token=${paymentToken}`);
    } else {
      navigate(`/payment?token=${paymentToken}`);
    }
  }, [navigate]);

  return (
    <p style={{ textAlign: "center", marginTop: 40 }}>
      Redirecting...
    </p>
  );
}
