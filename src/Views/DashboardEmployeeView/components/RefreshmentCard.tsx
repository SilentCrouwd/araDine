import {
  ArrowRightIcon,
  RefreshCcwDot,
  RefreshCwOff,
  Users,
} from "lucide-react";

export interface RefreshmentCardProps {
  title: string;
  startTime: string;
  endTime: string;
  numberPax: number;
  date: string;
  room: string;
  refresh: boolean;
  refreshmentId: string;
}

function RefreshmentCard({
  title,
  startTime,
  endTime,
  numberPax,
  date,
  room,
  refresh,
}: Readonly<RefreshmentCardProps>) {
  return (
    <div className="refreshment-card w-fit h-60 flex flex-col justify-center  border border-border rounded-xl my-1 bg-card-foreground/25 ">
      <div className="flex items-center justify-between px-6">
        <h3 className="font-bold text-lg underline underline-offset-4">
          {title}
        </h3>{" "}
        <ArrowRightIcon />
      </div>
      <div className="flex flex-col gap-2">
        <div className="gap-1 py-3 px-6">
          <p>Date: {date}</p>
          <p>
            Time: {startTime} - {endTime}
          </p>
          <p>Room: {room}</p>
        </div>
        <div className="flex  justify-between py-2 gap-10  px-6">
          <p className=" flex gap-2">
            Refresh:{" "}
            {refresh ? (
              <RefreshCcwDot className="text-green-500" />
            ) : (
              <RefreshCwOff className="text-red-500" />
            )}
          </p>

          <p className="flex gap-2">
            <Users />
            {numberPax}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefreshmentCard;
