import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single client instance safe for use in Server Components and Route Handlers
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
