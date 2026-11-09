import type { Refreshments, Rooms, AdditionalServices } from "@/types/types";
import DetailRow from "@/components/DetailRow";
import {
  ArrowRightIcon,
  RefreshCcwDot,
  RefreshCwOff,
  Users,
} from "lucide-react";
type RefreshmentCardProps = Readonly<{
  refreshment: Refreshments[number];
  rooms: Rooms;
  extras: AdditionalServices;
}>;

function RefreshmentCard({ refreshment, rooms, extras }: RefreshmentCardProps) {
  // Sucht den Raum anhand der in der Bewirtung gespeicherten Raum-ID.
  const selectedRoom = rooms.find((room) => room.id === refreshment.room_id);

  return (
    <div className="refreshment-card w-full h-fit flex flex-col rounded-xl my-1 bg-accent-foreground/50 p-3 text-muted-foreground">
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="wrap-break-word text-lg font-bold">
          {refreshment.customer_name}
        </h3>
        <ArrowRightIcon className="shrink-0" />
      </div>
      <DetailRow label="Datum">
        {new Date(refreshment.date).toLocaleDateString("de-DE")}
      </DetailRow>
      <DetailRow label="Uhrzeit">
        {refreshment.start_time.slice(0, 5)} - {refreshment.end_time.slice(0, 5)}
      </DetailRow>
      <DetailRow label="Raum">{selectedRoom?.name}</DetailRow>
      <DetailRow label="Status">{refreshment.status}</DetailRow>
      <DetailRow label="Personen">
        <span className="flex items-center gap-2">
          {refreshment.participant_count}
          <Users className="size-5" />
        </span>
      </DetailRow>
      <DetailRow label="Erfrischung">
        {/* Das Vorhandensein des Zusatzleistungsnamens kennzeichnet eine Nachbewirtung. */}
        {extras.some((extra) => extra.service_name === "nachbewirtung") ? (
          <RefreshCcwDot className="text-green-500" />
        ) : (
          <RefreshCwOff className="text-red-500" />
        )}
      </DetailRow>
    </div>
  );
}

export default RefreshmentCard;
