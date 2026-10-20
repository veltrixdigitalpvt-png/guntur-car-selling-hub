import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_TEL } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/sell", label: "Sell Your Car" },
  { to: "/cars", label: "Cars for Sale" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass py-2" : "py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-gradient font-display text-lg font-extrabold text-primary-foreground shadow-gold">
            SC
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-extrabold tracking-wider">
              SMART CARZ
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.4em] text-gold">
              GUNTUR
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="gold" size="sm" className="hidden rounded-full sm:inline-flex">
            <a href={PHONE_TEL}>
              <Phone /> Call Now
            </a>
          </Button>
          <button
            aria-label="Menu"
            className="glass grid h-10 w-10 place-items-center rounded-xl md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="glass mx-4 mt-3 flex flex-col rounded-2xl p-3 md:hidden animate-in fade-in slide-in-from-top-2">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-medium hover:bg-secondary"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
