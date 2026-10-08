import type { Bewirtungen, Raeume, Zusatzleistungen } from "@/Types/types";
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
    <div className="refreshment-card w-full h-fit py-2 flex flex-col justify-center  border border-border rounded-xl my-1 bg-card-foreground/25 text-base">
      <div className="flex items-center justify-between px-6">
        <h3 className="font-bold text-lg underline underline-offset-4">
          {refreshment.kunden_name}
        </h3>{" "}
        <ArrowRightIcon />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1 py-3 px-6">
          <p className="flex justify-between border-b border-border/50 p-1">
            <span>Datum:</span>{" "}
            <span>
              {new Date(refreshment.datum).toLocaleDateString("de-De")}
            </span>{" "}
          </p>
          <p className="flex justify-between border-b border-border/50 p-1 ">
            <span>Uhrzeit:</span>
            <span>
              {refreshment.startzeit.slice(0, 5)} -
              {refreshment.endzeit.slice(0, 5)}
            </span>
          </p>
          <p className="flex justify-between border-b border-border/50 p-1">
            <span>Raum:</span>
            <span>{selectedRoom?.name}</span>
          </p>
          <p className="flex justify-between border-b border-border/50 p-1">
            <span>Status:</span>
            <span>{refreshment.status}</span>
          </p>
          <p className="flex justify-between border-b border-border/50 p-1">
            <span>Personen:</span>
            <span className="flex gap-0.5">
              {refreshment.personen_zahl}
              <Users />
            </span>
          </p>
          <p className=" flex justify-between gap-2">
            <span> Erfrischung:</span>
            <span>
              {" "}
              {/* Das Vorhandensein des Zusatzleistungsnamens kennzeichnet eine Nachbewirtung. */}
              {extras.some((extra) => extra.extra_name === "nachbewirtung") ? (
                <RefreshCcwDot className="text-green-500" />
              ) : (
                <RefreshCwOff className="text-red-500" />
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefreshmentCard;
