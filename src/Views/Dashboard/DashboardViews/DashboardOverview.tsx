import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  CalendarDays,
  DoorClosed,
  DoorOpen,
  LockKeyhole,
  LockKeyholeOpen,
  MessageSquareWarning,
  Store,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

function DashboardOverview() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const items = [
    { label: "LHM", value: "LHM" },
    { label: "LEX", value: "LEX" },
    { label: "MCC", value: "MCC" },
  ];

  const handleRooms = [
    { boocked: true, roomNumber: 101, service: true },
    { boocked: true, roomNumber: 102, service: false },
    { boocked: false, roomNumber: 103 },
    { boocked: true, roomNumber: 104, service: true },
    { boocked: true, roomNumber: 105, service: true },
    { boocked: true, roomNumber: 106, service: true },
    { boocked: true, roomNumber: 107, service: true },
    { boocked: false, roomNumber: 108 },
    { boocked: false, roomNumber: 109 },
    { boocked: true, roomNumber: 110, service: true },
  ];

  function RoomStatusIcon({ room }: { room: Room }) {

    const getRoomIcon = () => {
      if (room.service) {
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      }

      if (!room.boocked) {
        return <DoorOpen className="h-5 w-5 text-green-600" />;
      }

      return <DoorClosed className="h-5 w-5 text-red-500" />;
    };

    return getRoomIcon();
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-5">Overview</h1>
      <div className="max-w-210 mx-auto grid grid-cols-2  border-b border-border  px-6 py-4 gap-4 ">
        <Card className="px-2 h-30 flex flex-col justify-between items-center shadow-shadow-sm">
          <Store className="h-8 w-8 text-icon" />
          <Select items={items}>
            <SelectTrigger className="w-35">
              <SelectValue placeholder="Wähle Standort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Standort</SelectLabel>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
        <Card className="px-2 h-30 flex flex-col justify-between items-center shadow-shadow-sm">
          <CalendarDays className="h-8 w-8 text-icon" />
          <Input
            type="date"
            className="w-35"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Card>
      </div>

      <h2 className="text-lg font-medium col-span-4 my-2 underline underline-offset-4">
        Raumübersicht:
      </h2>
      <div className="max-w-210 mx-auto grid grid-cols-3 py-4 gap-4 px-6">
        <Card className="px-2 h-30 flex flex-col justify-between items-center shadow-shadow-sm">
          <div className=" w-full border-b border-border p-2 flex justify-center">
            <LockKeyholeOpen className="h-8 w-8 text-green-600 " />
          </div>
          <p className="text-lg  ">
            Frei:{" "}
            <span className="font-semibold">
              {handleRooms.filter((room) => !room.boocked).length}
            </span>
          </p>
        </Card>
        <Card className="px-2 h-30 flex flex-col justify-between items-center shadow-shadow-sm">
          <div className=" w-full border-b border-border p-2 flex justify-center">
            <LockKeyhole className="h-8 w-8 text-yellow-500 " />
          </div>
          <p className="text-lg  ">
            Service :{" "}
            <span className="font-semibold">
              {handleRooms.filter((room) => room.service).length}
            </span>
          </p>
        </Card>
        <Card className="px-2 h-30 flex flex-col justify-between items-center shadow-shadow-sm">
          <div className=" w-full border-b border-border p-2 flex justify-center">
            <MessageSquareWarning className="h-8 w-8 text-red-500 " />
          </div>
          <p className="text-lg  ">
            Belegt:{" "}
            <span className="font-semibold">
              {handleRooms.filter((room) => room.boocked).length}
            </span>
          </p>
        </Card>
      </div>

      <h2 className="text-lg font-medium col-span-4 my-2 underline underline-offset-4">
        Schnell Übersicht:
      </h2>
      <div className="max-w-210 mx-auto grid grid-cols-2 py-4 gap-4 px-6">
        <Card className="px-2 h-35 flex flex-col  items-center shadow-shadow-sm">
          <div className=" w-full border-b border-border py-1.5 flex justify-center">
            <Utensils className="h-5 w-5 text-icon " />
          </div>
          <p className="text-xs leading-4 text-center text-muted">
            <span className="font-semibold text-lg  text-foreground">5</span>
            <br></br> Personen zum Lunch
          </p>
        </Card>
        <Card className="px-2 h-35 flex flex-col  items-center shadow-shadow-sm">
          <div className=" w-full border-b border-border py-1.5 flex justify-center">
            <Utensils className="h-5 w-5 text-icon " />
          </div>
          <p className="text-xs leading-4 text-center text-muted">
            <span className="font-semibold text-lg  text-foreground">
              {handleRooms.filter((room) => room.boocked).length}
            </span>
            <br></br> Bewirtungen Gesamt
          </p>
        </Card>
      </div>
      <h2 className=" text-lg font-medium col-span-3 underline underline-offset-4 justify-self-start  ">
        Raumübersicht
      </h2>
      <div className="grid grid-cols-2 justify-items-center  py-4 gap-4 px-6 sm:grid-cols-4 md:grid-cols-5">
        {handleRooms.map((room) => (
          <Link
            key={room.roomNumber}
            to={`/dashboard/room-view/${room.roomNumber}`}
          >
            <Card className="px-2 w-35 h-35 flex flex-col justify-between items-center shadow-shadow-sm">
              <div className="w-full border-b border-border py-1.5 flex justify-center">
                <RoomStatusIcon room={room} />
              </div>
              <p
                className={`text-lg ${room.service ? "text-foreground" : !room.boocked ? "text-muted text-sm" : "text-foreground text-lg"} font-semibold text-center`}
              >
                <span className="text-lg text-foreground">
                  {room.roomNumber}
                </span>{" "}
                <br></br>
                {room.service ? "Service" : !room.boocked ? "Frei" : "Belegt"}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardOverview;
