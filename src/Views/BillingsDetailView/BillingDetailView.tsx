import {
  fetchBillingInfos,
  fetchCurrBewirtung,
  updateRefreshmentStatus,
} from "@/hooks/SupaBaseAPI";
import type { BewirtungenMitExtras, NewBillingInfo } from "@/types/types";
import BillingsInfos from "./components/BillingsInfos";
import BillingInfoDeliveredValues from "./components/BillingInfoDeliveredValues";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function BillingDetailView() {
  const { refreshmentId } = useParams();
  const navigate = useNavigate();
  const [refreshment, setRefreshment] = useState<BewirtungenMitExtras>();
  const [billingInfos, setBillingInfos] = useState<NewBillingInfo[]>([]);

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

      const responseBillingInfos = await fetchBillingInfos(refreshmentId);
      if (responseBillingInfos) {
        setBillingInfos(responseBillingInfos);
      }
    }
    fetchRefreshment().catch(console.error);
  }, [refreshmentId]);

  async function handleSettleRefreshment() {
    if (!refreshment) return;
    await updateRefreshmentStatus("Abgerechnet", refreshment.id);
    toast.add({ type: "success", description: "Bewirtung abgerechnet" });
    await navigate(-1);
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-2">
      {refreshment && <BillingsInfos refreshment={refreshment} />}
      {refreshment && (
        <BillingInfoDeliveredValues billingInfos={billingInfos} />
      )}
      {refreshment && (
        <div className="flex justify-center sm:col-span-2">
          <Button
            variant="outline"
            className="w-50 px-4 my-2"
            onClick={handleSettleRefreshment}
            disabled={refreshment.status !== "Abrechnungsbereit"}
          >
            Abrechnen
          </Button>
        </div>
      )}
    </div>
  );
}
export default BillingDetailView;
