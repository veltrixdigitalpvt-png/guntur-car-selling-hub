import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";
import { reviewsQuery } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { waLink } from "@/lib/site";

export function Reviews() {
  const { data = [] } = useQuery(reviewsQuery);
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <SectionTitle eyebrow="Customer reviews" title={<>What our <span className="text-gold-gradient">customers say</span></>} />
      {data.length === 0 ? (
        <Reveal className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
          <div className="mb-4 flex justify-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-6 w-6 fill-current" />)}
          </div>
          <p className="text-lg font-semibold">Genuine reviews coming soon</p>
          <p className="mt-2 text-sm text-muted-foreground">
            We only publish real feedback from our customers. Sold or bought a car with us? We'd love to hear from you.
          </p>
          <Button asChild variant="glass" className="mt-6 rounded-full">
            <a href={waLink("Hello Smart Carz Guntur, I'd like to share a review.")} target="_blank" rel="noreferrer">Share your experience</a>
          </Button>
        </Reveal>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {data.map((r, i) => (
            <Reveal key={r.id} delay={i * 100}>
              <figure className="glass card-3d h-full rounded-3xl p-7">
                <Quote className="h-8 w-8 text-gold/60" />
                <div className="mt-3 flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className={k < r.rating ? "h-4 w-4 fill-current" : "h-4 w-4 opacity-30"} />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground/90">{r.text}</blockquote>
                <figcaption className="mt-5 font-semibold text-gold">— {r.customer_name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
