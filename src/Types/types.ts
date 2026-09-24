import type { Database } from "./supabaseTypes";

export type Bewirtungen = Database["public"]["Tables"]["bewirtungen"]["Row"][];

export type Raeume = Database["public"]["Tables"]["raeume"]["Row"][];

export type Standorte = Database["public"]["Tables"]["standorte"]["Row"][];

export type Extras = Database["public"]["Tables"]["zusatzleistungen"]["Row"][];
