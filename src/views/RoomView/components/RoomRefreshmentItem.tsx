import { ClockArrowDown, ClockArrowUp, UserRound } from "lucide-react";

type RoomRefreshmentItemProps = Readonly<{
  name: string;
  startTime: string;
  endTime: string;
  status: string;
}>;

function RoomRefreshmentItem({
  name,
  startTime,
  endTime,
  status,
}: RoomRefreshmentItemProps) {
  return (
    <div className="flex  flex-col border-b border-border/50 text-lg text-muted-foreground bg-accent-foreground/30 rounded-xl p-2  lg:flex-row">
      <h6 className=" flex  items-center p-1 font-bold text-xl sm:text-2xl border-b border-border/20">
        <UserRound className="h-5 " />
        <span>{name}</span>
      </h6>
      <div className="flex  flex-col justify-between items-center py-2 gap-2 sm:flex-row  ">
        <div className="flex  justify-start gap-2">
          <p className="flex gap-2 items-center">
            <ClockArrowUp className="h-5 text-green-500" />
            {startTime.slice(0, 5)}
          </p>
          <p className="flex  gap-2 items-center">
            <ClockArrowDown className="h-5 text-rose-500" />
            {endTime.slice(0, 5)}
          </p>
        </div>
        <p
          className={`${status === "Erledigt" ? "bg-orange-400" : "bg-green-500"} rounded-xl px-2 `}
        >
          {status}
        </p>
      </div>
    </div>
  );
}
export default RoomRefreshmentItem;
