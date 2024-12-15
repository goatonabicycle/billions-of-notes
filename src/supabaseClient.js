import { createClient } from '@supabase/supabase-js'
import auth from './auth.json'

const supabaseUrl = auth.supabase_url
const supabaseAnonKey = auth.supabase_key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)