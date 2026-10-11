import RefreshmentInfoCard from "./components/RefreshmentInfoCard";
import DeliveryDetailCard from "./components/DeliveryDetailCard";
import ActualDeliveryForm from "./components/ActualDeliveryForm";
import PaxOverviewList from "./PaxOverviewList";
import { useEffect, useState } from "react";
import { fetchCurrBewirtung, fetchCurrTeilnehmer } from "@/Hooks/SupaBaseAPI";
import { useParams } from "react-router";
import type { BewirtungenMitExtras, Teilnehmer } from "@/Types/types";

function RefreshmentDetail() {
  const { refreshmentId } = useParams();
  const [currRefreshment, setCurrRefreshment] =
    useState<BewirtungenMitExtras>();
  const [currPax, setCurrPax] = useState<Teilnehmer>([]);
  useEffect(() => {
    async function loadCurrBewirtungen() {
      if (refreshmentId) {
        const currBew = await fetchCurrBewirtung(refreshmentId);
        const currPax = await fetchCurrTeilnehmer(refreshmentId);
        if (currBew) {
          setCurrRefreshment(currBew);
        }
        if (currPax) {
          setCurrPax(currPax);
        }
      }
    }
    loadCurrBewirtungen().catch((error) => {
      console.error(error);
    });
  }, [refreshmentId]);

  return (
    <div>
      {currRefreshment && (
        <div className="flex flex-col justify-evenly sm:flex-row gap-4 py-4 px-6">
          <div className="w-full flex flex-col gap-4">
            <RefreshmentInfoCard refreshment={currRefreshment} />

            <PaxOverviewList pax={currPax} />
          </div>
          <div className="w-full flex flex-col gap-4 ">
            <DeliveryDetailCard refreshment={currRefreshment} />
            <ActualDeliveryForm refreshment={currRefreshment} />
          </div>
        </div>
      )}
    </div>
  );
}
export default RefreshmentDetail;
