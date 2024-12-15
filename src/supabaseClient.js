import { createClient } from '@supabase/supabase-js'

let supabaseUrl
let supabaseAnonKey

try {
  const auth = require('./auth.json')
  supabaseUrl = auth.supabase_url
  supabaseAnonKey = auth.supabase_key
} catch (e) {
  supabaseUrl = process.env.SUPABASE_URL
  supabaseAnonKey = process.env.SUPABASE_KEY
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials not found in either auth.json or environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)