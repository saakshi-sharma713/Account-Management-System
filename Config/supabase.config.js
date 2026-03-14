import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import dotenv from "dotenv"
dotenv.config()
export const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SECRET_KEY)
