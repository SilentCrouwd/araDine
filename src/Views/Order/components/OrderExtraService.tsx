import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
type OrderExtraServiceProps = Readonly<{
  selectedPackage: string;
}>;

function OrderExtraService({ selectedPackage }: OrderExtraServiceProps) {
  // Schaltet das zusätzliche Uhrzeitfeld für eine Nachbewirtung ein oder aus.
  const [refresh, setRefresh] = useState(false);
  // Felddefinitionen bündeln Beschriftung, FormData-Schlüssel und Paketabhängigkeiten.
  const extraServiceData = [
    {
      id: "extra_kaffee",
      label: "Kaffee:",
      value_id: "kaffee_value",
      Placeholder: "Kanne 4pax",
      hidden: true,
    },
    {
      id: "extra_wasser",
      label: "Wasser:",
      value_id: "wasser_value",
      Placeholder: "Flaschen 0.75L",
      hidden: selectedPackage !== "package-1",
    },
    {
      id: "extra_tee",
      label: "Tee:",
      value_id: "Tee_value",
      Placeholder: "Kanne 4pax",
      hidden: selectedPackage !== "package-1",
    },

    {
      id: "extra_nuesse",
      label: "Nüsse:",
      value_id: "nuesse_value",
      Placeholder: "Portionen 45g",
    },
    {
      id: "extra_obst",
      label: "Obst:",
      value_id: "obst_value",
      Placeholder: "Stück",
      hidden: selectedPackage === "package-3",
    },
    {
      id: "extra_suessware",
      label: "Süssware:",
      value_id: "suessware_value",
      Placeholder: "Riegel",
    },
    {
      id: "extra_softdrinks",
      label: "Softdrinks:",
      value_id: "softdrinks_value",
      Placeholder: "Flaschen 0.33L ",
      hidden: selectedPackage === "package-3",
    },
    {
      id: "extra_sonstige",
      label: "Sonstige:",
      value_id: "sonstige_value",
      Placeholder: "Sonstiges",
      type: "text",
    },
    {
      id: "extra_nachbewirtung",
      label: "Nachbewirtung:",
      value_id: "nachbewirtung_value",
      type: "checkbox",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setRefresh(e.target.checked);
      },
    },
  ];
  const filteredSelects = extraServiceData;
  return (
    <div className="h-fit w-full rounded-xl border border-border bg-card/20 p-2 text-muted-foreground">
      <h2 className="p-2 text-xl font-bold">Zusatzleistungen</h2>
      <div className="rounded-xl bg-accent-foreground/50 p-3">
        {filteredSelects.map((service) => (
          <div
            className="flex flex-col gap-1.5 border-b border-border/50 py-2 last:border-b-0"
            key={service.id}
            hidden={service.hidden}
          >
            <Label
              className="cursor-pointer text-xs uppercase tracking-wider text-muted-foreground/80"
              htmlFor={service.value_id}
            >
              {service.label}
            </Label>
            <Input
              onChange={service.onChange}
              type={service.type || "number"}
              id={service.value_id}
              placeholder={service.Placeholder}
              name={service.id}
              className={
                service.type === "checkbox"
                  ? "w-40 p-0"
                  : "w-full text-muted-foreground placeholder:text-muted"
              }
            />
          </div>
        ))}
        {refresh && (
          // Das Zeitfeld wird nur benötigt, wenn die Nachbewirtung aktiviert ist.
          <div className="flex flex-col gap-1.5 py-2">
            <Label
              htmlFor="start_time"
              className="text-xs uppercase tracking-wider text-muted-foreground/80"
            >
              Nachbewirtung Uhrzeit:
            </Label>
            <Input
              type="time"
              id="start_time"
              name="extra_nachbewirtungUhrzeit"
              required
              className="w-full [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderExtraService;
