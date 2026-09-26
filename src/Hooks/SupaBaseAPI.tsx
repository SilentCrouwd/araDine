import { supabase } from "@/lib/supabaseClient";

export async function fetchStandorte() {
  const { data, error } = await supabase
    .from("standorte")
    .select("*, raeume(*)");
  if (error) {
    console.error("Error fetching standorte:", error);
  }

  return data;
}
