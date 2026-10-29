import { supabase } from "@/lib/supabaseClient";
import type {
  NewRefreshment,
  NewParticipant,
  NewAdditionalService,
  BillingDetailInsert,
} from "@/types/types";

export async function fetchLocations() {
  const { data, error } = await supabase
    .from("locations")
    .select("*, rooms(*)");
  if (error) {
    console.error("Error fetching locations:", error);
  }
  //  console.log("Fetched locations:", data);
  return data;
}
export async function fetchRefreshments() {
  const { data: refreshments, error } = await supabase
    .from("refreshments")
    .select("*");
  if (error) {
    console.error("Error fetching refreshments:", error);
  }
  return refreshments;
}

export async function fetchAdditionalServices() {
  const { data: additional_services, error } = await supabase
    .from("additional_services")
    .select("*");

  if (error) {
    console.error(error);
  }
  return additional_services;
}

export async function insertRefreshment(
  newRefreshment: NewRefreshment,
  extraServices: NewAdditionalService,
  newPax: NewParticipant,
) {
  const { data, error } = await supabase
    .from("refreshments")
    .insert(newRefreshment)
    .select("id")
    .single();
  if (error) {
    console.error("Error inserting refreshment:", error);
    return null;
  }

  const extraRows = Object.entries(extraServices).map(([name, value]) => ({
    refreshment_id: data.id,
    service_name: name,
    service_value: String(value),
  }));
  const paxRows = newPax.map((pax) => ({
    ...pax,
    refreshment_id: data.id,
  }));

  if (extraRows.length > 0) {
    const { data: extraServiceData, error: extraServiceError } = await supabase
      .from("additional_services")
      .insert(extraRows) // ganzes Array auf einmal, ein Request
      .select();

    if (extraServiceError) {
      console.error("Error inserting extra services:", extraServiceError);
    }
    console.log("Inserted extra services:", extraServiceData);
  }
  if (paxRows.length > 0) {
    const { data: paxData, error: paxError } = await supabase
      .from("participants")
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
export async function fetchRefreshmentsByDateAndLocation(
  currDate: string,
  currLocationId: string,
) {
  const { data, error } = await supabase
    .from("refreshments")
    .select("*,additional_services(*)")
    .eq("location_id", currLocationId)
    .eq("date", currDate);
  if (error) {
    console.error(error);
  }

  return data;
}

export async function fetchRefreshmentById(refreshmentId: string) {
  const { data: refreshmentWithAdditionalServices, error } = await supabase
    .from("refreshments")
    .select("*,additional_services(*)")
    .eq("id", refreshmentId)
    .single();
  if (error) {
    console.error(error);
  }
  return refreshmentWithAdditionalServices;
}

export async function fetchParticipantsByRefreshmentId(refreshmentId: string) {
  const { data: participants, error } = await supabase
    .from("participants")
    .select("*")
    .eq("refreshment_id", refreshmentId);

  if (error) {
    console.error(error);
  }

  return participants;
}

export async function fetchRefreshmentsByRoomAndDate(
  roomId: string,
  date: string,
) {
  const { data: refreshments, error } = await supabase
    .from("refreshments")
    .select("*")
    .eq("room_id", roomId)
    .eq("date", date);
  if (error) {
    console.error(error);
  }
  return refreshments;
}

export async function fetchBillingDetails(refreshmentId: string) {
  const { data: billing_details, error } = await supabase
    .from("billing_details")
    .select("*")
    .eq("refreshment_id", refreshmentId);

  if (error) {
    console.error(error);
  }
  return billing_details;
}

export async function updateRefreshmentStatus(
  newStatus: string,
  currRefreshmentId: string,
) {
  const { data, error } = await supabase
    .from("refreshments")
    .update({ status: newStatus })
    .eq("id", currRefreshmentId)
    .select();
  if (error) {
    console.error(error);

    console.log(data);
    return data;
  }
}

export async function upsertBillingDetails(
  billingInfos: Record<string, FormDataEntryValue>,
  refreshmentId: string,
) {
  const billingRows: BillingDetailInsert[] = Object.entries(billingInfos).map(
    ([name, value]) => ({
      refreshment_id: refreshmentId,
      billing_detail_name: name,
      billing_detail_value: String(value),
    }),
  );
  const { data, error } = await supabase
    .from("billing_details")
    .upsert(billingRows, {
      onConflict: "refreshment_id,billing_detail_name",
    })
    .select();
  if (error) {
    console.error(error);
  }

  return data;
}
