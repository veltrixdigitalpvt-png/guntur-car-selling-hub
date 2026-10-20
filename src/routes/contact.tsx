import { createFileRoute } from "@tanstack/react-router";
import { WhyUs } from "@/components/site/WhyUs";
export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact | Smart Carz Guntur" }, { name: "description", content: "Contact — Smart Carz Guntur, used car buying and selling in Guntur." }, { property: "og:title", content: "Contact | Smart Carz Guntur" }, { property: "og:description", content: "Contact — Smart Carz Guntur." }] }),
  component: () => (<div className="pt-24"><WhyUs /></div>),
});
