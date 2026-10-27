import RefreshmentInfoCard from "./components/RefreshmentInfoCard";
import DeliveryDetailCard from "./components/DeliveryDetailCard";
import ActualDeliveryForm from "./components/ActualDeliveryForm";
import PaxOverviewList from "./PaxOverviewList";
import { useEffect, useState } from "react";
import {
  fetchBillingInfos,
  fetchCurrBewirtung,
  fetchCurrTeilnehmer,
} from "@/hooks/SupaBaseAPI";
import { useParams } from "react-router";
import type {
  BewirtungenMitExtras,
  NewBillingInfo,
  Teilnehmer,
} from "@/types/types";

function RefreshmentDetail() {
  const { refreshmentId } = useParams();
  const [currRefreshment, setCurrRefreshment] =
    useState<BewirtungenMitExtras>();
  const [currBillingInfos, setCurrBillingInfos] = useState<NewBillingInfo[]>(
    [],
  );
  const [currPax, setCurrPax] = useState<Teilnehmer>([]);
  useEffect(() => {
    async function loadCurrBewirtungen() {
      if (refreshmentId) {
        const currBew = await fetchCurrBewirtung(refreshmentId);
        const currPax = await fetchCurrTeilnehmer(refreshmentId);
        const currBillingInfos = await fetchBillingInfos(refreshmentId);
        if (currBew) {
          setCurrRefreshment(currBew);
        }
        if (currPax) {
          setCurrPax(currPax);
        }
        if (currBillingInfos) {
          setCurrBillingInfos(currBillingInfos);
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
            <ActualDeliveryForm
              refreshment={currRefreshment}
              billingInfos={currBillingInfos}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default RefreshmentDetail;
