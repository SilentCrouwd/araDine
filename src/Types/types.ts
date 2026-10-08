import type { Database } from "./supabaseTypes";

export type Bewirtungen = Database["public"]["Tables"]["bewirtungen"]["Row"][];
export type NeueBewirtung =
  Database["public"]["Tables"]["bewirtungen"]["Insert"];
export type Raeume = Database["public"]["Tables"]["raeume"]["Row"][];

export type Standorte = Database["public"]["Tables"]["standorte"]["Row"][];

export type Zusatzleistungen =
  Database["public"]["Tables"]["zusatzleistungen"]["Row"][];

export type NeueZusatzleistung =
  Database["public"]["Tables"]["zusatzleistungen"]["Insert"];

export type StandortMitRaeumen = Standorte[number] & {
  raeume: Raeume;
};
export type BewirtungenMitExtras = Bewirtungen[number] & {
  zusatzleistungen: Zusatzleistungen;
};

export type StandorteMitRaeumen = StandortMitRaeumen[];
