import { ClipboardList, Handshake, IndianRupee, SearchCheck } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const steps = [
  { icon: ClipboardList, title: "Share Your Car Details", text: "Fill in the car information and upload photographs." },
  { icon: SearchCheck, title: "Vehicle Evaluation", text: "Our team reviews the vehicle information and contacts you." },
  { icon: IndianRupee, title: "Get Our Best Offer", text: "Receive a personalised price quotation based on the car's condition and market value." },
  { icon: Handshake, title: "Complete the Sale", text: "Complete the required paperwork, ownership transfer process and agreed payment arrangements." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionTitle eyebrow="How it works" title={<>Sell in <span className="text-gold-gradient">4 simple steps</span></>} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 120}>
            <div className="glass card-3d relative h-full overflow-hidden rounded-3xl p-7">
              <span className="absolute -right-2 -top-6 font-display text-8xl font-extrabold text-foreground/5">0{i + 1}</span>
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-primary-foreground shadow-gold">
                <s.icon className="h-7 w-7" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-electric">Step {i + 1}</p>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
