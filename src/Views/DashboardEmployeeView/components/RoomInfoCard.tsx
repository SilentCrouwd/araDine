import { CheckCircle, Wrench } from "lucide-react";
import type { Refreshments, Rooms } from "@/types/types";

function getRoomsToClear(refreshments: Refreshments) {
  return new Set(
    refreshments
      .filter((refreshment) => refreshment.status === "Erledigt")
      .map((refreshment) => refreshment.room_id),
  );
}

const roomTiles = [
  {
    title: "Räume im Service",
    Icon: Wrench,
    iconColor: "text-yellow-500",
    count: (room: Rooms) =>
      room.filter((roomItem) => roomItem.status.toLowerCase() === "service")
        .length,
  },
  {
    title: "Räume Abräumen",
    Icon: Wrench,
    iconColor: "text-blue-500",
    // Zählt Räume mit erledigter Bewirtung, ohne den Raumstatus zu ändern.
    count: (_room: Rooms, refreshments: Refreshments) =>
      getRoomsToClear(refreshments).size,
  },
  {
    title: "Räume frei",
    Icon: CheckCircle,
    iconColor: "text-green-500",
    count: (room: Rooms, refreshments: Refreshments) => {
      const roomsToClear = getRoomsToClear(refreshments);
      return room.filter(
        (roomItem) =>
          roomItem.status.toLowerCase() === "frei" &&
          !roomsToClear.has(roomItem.id),
      ).length;
    },
  },
];

type RoomInfoCardProps = Readonly<{
  room: Rooms;
  refreshments: Refreshments;
}>;

function RoomInfoCard({ room, refreshments }: RoomInfoCardProps) {
  return (
    // Zählt die Räume je Status für die kompakte Übersicht oberhalb der Liste.
    <section className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {roomTiles.map((tile) => (
        <div
          key={tile.title}
          className="flex flex-col items-center bg-card/20 border border-border rounded-xl p-4"
        >
          <tile.Icon className={`size-8 mb-1 ${tile.iconColor}`} />
          <p className="text-sm text-muted-foreground">{tile.title}</p>
          <p className="text-3xl font-bold text-muted-foreground">
            {tile.count(room, refreshments)}
          </p>
        </div>
      ))}
    </section>
  );
}

export default RoomInfoCard;
