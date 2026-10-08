import RefreshmentInfoCard from "./components/RefreshmentInfoCard";
import DeliveryDetailCard from "./components/DeliveryDetailCard";
import ActualDeliveryForm from "./components/ActualDeliveryForm";
import PaxOverviewList from "./PaxOverviewList";
import { useEffect, useState } from "react";
import { fetchCurrBewirtung } from "@/Hooks/SupaBaseAPI";
import { useParams } from "react-router";
import type { BewirtungenMitExtras } from "@/Types/types";

function RefreshmentDetail() {
  const { refreshmentId } = useParams();
  const [currRefreshment, setCurrBewirtung] = useState<BewirtungenMitExtras>();

  useEffect(() => {
    async function loadCurrBewirtungen() {
      if (refreshmentId) {
        const currBew = await fetchCurrBewirtung(refreshmentId);
        if (currBew) {
          setCurrBewirtung(currBew);
        }
      }
    }
    loadCurrBewirtungen().catch((error) => {
      console.error(error);
    });
  }, []);

  const participants = [
    { name: "Max Mustermann", department: "Vertrieb" },
    { name: "Max Mustermann", department: "Vertrieb" },
    { name: "Max Mustermann", department: "Vertrieb" },
  ];

  return (
    <div>
      <div className="flex flex-col justify-evenly sm:flex-row gap-4 py-4 px-6">
        <div className="w-full flex flex-col gap-4">
          {currRefreshment && (
            <RefreshmentInfoCard refreshment={currRefreshment} />
          )}{" "}
          <PaxOverviewList participants={participants} />
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <DeliveryDetailCard />
          <ActualDeliveryForm />
        </div>
      </div>
    </div>
  );
}
export default RefreshmentDetail;
