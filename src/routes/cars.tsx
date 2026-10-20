import { createFileRoute } from "@tanstack/react-router";
import { CarsGallery } from "@/components/site/CarsGallery";
export const Route = createFileRoute("/cars")({
  head: () => ({ meta: [{ title: "Cars for Sale | Smart Carz Guntur" }, { name: "description", content: "Cars for Sale — Smart Carz Guntur, used car buying and selling in Guntur." }, { property: "og:title", content: "Cars for Sale | Smart Carz Guntur" }, { property: "og:description", content: "Cars for Sale — Smart Carz Guntur." }] }),
  component: () => (<div className="pt-24"><CarsGallery /></div>),
});
