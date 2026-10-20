import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CarsGallery } from "@/components/site/CarsGallery";
import { WhyUs } from "@/components/site/WhyUs";
import { Reviews } from "@/components/site/Reviews";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Sell Used Car in Guntur | Smart Carz Guntur" }, { name: "description", content: "Sell your used car in Guntur with Smart Carz. Your Car. Our Best Offer. Call +91 77025 74861." }, { property: "og:title", content: "Smart Carz Guntur — Your Car. Our Best Offer." }, { property: "og:description", content: "Used car buying & selling in Guntur, Andhra Pradesh." }] }),
  component: () => (<><Hero /><HowItWorks /><CarsGallery limit={3} /><WhyUs /><Reviews /></>),
});
