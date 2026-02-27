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
      alt="BizAiSkill Logo"
      className="h-[115px] md:h-[163px] w-auto object-contain dark:hidden"
    />

    {/* <img
      src="/bizaiskilllogo.png"
      alt="BizAiSkill Logo"
      className="hidden h-12 md:h-20 w-auto object-contain dark:hidden"
    />
 */}
  </div>
</Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
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

      {mobileMenuOpen && (
  <div className="md:hidden border-t bg-background px-4 py-3 space-y-2">

    {navLinks.map((link) => (
      <Link key={link.href} to={link.href}>
        <Button
          variant={location === link.href ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={() => setMobileMenuOpen(false)}
        >
          {link.label}
        </Button>
      </Link>
    ))}

    {user ? (
      <>
        <Link to="/profile">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>

        <Button
  variant="ghost"
  className="w-full justify-start rounded-2xl border
             border-red-200 bg-red-50/50
             text-red-600 hover:bg-red-100
             transition-all duration-200"
  onClick={() => {
    logout();
    setMobileMenuOpen(false);
  }}
>
  <LogOut className="mr-3 h-4 w-4" />
  Logout
</Button>
      </>
    ) : (
      <Link to="/login">
        <Button className="w-full">Login</Button>
      </Link>
    )}

  </div>
)}
    </nav>
  );
}
