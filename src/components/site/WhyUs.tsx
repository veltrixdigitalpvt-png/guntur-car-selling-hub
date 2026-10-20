import { FileCheck2, Headset, IndianRupee, MousePointerClick, ScanSearch, Sparkles } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";
import suv from "@/assets/car-suv.jpg";

const items = [
  { icon: ScanSearch, title: "Transparent Car Evaluation", text: "Clear discussion of how your car's condition and details shape the offer." },
  { icon: IndianRupee, title: "Personalised Price Offers", text: "Every quote is prepared for your specific car." },
  { icon: MousePointerClick, title: "Easy Enquiry Process", text: "Fill a short form or simply message us on WhatsApp." },
  { icon: Headset, title: "Friendly Customer Support", text: "Talk to a real person in Guntur who answers your questions." },
  { icon: Sparkles, title: "Convenient Buying & Selling", text: "One place for selling your car or finding your next one." },
  { icon: FileCheck2, title: "Assistance With Documentation", text: "Guidance through paperwork and ownership transfer." },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24">
      <img
        src={suv}
        alt=""
        aria-hidden
        loading="lazy"
        width={1280}
        height={800}
        className="pointer-events-none absolute -right-40 top-10 -z-10 w-[900px] max-w-none opacity-20 animate-float"
      />
      <div className="mx-auto max-w-7xl px-4">
        <SectionTitle eyebrow="Why Smart Carz" title={<>Why choose <span className="text-gold-gradient">Smart Carz Guntur?</span></>} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="glass card-3d group flex h-full gap-4 rounded-3xl p-6">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-electric/40 text-electric transition-colors group-hover:bg-electric group-hover:text-accent-foreground">
                  <it.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{it.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
