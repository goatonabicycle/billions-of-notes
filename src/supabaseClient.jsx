import { createClient } from "@supabase/supabase-js";

let supabaseUrl;
let supabaseAnonKey;

try {
	const auth = require("./auth.json");
	supabaseUrl = auth.supabase_url;
	supabaseAnonKey = auth.supabase_key;
} catch (e) {
	supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
}

if (!supabaseUrl || !supabaseAnonKey) {
	console.error(
		"Supabase credentials not found in either auth.json or environment variables",
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
