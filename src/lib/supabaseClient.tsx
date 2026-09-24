import { createClient } from "@supabase/supabase-js";
import type { Database } from "../Types/supabaseTypes";

export const supabase = createClient<Database>(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_PUBLISHABLE_KEY,
);
