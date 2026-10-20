import { createFileRoute } from "@tanstack/react-router";
import { HowItWorks } from "@/components/site/HowItWorks";
export const Route = createFileRoute("/sell")({
  head: () => ({ meta: [{ title: "Sell Your Car | Smart Carz Guntur" }, { name: "description", content: "Sell Your Car — Smart Carz Guntur, used car buying and selling in Guntur." }, { property: "og:title", content: "Sell Your Car | Smart Carz Guntur" }, { property: "og:description", content: "Sell Your Car — Smart Carz Guntur." }] }),
  component: () => (<div className="pt-24"><HowItWorks /></div>),
});
