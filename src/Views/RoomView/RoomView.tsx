import { fetchRefreshmentsByRoomAndDate } from "@/hooks/SupaBaseAPI";
import type { Refreshments } from "@/types/types";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import RoomRefreshmentItem from "./components/RoomRefreshmentItem";

function RoomView() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");
  const [refreshments, setRefreshments] = useState<Refreshments>([]);
  useEffect(() => {
    async function loadCurrRefreshment() {
      if (!roomId || !selectedDate) return;
      const fetchedRefreshments = await fetchRefreshmentsByRoomAndDate(
        roomId,
        selectedDate,
      );
      if (fetchedRefreshments) {
        setRefreshments(fetchedRefreshments);
      }
    }
    loadCurrRefreshment().catch((error) => {
      console.error("Fehler beim Laden der Refreshments:", error);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 px-6 bg-accent/20 border border-border/50 min-h-fit mx-4 rounded-xl md:flex-row md:justify-center flex-wrap overflow-hidden">
      {refreshments?.map((ref) => {
        return (
          <Link
            className="transition-transform hover:scale-98 h-fit"
            key={ref.id}
            to={`/araDine/dashboard/refreshment-detail/${ref.id}`}
          >
            <RoomRefreshmentItem
              name={ref.customer_name}
              startTime={ref.start_time}
              endTime={ref.end_time}
              status={ref.status}
            />
          </Link>
        );
      }) ?? []}
    </div>
  );
}

export default RoomView;
