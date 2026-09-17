import { CheckCircle, Circle, Wrench } from "lucide-react";

interface RoomInfoCardProps {
  roomStatus: { room: string; startTime: string; status: string }[];
}

function RoomInfoCard({ roomStatus }: RoomInfoCardProps) {
  return (
    <section className="grid grid-cols-1 gap-3 text-muted-foreground sm:grid-cols-4">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Circle className="h-8 w-8 text-red-500" />
        <div>
          <p className="text-2xl font-bold">
            {roomStatus.filter((room) => room.status === "Belegt").length}
          </p>
          <p className="text-sm">Räume belegt</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Wrench className="h-8 w-8 text-yellow-500" />
        <div>
          <p className="text-2xl font-bold">
            {roomStatus.filter((room) => room.status === "Service").length}
          </p>
          <p className="text-sm">Räume im Service</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Wrench className="h-8 w-8 text-blue-500" />
        <div>
          <p className="text-2xl font-bold">
            {roomStatus.filter((room) => room.status === "Fertig").length}
          </p>
          <p className="text-sm">Räume Abräumen</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <div>
          <p className="text-2xl font-bold">
            {roomStatus.filter((room) => room.status === "Frei").length}
          </p>
          <p className="text-sm">Räume frei</p>
        </div>
      </div>
    </section>
  );
}

export default RoomInfoCard;
