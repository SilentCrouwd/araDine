import type { Bewirtungen, Raeume, Zusatzleistungen } from "@/types/types";
import DetailRow from "@/components/DetailRow";
import {
  ArrowRightIcon,
  RefreshCcwDot,
  RefreshCwOff,
  Users,
} from "lucide-react";
type RefreshmentCardProps = Readonly<{
  refreshment: Bewirtungen[number];
  rooms: Raeume;
  extras: Zusatzleistungen;
}>;

function RefreshmentCard({ refreshment, rooms, extras }: RefreshmentCardProps) {
  // Sucht den Raum anhand der in der Bewirtung gespeicherten Raum-ID.
  const selectedRoom = rooms.find((room) => room.id === refreshment.raum_id);

  return (
    <div className="refreshment-card w-full h-fit flex flex-col rounded-xl my-1 bg-accent-foreground/50 p-3 text-muted-foreground">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="wrap-break-word text-lg font-bold">
          {refreshment.kunden_name}
        </h3>
        <ArrowRightIcon className="shrink-0" />
      </div>
      <DetailRow label="Datum">
        {new Date(refreshment.datum).toLocaleDateString("de-DE")}
      </DetailRow>
      <DetailRow label="Uhrzeit">
        {refreshment.startzeit.slice(0, 5)} - {refreshment.endzeit.slice(0, 5)}
      </DetailRow>
      <DetailRow label="Raum">{selectedRoom?.name}</DetailRow>
      <DetailRow label="Status">{refreshment.status}</DetailRow>
      <DetailRow label="Personen">
        <span className="flex items-center gap-2">
          {refreshment.personen_zahl}
          <Users className="size-5" />
        </span>
      </DetailRow>
      <DetailRow label="Erfrischung">
        {/* Das Vorhandensein des Zusatzleistungsnamens kennzeichnet eine Nachbewirtung. */}
        {extras.some((extra) => extra.extra_name === "nachbewirtung") ? (
          <RefreshCcwDot className="text-green-500" />
        ) : (
          <RefreshCwOff className="text-red-500" />
        )}
      </DetailRow>
    </div>
  );
}

export default RefreshmentCard;
