import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type OrderRefreshmentFormProps = Readonly<{
  onChangeDate: (date: string) => void;
}>;

function OrderRefreshmentForm({ onChangeDate }: OrderRefreshmentFormProps) {
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
    {
      id: "datum",
      name: "main_datum",
      label: "Datum:",
      type: "date",
    },
    {
      id: "kundenbewirtung",
      name: "main_kundenBewirtung",
      label: "Kundenbewirtung:",
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
            className="flex flex-col gap-1.5 border-b border-border/50 py-2 last:border-b-0"
          >
            <Label
              htmlFor={field.id}
              className="cursor-pointer text-xs uppercase tracking-wider text-muted-foreground/80"
            >
              {field.label}
            </Label>
            <Input
              id={field.id}
              name={field.name}
              type={field.type}
              onChange={
                field.type === "date"
                  ? (e) => onChangeDate(e.currentTarget.value)
                  : undefined
              }
              required={field.name !== "main_kundenBewirtung"}
              className={
                field.type === "time" || field.type === "date"
                  ? "w-full [&::-webkit-calendar-picker-indicator]:invert"
                  : "w-full text-muted-foreground placeholder:text-muted"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderRefreshmentForm;
