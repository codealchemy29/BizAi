import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Mail, ArrowRight } from "lucide-react";
import { SiX, SiGithub, SiLinkedin, SiYoutube } from "react-icons/si";
import { Link } from "wouter";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
  ],
  tools: [
    { label: "AI Chatbot", href: "/playground?tool=chatbot" },
    { label: "Text Generator", href: "/playground?tool=text" },
    { label: "Code Assistant", href: "/playground?tool=code" },
    { label: "Image Analyzer", href: "/playground?tool=image" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: SiX, href: "https://twitter.com", label: "Twitter" },
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiYoutube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // todo: remove mock functionality
      console.log("Subscribe:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-lg bg-primary/5 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get the latest AI tutorials and tools delivered to your inbox
              </p>
            </div>
            {subscribed ? (
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full gap-2 sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    data-testid="input-newsletter-email"
                  />
                </div>
                <Button type="submit" className="gap-1" data-testid="button-subscribe">
                  Subscribe
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
      <div className="flex flex-col items-start">

  <Link
    href="/"
    className="flex items-center mb-4"
    data-testid="footer-link-home"
  >
    {/* Light Theme Logo */}
    <img
      src="/bizaiskilllogo.png"
      alt="BizAiSkill Logo"
      className="h-[70px] md:h-[100px] w-auto object-contain dark:hidden"
    />

    {/* Dark Theme Logo */}
    <img
      src="/bizaiskilllogo.png"
      alt="BizAiSkill Logo"
      className="hidden h-[70px] md:h-[85px] w-auto object-contain dark:block"
    />
  </Link>

  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
    {/* The AI ecosystem where builders learn, create, and earn.  */}
    Empowering the next generation of AI creators.
  </p>

</div>


          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Resources</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Tools</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground">
          <p>2024 BizAiSkill. All rights reserved.</p>
          <p>Made with AI, for AI learners</p>
        </div>
      </div>
    </footer>
  );
}
