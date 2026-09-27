import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function OrderRefreshmentForm() {
  const refreshmentFields = [
    { id: "name", name: "refreshmentName", label: "Name:", type: "text" },
    { id: "personenZahl", name: "pax", label: "Personen:", type: "number" },
    { id: "email", name: "email", label: "E-mail:", type: "email" },
    { id: "startzeit", name: "startTime", label: "Startzeit:", type: "time" },
    { id: "endzeit", name: "endTime", label: "Endzeit:", type: "time" },
    {
      id: "kundenbewirtung",
      name: "customerService",
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
                field.type === "time"
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
