import { supabase } from "./supabase";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  area_sq_m: number;
  image_url: string;
  image_alt: string;
  label?: string | null;
  type: "SALE" | "RENT";
  collection: string;
  created_at: string;
  featured: boolean;
}

const PAGE_SIZE = 6;

export async function getNewInMarketProperties(
  page: number = 1,
  pageSize: number = PAGE_SIZE
): Promise<{ data: Property[]; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("properties")
    .select("*", { count: "exact" })
    .eq("collection", "new_in_market")
    .order("created_at", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching new in market properties:", error.message);
    return { data: [], count: 0 };
  }

  return { data: (data as Property[]) ?? [], count: count ?? 0 };
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching featured properties:", error.message);
    return [];
  }

  return (data as Property[]) ?? [];
}
