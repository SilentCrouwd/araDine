import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import {
  updateRefreshmentStatus,
  upsertBillingDetails,
} from "@/hooks/SupaBaseAPI";
import type { RefreshmentWithAdditionalServices, BillingDetailInsert } from "@/types/types";
import React, { useState } from "react";
import { PackageCheck } from "lucide-react";
import { useNavigate } from "react-router";

type ActualDeliveryFormProps = Readonly<{
  refreshment: RefreshmentWithAdditionalServices;
  billingInfos: BillingDetailInsert[];
}>;

function ActualDeliveryForm({
  refreshment,
  billingInfos,
}: ActualDeliveryFormProps) {
  const navigate = useNavigate();
  const [servicePax, setServicePax] = useState<string | null>(null);
  const savedServicePax =
    billingInfos.find((info) => info.billing_detail_name === "service")
      ?.billing_detail_value ?? null;
  // Vorhandene Istwerte haben Vorrang; andernfalls dienen bestellte Mengen als Eingabevorschlag.
  const newExtraRows = refreshment.additional_services
    .filter(
      (extra) =>
        extra.service_name !== "nachbewirtung" &&
        extra.service_name !== "nachbewirtungUhrzeit",
    )
    .map((extra) => {
      const extraName = extra.service_name ?? "";

      return {
        name: "actual_" + extraName,
        label: extraName.charAt(0).toUpperCase() + extraName.slice(1) + ":",
        id: extraName,
        value:
          billingInfos.find(
            (info) => info.billing_detail_name === extra.service_name,
          )?.billing_detail_value ??
          extra.service_value,
        type: extraName === "sonstige" ? "text" : "number",
      };
    });
  const canEdit = ["Erledigt", "Abrechnungsbereit"].includes(
    refreshment.status,
  );

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const actual: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("actual_")) {
        actual[key.slice("actual_".length)] = value;
      }
    }

    // Erst Istwerte sichern, danach den Status für die Abrechnung freigeben.
    await upsertBillingDetails(actual, refreshment.id);
    refreshment.status = "Abrechnungsbereit";
    await updateRefreshmentStatus(refreshment.status, refreshment.id);

    await navigate(-1);
  }
  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl font-bold text-muted-foreground">
          Lieferung tatsächlich
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-3">
          <div className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground">
            <h3 className="mb-2 flex items-center gap-2 font-bold">
              <PackageCheck className="size-5" />
              Gelieferte Leistungen
            </h3>
            {newExtraRows.map((field) => (
              <div
                key={field.id}
                className="flex flex-col gap-1.5 border-b border-border/50 py-2"
              >
                <label
                  htmlFor={field.id}
                  className="text-xs uppercase tracking-wider text-muted-foreground/80"
                >
                  {field.label}
                </label>
                <Input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  defaultValue={field.value ?? ""}
                  required
                />
              </div>
            ))}
            <div className="flex flex-col gap-1.5 py-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground/80">
                Service:
              </p>
              <Select
                name="actual_service"
                value={servicePax ?? savedServicePax}
                onValueChange={setServicePax}
              >
                <SelectTrigger className="w-full bg-card/20 hover:bg-transparent">
                  <SelectValue
                    placeholder="Personen"
                    className="text-muted-foreground text-base lg:text-xl"
                  />
                </SelectTrigger>
                <SelectContent side="left" align="start" sideOffset={2}>
                  <SelectGroup>
                    <SelectItem value="0">0Pax</SelectItem>
                    <SelectItem value="10">10Pax</SelectItem>
                    <SelectItem value="20">20Pax</SelectItem>
                    <SelectItem value="50">50Pax</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              className=" w-50  px-4 my-2"
              onClick={() => {
                toast.add({
                  type: "success",
                  description: "Leistungen Abgeschickt",
                });
              }}
              type="submit"
              disabled={!canEdit || (servicePax ?? savedServicePax) === null}
            >
              Speichern
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ActualDeliveryForm;
