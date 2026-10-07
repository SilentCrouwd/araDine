import { Button } from "@/components/ui/button";
import type { Bewirtungen, Raeume } from "@/Types/types";
import { Link } from "react-router";

function handleRoomStatus(roomStatus: string) {
  if (roomStatus === "Fertig") {
    return "bg-blue-500 w-15";
  } else if (roomStatus === "Service") {
    return "bg-yellow-500 w-15";
  } else {
    return "bg-green-500 w-15";
  }
}
type roomsProps = {
  rooms: Raeume;
  refreshments: Bewirtungen;
};
function RoomStatusOverview({ rooms, refreshments }: roomsProps) {
  return (
    <div className="text-base">
      {rooms.map((room) => (
        <div
          className="grid grid-cols-4 border-b border-border content-center items-center py-0.5   "
          key={room.id}
        >
          <p>{room.name}</p>
          <p>
            {refreshments
              .find((refreshment) => refreshment.raum_id === room.id)
              ?.startzeit.slice(0, 5)}
          </p>
          <p
            className={`${handleRoomStatus(room.status)} flex justify-center  w-1/2 font-bold text-sm tracking-tighter rounded-xl text-muted-foreground text-shadow-sm/40 `}
          >
            {room.status}
          </p>
          <Link
            to={`araDine/dashboard/refreshment-detail/${refreshments.find((refreshment) => refreshment.raum_id === room.id)?.id}`}
          >
            <Button
              className="w-fit "
              variant="outline"
              disabled={!refreshments.some((ref) => ref.raum_id === room.id)}
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
