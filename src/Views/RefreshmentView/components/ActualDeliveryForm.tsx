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
  upsertActualDelivered,
} from "@/Hooks/SupaBaseAPI";
import type { BewirtungenMitExtras, NewBillingInfo } from "@/Types/types";
import React, { useState } from "react";
import { useNavigate } from "react-router";

type ActualDeliveryFormProps = Readonly<{
  refreshment: BewirtungenMitExtras;
  billingInfos: NewBillingInfo[];
}>;

function ActualDeliveryForm({
  refreshment,
  billingInfos,
}: ActualDeliveryFormProps) {
  const navigate = useNavigate();
  const [servicePax, setServicePax] = useState<string | null>(null);
  const savedServicePax =
    billingInfos.find((info) => info.name === "service")?.value ?? null;
  const newExtraRows = refreshment.zusatzleistungen
    .filter(
      (extra) =>
        extra.extra_name !== "nachbewirtung" &&
        extra.extra_name !== "nachbewirtungUhrzeit",
    )
    .map((extra) => {
      const extraName = extra.extra_name ?? "";

      return {
        name: "actual_" + extraName,
        label: extraName.charAt(0).toUpperCase() + extraName.slice(1) + ":",
        id: extraName,
        value:
          billingInfos.find((info) => info.name === extra.extra_name)?.value ??
          extra.extra_value,
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

    await upsertActualDelivered(actual, refreshment.id);
    refreshment.status = "Abrechnungsbereit";
    await updateRefreshmentStatus(refreshment.status, refreshment.id);

    await navigate(-1);
  }
  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground">
          Lieferung tatsächlich:
        </h2>
      </CardHeader>
      <CardContent className="text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2">
        <form onSubmit={handleOnSubmit}>
          {newExtraRows.map((field) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-2 border-b border-border/50 p-2"
            >
              <p>{field.label}</p>
              <Input
                id={field.id}
                name={field.name}
                type={field.type}
                defaultValue={field.value ?? ""}
                required
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 gap-2 items-center">
            <p>Service:</p>
            <Select
              name="actual_service"
              value={servicePax ?? savedServicePax}
              onValueChange={setServicePax}
            >
              <SelectTrigger className="w-full  bg-card/20 hover:bg-transparent ">
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
           disabled={!canEdit || (servicePax ?? savedServicePax) === null} >
              Speichern
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default ActualDeliveryForm;
