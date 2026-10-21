import { supabase } from "@/lib/supabaseClient";
import type {
  NeueBewirtung,
  NeuerTeilnehmer,
  NeueZusatzleistung,
  NewBillingInfo,
} from "@/Types/types";

export async function fetchStandorte() {
  const { data, error } = await supabase
    .from("standorte")
    .select("*, raeume(*)");
  if (error) {
    console.error("Error fetching standorte:", error);
  }
  //  console.log("Fetched standorte:", data);
  return data;
}
export async function fetchBewirtungen() {
  const { data: bewirtungen, error } = await supabase
    .from("bewirtungen")
    .select("*");
  if (error) {
    console.error("Error fetching bewirtungen:", error);
  }
  return bewirtungen;
}

export async function fetchExtras() {
  const { data: zusatzleistungen, error } = await supabase
    .from("zusatzleistungen")
    .select("*");

  if (error) {
    console.error(error);
  }
  return zusatzleistungen;
}

export async function insertBewirtung(
  newRefreshment: NeueBewirtung,
  extraServices: NeueZusatzleistung,
  newPax: NeuerTeilnehmer,
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
  const paxRows = newPax.map((pax) => ({
    ...pax,
    bewirtung_id: data.id,
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
  if (paxRows.length > 0) {
    const { data: paxData, error: paxError } = await supabase
      .from("teilnehmer")
      .insert(paxRows)
      .select();
    if (paxError) {
      console.error(paxError);
    }
    console.log(paxData);

    return paxData;
  }

  return data;
}
export async function fetchBewirtungDatumUndStandort(
  currDate: string,
  currLocationId: string,
) {
  const { data, error } = await supabase
    .from("bewirtungen")
    .select("*,zusatzleistungen(*)")
    .eq("standort_id", currLocationId)
    .eq("datum", currDate);
  if (error) {
    console.error(error);
  }

  return data;
}

export async function fetchCurrBewirtung(refreshmentId: string) {
  const { data: BewirtungenMitExtras, error } = await supabase
    .from("bewirtungen")
    .select("*,zusatzleistungen(*)")
    .eq("id", refreshmentId)
    .single();
  if (error) {
    console.error(error);
  }
  return BewirtungenMitExtras;
}

export async function fetchCurrTeilnehmer(bewirtung_id: string) {
  const { data: teilnehmer, error } = await supabase
    .from("teilnehmer")
    .select("*")
    .eq("bewirtung_id", bewirtung_id);

  if (error) {
    console.error(error);
  }

  return teilnehmer;
}

export async function fetchBewirtungenByStandortUndRaum(
  room_id: string,
  date: string,
) {
  const { data: bewirtungen, error } = await supabase
    .from("bewirtungen")
    .select("*")
    .eq("raum_id", room_id)
    .eq("datum", date);
  if (error) {
    console.error(error);
  }
  console.log(bewirtungen);

  return bewirtungen;
}

export async function fetchRefreshmentsByRoomIdAndDate(
  roomId: string,
  currDate: string,
) {
  const { data: refreshment, error } = await supabase
    .from("bewirtungen")
    .select("*")
    .eq("raum_id", roomId)
    .eq("datum", currDate);

  if (error) {
    console.error(error);
  }

  return refreshment;
}
export async function updateRefreshmentStatus(
  newStatus: string,
  currRefreshmentId: string,
) {
  const { data, error } = await supabase
    .from("bewirtungen")
    .update({ status: newStatus })
    .eq("id", currRefreshmentId)
    .select();
  if (error) {
    console.error(error);

    console.log(data);
    return data;
  }
}

export async function upsertActualDelivered(
  billingInfos: NewBillingInfo,
  refreshmentId: string,
) {
  const extraRows = Object.entries(billingInfos).map(([name, value]) => ({
    bewirtung_id: refreshmentId,
    name: name,
    value: String(value),
  }));
  const { data, error } = await supabase
    .from("abrechnungsdetails")
    .upsert(extraRows, { onConflict: "bewirtung_id,name" })
    .select();
  if (error) {
    console.error(error);
  }

  return data;
}
