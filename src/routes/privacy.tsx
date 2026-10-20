import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy | Smart Carz Guntur" }, { name: "description", content: "Privacy Policy — Smart Carz Guntur, used car buying and selling in Guntur." }, { property: "og:title", content: "Privacy Policy | Smart Carz Guntur" }, { property: "og:description", content: "Privacy Policy — Smart Carz Guntur." }] }),
  component: () => (<div className="pt-24"><p className="mx-auto max-w-3xl px-4 py-16 text-muted-foreground">We collect only the details you submit (name, mobile, car details, photos) to respond to your enquiry. We do not sell your data. Contact +91 77025 74861 to request deletion.</p></div>),
});
