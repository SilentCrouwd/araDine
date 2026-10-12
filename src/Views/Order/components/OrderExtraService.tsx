import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
type OrderExtraServiceProps = Readonly<{
  selectedPackage: string;
}>;

function OrderExtraService({ selectedPackage }: OrderExtraServiceProps) {
  // Steuert, ob nach Auswahl der Nachbewirtung zusätzlich eine Uhrzeit abgefragt wird.
  const [refresh, setRefresh] = useState(false);
  // Diese Konfiguration erzeugt die Eingabefelder und ihre Namen für FormData.
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
      hidden: selectedPackage !== "paket-1",
    },
    {
      id: "extra_tee",
      label: "Tee:",
      value_id: "Tee_value",
      Placeholder: "Kanne 4pax",
      hidden: selectedPackage !== "paket-1",
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
      hidden: selectedPackage === "paket-3",
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
      hidden: selectedPackage === "paket-3",
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
  // function handleSelectPackage(selectedPackage: string) {
  //   if (selectedPackage === "paket-2") {
  //     const newSelects = extraServiceData.filter(
  //       (datas) => datas.label !== "Wasser:" && datas.label !== "Tee:",
  //     );
  //     return newSelects;
  //   } else if (selectedPackage === "paket-3") {
  //     const newSelects = extraServiceData.filter(
  //       (datas) =>
  //         datas.label !== "Wasser:" &&
  //         datas.label !== "Tee:" &&
  //         datas.label !== "Softdrinks:" &&
  //         datas.label !== "Obst:",
  //     );
  //     return newSelects;
  //   } else return extraServiceData;
  // }

  // const filteredSelects = handleSelectPackage(selectedPackage);
  // console.log(selectedPackage);c
  const filteredSelects = extraServiceData;
  return (
    <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start border border-border rounded-xl bg-card-foreground/20 p-3">
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-xl font-bold text-muted-foreground">
          Zusatzleistungen
        </h2>
        <div className="flex flex-col gap-2">
          {filteredSelects
            ? filteredSelects.map((service) => (
                <div
                  className="flex justify-between  gap-2 border-b border-border pb-2 "
                  key={service.id}
                  hidden={service.hidden}
                >
                  <Label
                    key={service.id}
                    className="cursor-pointer w-fit text-sm text-muted-foreground"
                    htmlFor={service.id}
                  >
                    {service.label}
                  </Label>
                  <Input
                    onChange={service.onChange}
                    type={service.type || "number"}
                    id={service.value_id}
                    placeholder={service.Placeholder}
                    name={service.id}
                    className="w-50 text-muted-foreground placeholder:text-muted "
                  />
                </div>
              ))
            : []}
        </div>
        {refresh && (
          // Das Zeitfeld wird nur benötigt, wenn die Nachbewirtung aktiviert ist.
          <div className="flex gap-2 py-0.5 px-2 text-muted-foreground">
            <Label htmlFor="startzeit" className="w-1/2">
              Nachbewirtung:
            </Label>
            <Input
              type="time"
              id="startzeit"
              name="extra_nachbewirtungUhrzeit"
              required
              className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderExtraService;
