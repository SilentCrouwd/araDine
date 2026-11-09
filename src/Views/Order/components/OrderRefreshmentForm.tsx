import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type OrderRefreshmentFormProps = Readonly<{
  onChangeDate: (date: string) => void;
}>;

function handleStyle(fieldType: string) {
  if (fieldType === "time" || fieldType === "date") {
    return "w-full [&::-webkit-calendar-picker-indicator]:invert";
  }
  if (fieldType === "checkbox") {
    return "order-1 w-7";
  }
  return "w-full text-muted-foreground placeholder:text-muted";
}

function OrderRefreshmentForm({ onChangeDate }: OrderRefreshmentFormProps) {
  const refreshmentFields = [
    { id: "name", name: "main_customer_name", label: "Name:", type: "text" },
    {
      id: "personenZahl",
      name: "main_participant_count",
      label: "Personen:",
      type: "number",
    },
    {
      id: "email",
      name: "main_customer_email",
      label: "E-mail:",
      type: "email",
    },
    {
      id: "start_time",
      name: "main_start_time",
      label: "Startzeit:",
      type: "time",
    },
    { id: "end_time", name: "main_end_time", label: "Endzeit:", type: "time" },
    {
      id: "date",
      name: "main_date",
      label: "Datum:",
      type: "date",
    },
    {
      id: "kundenbewirtung",
      name: "main_is_customer_refreshment",
      label: "Kundenbewirtung",
      type: "checkbox",
    },
  ];

  return (
    <div className="h-fit w-full rounded-xl border border-border bg-card/20 p-2 text-muted-foreground">
      <h2 className="p-2 text-xl font-bold">Bewirtungsbeleg</h2>

      <div className="rounded-xl bg-accent-foreground/50 p-3">
        {refreshmentFields.map((field) => (
          <div
            key={field.id}
            className={`flex ${field.type === "checkbox" ? "flex-row items-center" : "flex-col"}  gap-1.5 border-b border-border/50 py-2 last:border-b-0`}
          >
            <Label
              htmlFor={field.id}
              className={`cursor-pointer text-xs uppercase tracking-wider text-muted-foreground/80 ${field.type === "checkbox" ? "order-2" : ""}`}
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              name={field.name}
              {...(field.type === "checkbox" ? { label: field.label } : {})}
              type={field.type}
              onChange={
                field.type === "date"
                  ? (e) => onChangeDate(e.currentTarget.value)
                  : undefined
              }
              required={field.name !== "main_is_customer_refreshment"}
              className={handleStyle(field.type)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderRefreshmentForm;
