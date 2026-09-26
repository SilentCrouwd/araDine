import { CheckCircle, Circle, Wrench } from "lucide-react";
import type { Raeume } from "@/Types/types";

interface RoomInfoCardProps {
  roomStatus: Raeume;
}

function RoomInfoCard({ roomStatus }: RoomInfoCardProps) {
  return (
    <section className="grid grid-cols-1 gap-3 text-muted-foreground sm:grid-cols-4">
      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Circle className="h-8 w-8 text-red-500" />
        <div>
          <p className="text-2xl font-bold"></p>
          <p className="text-sm">Räume belegt</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Wrench className="h-8 w-8 text-yellow-500" />
        <div>
          <p className="text-2xl font-bold"></p>
          <p className="text-sm">Räume im Service</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <Wrench className="h-8 w-8 text-blue-500" />
        <div>
          <p className="text-2xl font-bold"></p>
          <p className="text-sm">Räume Abräumen</p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-border bg-card/20 p-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <div>
          <p className="text-2xl font-bold"></p>
          <p className="text-sm">Räume frei</p>
        </div>
      </div>
    </section>
  );
}

export default RoomInfoCard;
