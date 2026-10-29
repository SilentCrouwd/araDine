import type { Database } from "./supabaseTypes";

export type Refreshments = Database["public"]["Tables"]["refreshments"]["Row"][];
export type NewRefreshment =
  Database["public"]["Tables"]["refreshments"]["Insert"];
export type Rooms = Database["public"]["Tables"]["rooms"]["Row"][];

export type Locations = Database["public"]["Tables"]["locations"]["Row"][];

export type AdditionalServices =
  Database["public"]["Tables"]["additional_services"]["Row"][];

export type NewAdditionalService =
  Database["public"]["Tables"]["additional_services"]["Insert"];

export type LocationWithRooms = Locations[number] & {
  rooms: Rooms;
};
export type RefreshmentWithAdditionalServices = Refreshments[number] & {
  additional_services: AdditionalServices;
};

export type LocationsWithRooms = LocationWithRooms[];

export type Participants = Database["public"]["Tables"]["participants"]["Row"][];

export type NewParticipant =
  Database["public"]["Tables"]["participants"]["Insert"][];

export type BillingDetailInsert =
  Database["public"]["Tables"]["billing_details"]["Insert"];
