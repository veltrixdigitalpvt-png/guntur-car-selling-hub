import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Fuel, Gauge, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Reveal, SectionTitle } from "./Reveal";
import { WhatsAppIcon } from "./FloatingContact";
import { demoImages, listingsQuery, type Listing } from "@/lib/data";
import { formatINR, waLink } from "@/lib/site";

const budgets = [
  { label: "Any budget", min: 0, max: Infinity },
  { label: "Under ₹5 L", min: 0, max: 500000 },
  { label: "₹5 L – ₹10 L", min: 500000, max: 1000000 },
  { label: "₹10 L – ₹20 L", min: 1000000, max: 2000000 },
  { label: "Above ₹20 L", min: 2000000, max: Infinity },
];

const selectCls = "h-11 rounded-xl border border-input bg-secondary px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function imgFor(l: Listing, i: number) {
  return l.photos[0] ?? demoImages[i % demoImages.length];
}

export function CarsGallery({ limit, showTitle = true }: { limit?: number; showTitle?: boolean }) {
  const { data = [], isLoading } = useQuery(listingsQuery);
  const [brand, setBrand] = useState("");
  const [budget, setBudget] = useState(0);
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [active, setActive] = useState<{ l: Listing; i: number } | null>(null);

  const brands = useMemo(() => [...new Set(data.map((d) => d.brand))].sort(), [data]);
  const years = useMemo(() => [...new Set(data.map((d) => d.year))].sort((a, b) => b - a), [data]);

  const filtered = data.filter((l) => {
    const b = budgets[budget];
    return (
      (!brand || l.brand === brand) &&
      (!fuel || l.fuel === fuel) &&
      (!year || l.year >= Number(year)) &&
      l.price >= b.min &&
      l.price < b.max
    );
  });
  const shown = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      {showTitle && (
        <SectionTitle
          eyebrow="Inventory"
          title={<>Cars <span className="text-gold-gradient">available for sale</span></>}
          subtitle="Listings marked DEMO are samples only — real inventory will appear here as it is added."
        />
      )}
      {!limit && (
        <div className="glass mb-10 grid grid-cols-2 gap-3 rounded-2xl p-4 md:grid-cols-4">
          <select aria-label="Brand" className={selectCls} value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All brands</option>
            {brands.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select aria-label="Budget" className={selectCls} value={budget} onChange={(e) => setBudget(Number(e.target.value))}>
            {budgets.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
          </select>
          <select aria-label="Fuel" className={selectCls} value={fuel} onChange={(e) => setFuel(e.target.value)}>
            <option value="">All fuel types</option>
            {["Petrol", "Diesel", "CNG", "Electric"].map((f) => <option key={f}>{f}</option>)}
          </select>
          <select aria-label="Year" className={selectCls} value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Any year</option>
            {years.map((y) => <option key={y} value={y}>{y} or newer</option>)}
          </select>
        </div>
      )}
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading cars…</p>
      ) : shown.length === 0 ? (
        <p className="text-center text-muted-foreground">No cars match these filters right now.</p>
      ) : (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((l, i) => (
            <Reveal key={l.id} delay={(i % 3) * 100}>
              <article className="glass card-3d group h-full overflow-hidden rounded-3xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={imgFor(l, i)} alt={`${l.brand} ${l.model}`} loading="lazy" width={1280} height={800} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    {l.is_demo && <span className="rounded-full bg-electric px-3 py-1 text-xs font-bold text-accent-foreground">DEMO</span>}
                    {l.status === "sold" && <span className="rounded-full bg-destructive px-3 py-1 text-xs font-bold text-destructive-foreground">SOLD</span>}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{l.brand} {l.model}</h3>
                  <p className="mt-1 font-display text-2xl font-extrabold text-gold-gradient">{formatINR(l.price)}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-electric" />{l.year}</span>
                    <span className="flex items-center gap-2"><Gauge className="h-4 w-4 text-electric" />{l.km_driven.toLocaleString("en-IN")} km</span>
                    <span className="flex items-center gap-2"><Fuel className="h-4 w-4 text-electric" />{l.fuel}</span>
                    <span className="flex items-center gap-2"><Settings2 className="h-4 w-4 text-electric" />{l.transmission}</span>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    <Button variant="glass" className="rounded-full" onClick={() => setActive({ l, i })}>View Details</Button>
                    <Button asChild variant="whatsapp" className="rounded-full">
                      <a href={waLink(`Hello Smart Carz Guntur, I'm interested in the ${l.year} ${l.brand} ${l.model} listed at ${formatINR(l.price)}.`)} target="_blank" rel="noreferrer">
                        <WhatsAppIcon className="h-4 w-4" /> Enquire
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-2xl">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {active.l.year} {active.l.brand} {active.l.model} {active.l.is_demo && <span className="ml-2 rounded-full bg-electric px-2 py-0.5 text-xs text-accent-foreground">DEMO</span>}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                {(active.l.photos.length ? active.l.photos : [imgFor(active.l, active.i)]).map((src) => (
                  <img key={src} src={src} alt="" className="w-full rounded-xl object-cover" loading="lazy" />
                ))}
              </div>
              <p className="font-display text-3xl font-extrabold text-gold-gradient">{formatINR(active.l.price)}</p>
              <p className="text-sm text-muted-foreground">
                {active.l.km_driven.toLocaleString("en-IN")} km · {active.l.fuel} · {active.l.transmission}
              </p>
              {active.l.description && <p className="whitespace-pre-line">{active.l.description}</p>}
              <Button asChild variant="whatsapp" size="lg" className="rounded-full">
                <a href={waLink(`Hello Smart Carz Guntur, I'm interested in the ${active.l.year} ${active.l.brand} ${active.l.model}.`)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp Enquiry
                </a>
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
