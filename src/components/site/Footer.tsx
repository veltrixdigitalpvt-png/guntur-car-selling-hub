import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL, waLink } from "@/lib/site";
import { defaultSettings, settingsQuery } from "@/lib/data";

export function Footer() {
  const { data } = useQuery(settingsQuery);
  const s = data ?? defaultSettings;
  return (
    <footer className="relative mt-24 border-t border-border bg-charcoal/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-extrabold text-gold-gradient">SMART CARZ GUNTUR</p>
          <p className="mt-3 max-w-md text-muted-foreground">
            Used car buying & selling in Guntur, Andhra Pradesh. {s.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            {s.instagram_url && (
              <a aria-label="Instagram" href={s.instagram_url} target="_blank" rel="noreferrer" className="glass grid h-10 w-10 place-items-center rounded-xl hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {s.facebook_url && (
              <a aria-label="Facebook" href={s.facebook_url} target="_blank" rel="noreferrer" className="glass grid h-10 w-10 place-items-center rounded-xl hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Explore</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/sell" className="hover:text-gold">Sell Your Car</Link></li>
            <li><Link to="/cars" className="hover:text-gold">Cars for Sale</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-gold">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">Contact</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href={PHONE_TEL} className="flex items-center gap-2 hover:text-gold"><Phone className="h-4 w-4" /> {PHONE_DISPLAY}</a></li>
            <li><a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-gold">WhatsApp us</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {s.address}</li>
            <li className="whitespace-pre-line">{s.business_hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SMART CARZ GUNTUR. All rights reserved.
      </div>
    </footer>
  );
}
