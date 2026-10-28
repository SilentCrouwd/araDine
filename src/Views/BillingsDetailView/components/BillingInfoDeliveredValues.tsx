import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DetailRow from "@/components/DetailRow";
import type { NewBillingInfo } from "@/types/types";
import { PackageCheck } from "lucide-react";

type BillingInfoDeliveredValuesProps = Readonly<{
  billingInfos: NewBillingInfo[];
}>;

function BillingInfoDeliveredValues({
  billingInfos,
}: BillingInfoDeliveredValuesProps) {
  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl font-bold text-muted-foreground">
          Tatsächlich geliefert
        </h2>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground">
          <h3 className="mb-2 flex items-center gap-2 font-bold">
            <PackageCheck className="size-5" />
            Gelieferte Leistungen
          </h3>
          {billingInfos.length === 0 ? (
            <p className="py-2">Keine Werte erfasst</p>
          ) : (
            billingInfos.map((info) => (
              <DetailRow key={info.name} label={info.name ?? "-"}>
                {info.name === "service" ? `${info.value} Pax` : info.value}
              </DetailRow>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default BillingInfoDeliveredValues;
