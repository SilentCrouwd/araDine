import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function OrderExtraService() {
  const extraServiceData = [
    {
      id: "wasser",
      label: "Wasser:",
      value_id: "wasser_value",
      Placeholder: "Flaschen 0.75L",
    },
    {
      id: "tee",
      label: "Tee:",
      value_id: "Tee_value",
      Placeholder: "Kanne 4pax",
    },
    {
      id: "nuesse",
      label: "Nüsse:",
      value_id: "nuesse_value",
      Placeholder: "Portionen 45g",
    },
    {
      id: "obst",
      label: "Obst:",
      value_id: "obst_value",
      Placeholder: "Stück",
    },
    {
      id: "suessware",
      label: "Süssware:",
      value_id: "suessware_value",
      Placeholder: "Riegel",
    },
    {
      id: "softdrinks",
      label: "Softdrinks:",
      value_id: "softdrinks_value",
      Placeholder: "Flaschen 0.33L ",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start border border-border rounded-xl bg-card-foreground/20 p-3">
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-xl font-bold text-muted-foreground">
          Zusatzleistungen
        </h2>
        <div className="flex flex-col gap-2">
          {extraServiceData.map((service) => (
            <div
              className="flex justify-between  gap-2 border-b border-border pb-2 "
              key={service.id}
            >
              <Label
                key={service.id}
                className="cursor-pointer w-fit text-sm text-muted-foreground"
                htmlFor={service.id}
              >
                {service.label}
              </Label>
              <Input
                type="number"
                id={service.value_id}
                placeholder={service.Placeholder}
                name={service.id}
                className="w-50 text-muted-foreground placeholder:text-muted "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderExtraService;
