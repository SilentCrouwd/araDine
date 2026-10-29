import { Button } from "@/components/ui/button";
import type { Refreshments, Rooms } from "@/types/types";
import { Link } from "react-router";

function handleRoomStatus(roomStatus: string) {
  // Ordnet jedem Status die passende Farbe für die Statusanzeige zu.
  if (roomStatus === "Fertig") {
    return "bg-blue-500 w-15";
  } else if (roomStatus === "Service") {
    return "bg-yellow-500 w-15";
  } else {
    return "bg-green-500 w-15";
  }
}
type roomProps = Readonly<{
  rooms: Rooms;
  refreshments: Refreshments;
}>;
function RoomStatusOverview({ rooms, refreshments }: roomProps) {
  return (
    <div className="text-base">
      {/* Pro Raum werden Status und passende Bewirtungsdetails zusammengeführt. */}
      {rooms.map((room) => (
        <div
          className="grid grid-cols-4 border-b border-border content-center items-center py-0.5   "
          key={room.id}
        >
          <p>{room.name}</p>
          <p>
            {refreshments
              .find((refreshment) => refreshment.room_id === room.id)
              ?.start_time.slice(0, 5)}
          </p>
          <p
            className={`${handleRoomStatus(room.status)} flex justify-center  w-1/2 font-bold text-sm tracking-tighter rounded-xl text-muted-foreground text-shadow-sm/40 `}
          >
            {room.status}
          </p>
          <Link
            className="inline-block transition-transform hover:scale-98"
            to={{
              pathname: `/araDine/dashboard/room-view/${room.id}`,
              search: room
                ? `?date=${refreshments.find((ref) => ref.room_id === room.id)?.date}`
                : "",
            }}
          >
            <Button
              className="w-fit "
              variant="outline"
              disabled={!refreshments.some((ref) => ref.room_id === room.id)}
            >
              Details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RoomStatusOverview;
