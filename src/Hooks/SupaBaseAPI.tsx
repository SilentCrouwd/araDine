import { supabase } from "@/lib/supabaseClient";
import type { NeueBewirtung, NeueZusatzleistung } from "@/Types/types";

export async function fetchStandorte() {
  const { data, error } = await supabase
    .from("standorte")
    .select("*, raeume(*)");
  if (error) {
    console.error("Error fetching standorte:", error);
  }
  console.log("Fetched standorte:", data);
  return data;
}

export async function insertBewirtung(
  newRefreshment: NeueBewirtung,
  extraServices: NeueZusatzleistung,
) {
  const { data, error } = await supabase
    .from("bewirtungen")
    .insert(newRefreshment)
    .select("id")
    .single();
  if (error) {
    console.error("Error inserting bewirtung:", error);
    return null;
  }

  const extraRows = Object.entries(extraServices).map(([name, value]) => ({
    bewirtung_id: data.id,
    extra_name: name,
    extra_value: String(value),
  }));

  if (extraRows.length > 0) {
    const { data: extraServiceData, error: extraServiceError } = await supabase
      .from("zusatzleistungen")
      .insert(extraRows) // ganzes Array auf einmal, ein Request
      .select();

    if (extraServiceError) {
      console.error("Error inserting extra services:", extraServiceError);
    }
    console.log("Inserted extra services:", extraServiceData);
  }

  return data;
}
