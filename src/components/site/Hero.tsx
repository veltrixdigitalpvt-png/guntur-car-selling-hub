import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import owner from "@/assets/owner-hero.jpg.asset.json";
import { PHONE_SHORT, PHONE_TEL } from "@/lib/site";
import { defaultSettings, settingsQuery } from "@/lib/data";

export function Hero() {
  const { data } = useQuery(settingsQuery);
  const s = data ?? defaultSettings;
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={owner.url}
        alt="Owner of Smart Carz Guntur standing beside a white SUV"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[30%_20%] md:object-[center_25%] md:left-auto"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-16 pt-28 md:items-center md:pb-0">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Guntur · Andhra Pradesh
          </p>
          <h1 className="text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
            SMART CARZ
            <span className="block text-gold-gradient">GUNTUR</span>
          </h1>
          <p className="mt-5 font-display text-2xl font-bold text-electric md:text-3xl">{s.tagline}</p>
          <p className="mt-4 max-w-md text-base text-foreground/80 md:text-lg">{s.hero_text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl" className="animate-glow">
              <Link to="/sell">
                SELL YOUR CAR <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href={PHONE_TEL}>
                <Phone /> CALL NOW — {PHONE_SHORT}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
