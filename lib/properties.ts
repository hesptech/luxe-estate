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
  label?: string | null;
  type: "SALE" | "RENT";
  collection: string;
  created_at: string;
  featured: boolean;
  // New fields
  slug: string;
  images: string[];
  latitude?: number | null;
  longitude?: number | null;
  description?: string | null;
  amenities?: string[];
  garage?: number;
  agent_name?: string | null;
  agent_image_url?: string | null;
  agent_title?: string | null;
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

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching property by slug:", error.message);
    return null;
  }

  return data as Property;
}

export async function getAllPropertySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("slug");

  if (error) {
    console.error("Error fetching property slugs:", error.message);
    return [];
  }

  return (data ?? []).map((p: { slug: string }) => p.slug).filter(Boolean);
}

export interface SearchFilters {
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  beds?: number;
  baths?: number;
  amenities?: string[];
}

export async function searchProperties(
  filters: SearchFilters,
  page: number = 1,
  pageSize: number = PAGE_SIZE
): Promise<{ data: Property[]; count: number }> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let queryBuilder = supabase
    .from("properties")
    .select("*", { count: "exact" });

  if (filters.query) {
    // Basic illike on title/location
    // Supabase or allows combining ilikes
    queryBuilder = queryBuilder.or(`title.ilike.%${filters.query}%,location.ilike.%${filters.query}%`);
  }

  if (filters.minPrice) {
    queryBuilder = queryBuilder.gte("price", filters.minPrice);
  }
  if (filters.maxPrice) {
    queryBuilder = queryBuilder.lte("price", filters.maxPrice);
  }
  
  if (filters.type && filters.type !== "Any Type" && filters.type !== "All") {
    queryBuilder = queryBuilder.eq("label", filters.type); // assuming 'label' holds property type based on UI
  }

  if (filters.beds && filters.beds > 0) {
    queryBuilder = queryBuilder.gte("beds", filters.beds);
  }
  if (filters.baths && filters.baths > 0) {
    queryBuilder = queryBuilder.gte("baths", filters.baths);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    queryBuilder = queryBuilder.contains("amenities", filters.amenities);
  }

  const { data, error, count } = await queryBuilder
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error searching properties:", error.message);
    return { data: [], count: 0 };
  }

  return { data: (data as Property[]) ?? [], count: count ?? 0 };
}
