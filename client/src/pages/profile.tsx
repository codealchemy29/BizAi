import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMe } from "@/utils/auth";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    getMe().then((data) => {
      if (!data) {
        setLocation("/login");
      } else {
        setUser(data);
      }
    });
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Your Profile</h1>

          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <Button
            className="w-full bg-[#1e3a8a] text-white"
            onClick={() => setLocation("/")}
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
