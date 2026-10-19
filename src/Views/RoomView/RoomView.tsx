import { fetchRefreshmentsByRoomIdAndDate } from "@/Hooks/SupaBaseAPI";
import type { Bewirtungen } from "@/Types/types";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import RoomRefreshmentItem from "./components/RoomRefreshmentItem";

function updateRoomStatus(currRefreshments: Bewirtungen): Bewirtungen {
  const now = new Date();

  return currRefreshments.map((ref) => {
    const endDateTime = new Date(`${ref.datum}T${ref.endzeit}`);

    return endDateTime <= now ? { ...ref, status: "Done" } : ref;
  });
}

function RoomView() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");
  const [refreshments, setRefreshments] = useState<Bewirtungen>([]);
  useEffect(() => {
    async function loadCurrRefreshment() {
      if (!roomId || !selectedDate) return;
      const fetchedRefreshments = await fetchRefreshmentsByRoomIdAndDate(
        roomId,
        selectedDate,
      );
      if (fetchedRefreshments) {
        setRefreshments(updateRoomStatus(fetchedRefreshments));
      }
    }
    loadCurrRefreshment().catch((error) => {
      console.error("Fehler beim Laden der Bewirtungen:", error);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 px-6 bg-accent/20 border border-border/50 min-h-120 mx-4 rounded-lg">
      {refreshments?.map((ref) => {
        return (
          <Link
            className="transition-transform hover:scale-98"
            key={ref.id}
            to={`/araDine/dashboard/refreshment-detail/${ref.id}`}
          >
            <RoomRefreshmentItem
              name={ref.kunden_name}
              startTime={ref.startzeit}
              endTime={ref.endzeit}
              status={ref.status}
            />
          </Link>
        );
      }) ?? []}
    </div>
  );
}

export default RoomView;
