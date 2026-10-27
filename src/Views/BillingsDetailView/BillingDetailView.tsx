import { fetchCurrBewirtung } from "@/hooks/SupaBaseAPI";
import type { BewirtungenMitExtras } from "@/types/types";
import BillingsInfos from "./components/BillingsInfos";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function BillingDetailView() {
  const { refreshmentId } = useParams();
  const [refreshment, setRefreshment] = useState<BewirtungenMitExtras>();

  useEffect(() => {
    async function fetchRefreshment() {
      if (!refreshmentId) {
        console.error("No ID provided");
        return;
      }
      const responseRefreshment = await fetchCurrBewirtung(refreshmentId);
      if (!responseRefreshment) {
        console.error("No refreshment found");
        return;
      }
      setRefreshment(responseRefreshment);
    }
    fetchRefreshment().catch(console.error);
  }, [refreshmentId]);
  return (
    <div>
      {refreshment && <BillingsInfos refreshment={refreshment} />}
    </div>
  );
}
export default BillingDetailView;
