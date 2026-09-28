import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function OrderRefreshmentForm() {
  const refreshmentFields = [
    { id: "name", name: "main_kunden_name", label: "Name:", type: "text" },
    {
      id: "personenZahl",
      name: "main_personen_zahl",
      label: "Personen:",
      type: "number",
    },
    { id: "email", name: "main_kunden_email", label: "E-mail:", type: "email" },
    {
      id: "startzeit",
      name: "main_startzeit",
      label: "Startzeit:",
      type: "time",
    },
    { id: "endzeit", name: "main_endzeit", label: "Endzeit:", type: "time" },
    { id: "datum", name: "main_datum", label: "Datum:", type: "date" },
    {
      id: "kundenbewirtung",
      name: "main_kundenBewirtung",
      label: "Kundenbewirtung:",
      type: "checkbox",
    },
  ] as const;

  return (
    <div className="w-full flex flex-col gap-3 text-muted-foreground border border-border rounded-xl bg-card-foreground/20 p-3">
      <h2 className="text-xl font-bold">Bewirtungsbeleg</h2>

      <div className="flex flex-col gap-2">
        {refreshmentFields.map((field) => (
          <div
            key={field.id}
            className=" flex items-center justify-between gap-2 border-b border-border px-2 pb-2"
          >
            <Label
              htmlFor={field.id}
              className="cursor-pointer w-1/2 text-sm text-muted-foreground"
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              name={field.name}
              type={field.type}
              required
              className={
                field.type === "time" || "date"
                  ? "w-50 [&::-webkit-calendar-picker-indicator]:invert"
                  : "w-50 text-muted-foreground placeholder:text-muted"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderRefreshmentForm;
