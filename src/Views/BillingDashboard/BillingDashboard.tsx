import { useOrderContext } from "@/context/RefreshmentContext";
import BillingItem from "./components/BillingItem";
import { fetchBewirtungen } from "@/hooks/SupaBaseAPI";
import type { Bewirtungen } from "@/types/types";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function BillingDashboard() {
  const items = [
    { label: "Erledigt", value: "Erledigt" },
    { label: "Geplant", value: "Geplant" },
    { label: "Abrechnungsbereit", value: "Abrechnungsbereit" },
    { label: "Abgerechnet", value: "Abgerechnet" },
  ];
  const orderContext = useOrderContext();
  const [refreshmentData, setRefreshmentData] = useState<Bewirtungen>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  useEffect(() => {
    async function fetchBillingsData() {
      const responseRefreshmentData = await fetchBewirtungen();
      if (!responseRefreshmentData) {
        console.error("Failed to fetch refreshment data");
        return;
      }
      setRefreshmentData(responseRefreshmentData);
    }

    fetchBillingsData().catch(console.error);
  }, []);

  return (
    <div>
      <div className=" flex flex-col bg-card/20 m-2 border border-border rounded-xl py-5">
        <div className="flex justify-between p-2 ">
          <h1 className="text-xl font-bold text-muted-foreground  underline underline-offset-4">
            Bewirtungen:
          </h1>
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            items={items}
          >
            <SelectTrigger className=" w-45  bg-card-foreground/20 hover:bg-transparent">
              <SelectValue
                className="text-muted-foreground text-base lg:text-xl"
                placeholder="Status"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1  bg-accent-foreground/50 text-muted-foreground mx-2 rounded-xl ">
          {selectedStatus === null ? (
            <p className="p-4 text-center">Bitte Status auswählen</p>
          ) : (
            refreshmentData
              .filter((ref) => ref.status === selectedStatus)
              .map((ref) => (
                <BillingItem
                  key={ref.id}
                  id={ref.id}
                  name={ref.kunden_name}
                  date={ref.datum}
                  location={
                    orderContext.state.location.find(
                      (loc) => loc.id === ref.standort_id,
                    )?.name ?? "Unbekannt"
                  }
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BillingDashboard;
