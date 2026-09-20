import { Button } from "@/components/ui/button";
import { Link } from "react-router";

function RoomStatusOverview({
  roomOverview,
}: {
  roomOverview: Array<{ room: string; startTime: string; status: string }>;
}) {
  function handleRoomStatus(roomStatus: string) {
    if (roomStatus === "Belegt") {
      return "bg-red-500 w-15 ";
    } else if (roomStatus === "Fertig") {
      return "bg-blue-500 w-15";
    } else if (roomStatus === "Service") {
      return "bg-yellow-500 w-15";
    } else {
      return "bg-green-500 w-15";
    }
  }

  return (
    <div>
      {roomOverview.map((room) => (
        <div
          className="grid grid-cols-4 border-b border-border content-center items-center py-0.5   "
          key={room.room}
        >
          <p>{room.room}</p>
          <p>{room.startTime}</p>
          <p
            className={`${handleRoomStatus(room.status)} flex justify-center  w-1/2 font-bold text-sm tracking-tighter rounded-xl text-muted-foreground text-shadow-sm/40 `}
          >
            {room.status}
          </p>
          <Link to={`araDine/dashboard/refreshment-detail/${"2"}`}>
            <Button className="w-fit " variant="outline">
              Details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RoomStatusOverview;
