import {
  fetchRefreshmentsByRoomIdAndDate,
  updateRefreshmentStatus,
} from "@/Hooks/SupaBaseAPI";
import type { Bewirtungen } from "@/Types/types";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import RoomRefreshmentItem from "./components/RoomRefreshmentItem";

async function updateRoomStatus(
  currRefreshments: Bewirtungen,
): Promise<Bewirtungen> {
  const now = new Date();

  return Promise.all(
    currRefreshments.map(async (ref) => {
      const endDateTime = new Date(`${ref.datum}T${ref.endzeit}`);

      if (ref.status === "Geplant" && endDateTime <= now) {
        await updateRefreshmentStatus("Erledigt", ref.id);
        return { ...ref, status: "Erledigt" };
      }

      return ref;
    }),
  );
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
        setRefreshments(await updateRoomStatus(fetchedRefreshments));
      }
    }
    loadCurrRefreshment().catch((error) => {
      console.error("Fehler beim Laden der Bewirtungen:", error);
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
