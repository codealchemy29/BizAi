import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { User, LogOut } from "lucide-react";

const navLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/tools", label: "AI Tools" },
  { href: "/playground", label: "Playground" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ logged: true });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
         <Link to="/" className="flex items-center gap-2">
  <div className="relative flex items-center justify-center">

    <img
      src="/bizaiskilllogo.png"
      alt="AI Academy Logo"
      className="h-[115px] md:h-[163px] w-auto object-contain dark:hidden"
    />

    <img
      src="/bizaiskilllogo.png"
      alt="AI Academy Logo"
      className="hidden h-[115px] md:h-[163px] w-auto object-contain dark:block"
    />

  </div>
</Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant={location === link.href ? "secondary" : "ghost"}>
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/profile">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>

                <Button variant="ghost" size="icon" onClick={logout}>
                  <LogOut className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button>Login</Button>
              </Link>
            )}

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
