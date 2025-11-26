import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.error(
		"Supabase credentials not found. Set VITE_SUPABASE_URL and VITE_SUPABASE_KEY in .env",
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
