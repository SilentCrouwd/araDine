-- Benennt Tabellen, Spalten und Fremdschlüssel um, ohne vorhandene Datensätze zu ersetzen.
begin;

alter table public.bewirtungen rename to refreshments;
alter table public.standorte rename to locations;
alter table public.raeume rename to rooms;
alter table public.teilnehmer rename to participants;
alter table public.zusatzleistungen rename to additional_services;
alter table public.abrechnungsdetails rename to billing_details;

alter table public.refreshments rename column abteilung to department;
alter table public.refreshments rename column anlass to occasion;
alter table public.refreshments rename column buchungskreis to company_code;
alter table public.refreshments rename column datum to date;
alter table public.refreshments rename column endzeit to end_time;
alter table public.refreshments rename column kostenstelle to cost_center;
alter table public.refreshments rename column kunden_email to customer_email;
alter table public.refreshments rename column kunden_name to customer_name;
alter table public.refreshments rename column "kundenBewirtung" to is_customer_refreshment;
alter table public.refreshments rename column mittagsverpflegung to lunch_provided;
alter table public.refreshments rename column paket to package;
alter table public.refreshments rename column personen_zahl to participant_count;
alter table public.refreshments rename column raum_id to room_id;
alter table public.refreshments rename column standort_id to location_id;
alter table public.refreshments rename column startzeit to start_time;
alter table public.refreshments drop column if exists teilnehmer_id;

alter table public.rooms rename column standort_id to location_id;

alter table public.participants rename column abteilung to department;
alter table public.participants rename column bewirtung_id to refreshment_id;

alter table public.additional_services rename column bewirtung_id to refreshment_id;
alter table public.additional_services rename column extra_name to service_name;
alter table public.additional_services rename column extra_value to service_value;

alter table public.billing_details rename column bewirtung_id to refreshment_id;
alter table public.billing_details rename column name to billing_detail_name;
alter table public.billing_details rename column value to billing_detail_value;

do $$
begin
  -- Fremdschlüssel erhalten neue Bezeichnungen, sofern ihre bisherigen Namen vorhanden sind.
  if exists (
    select 1 from pg_constraint
    where conname = 'bewirtungen_raum_id_fkey'
      and conrelid = 'public.refreshments'::regclass
  ) then
    alter table public.refreshments
      rename constraint bewirtungen_raum_id_fkey to refreshments_room_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'bewirtungen_standort_id_fkey'
      and conrelid = 'public.refreshments'::regclass
  ) then
    alter table public.refreshments
      rename constraint bewirtungen_standort_id_fkey to refreshments_location_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'raeume_standort_id_fkey'
      and conrelid = 'public.rooms'::regclass
  ) then
    alter table public.rooms
      rename constraint raeume_standort_id_fkey to rooms_location_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'teilnehmer_bewirtung_id_fkey'
      and conrelid = 'public.participants'::regclass
  ) then
    alter table public.participants
      rename constraint teilnehmer_bewirtung_id_fkey to participants_refreshment_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'zusatzleistungen_bewirtung_id_fkey'
      and conrelid = 'public.additional_services'::regclass
  ) then
    alter table public.additional_services
      rename constraint zusatzleistungen_bewirtung_id_fkey to additional_services_refreshment_id_fkey;
  end if;

  if exists (
    select 1 from pg_constraint
    where conname = 'abrechnungsdetails_bewirtung_id_fkey'
      and conrelid = 'public.billing_details'::regclass
  ) then
    alter table public.billing_details
      rename constraint abrechnungsdetails_bewirtung_id_fkey to billing_details_refreshment_id_fkey;
  end if;
end
$$;

commit;
