import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import suv from "@/assets/car-suv.jpg";
import sedan from "@/assets/car-sedan.jpg";
import hatch from "@/assets/car-hatch.jpg";

export const demoImages = [suv, sedan, hatch];

export type Settings = {
  tagline: string;
  hero_text: string;
  business_hours: string;
  instagram_url: string;
  facebook_url: string;
  address: string;
};

export const defaultSettings: Settings = {
  tagline: "Your Car. Our Best Offer.",
  hero_text:
    "Looking to sell your car in Guntur? Connect with Smart Carz for a simple, convenient and transparent car-selling experience.",
  business_hours: "Mon – Sat: 9:30 AM – 8:00 PM\nSunday: By appointment",
  instagram_url: "",
  facebook_url: "",
  address: "Guntur, Andhra Pradesh",
};

export const settingsQuery = queryOptions({
  queryKey: ["settings"],
  queryFn: async (): Promise<Settings> => {
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
    return data ?? defaultSettings;
  },
  staleTime: 60_000,
});

export const listingsQuery = queryOptions({
  queryKey: ["listings"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .neq("status", "hidden")
      .order("created_at", { ascending: false });
    if (error) throw error;
    const rows = data ?? [];
    const paths = rows.flatMap((r) => r.image_urls);
    const map = new Map<string, string>();
    if (paths.length) {
      const { data: signed } = await supabase.storage
        .from("listing-photos")
        .createSignedUrls(paths, 60 * 60 * 6);
      signed?.forEach((s) => s.path && s.signedUrl && map.set(s.path, s.signedUrl));
    }
    return rows.map((r) => ({
      ...r,
      photos: r.image_urls.map((p) => map.get(p)).filter(Boolean) as string[],
    }));
  },
});

export type Listing = Awaited<ReturnType<NonNullable<typeof listingsQuery.queryFn>>>[number];

export const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  },
});

