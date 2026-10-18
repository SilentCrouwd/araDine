import { fetchRefreshmentsByRoomIdAndDate } from "@/Hooks/SupaBaseAPI";
import type { Bewirtungen } from "@/Types/types";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";

function RoomView() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const selectedDate = searchParams.get("date");
  const [refreshments, setRefreshemnts] = useState<Bewirtungen>();
  useEffect(() => {
    async function loadCurrRefreshment() {
      if (!roomId || !selectedDate) return;
      const fetchedRefreshments = await fetchRefreshmentsByRoomIdAndDate(
        roomId,
        selectedDate,
      );
      if (fetchedRefreshments) {
        setRefreshemnts(fetchedRefreshments);
      }
    }
    loadCurrRefreshment().catch((error) => {
      console.error("Fehler beim Laden der Bewirtungen:", error);
    });
  }, []);

  return (
    <div>
      {refreshments?.map((ref) => {
        return (
          <div key={ref.id}>
            <h1>{ref.kunden_name}</h1>
          </div>
        );
      }) ?? []}
    </div>
  );
}

export default RoomView;
