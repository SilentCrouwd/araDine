import { useState, type ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrderParticipantsField from "./OrderParticipantsField";

function OrderMoreInformationForm() {
  // Aktiviert die Erfassung externer Teilnehmender für die Mittagsverpflegung.
  const [lunch, setLunch] = useState(false);

  // Die main_-Feldnamen werden beim Absenden von OrderForm den Bewirtungsdaten zugeordnet.
  const additionalFields = [
    {
      id: "main_company_code",
      label: "Buchungskreis:",
      type: "text",
      required: true,
    },
    { id: "main_department", label: "Abteilung:", type: "text" },
    {
      id: "main_cost_center",
      label: "Kostenstelle:",
      type: "text",
      required: true,
    },
    { id: "main_occasion", label: "Anlass:", type: "text" },
    {
      id: "main_lunch_provided",
      label: "Mittagsverpflegung:",
      type: "checkbox",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setLunch(e.target.checked),
    },
  ];

  return (
    <div className="h-fit w-full rounded-xl border border-border bg-card/20 p-2 text-muted-foreground">
      <h2 className="p-2 text-xl font-bold">Weitere Angaben</h2>
      <div className="rounded-xl bg-accent-foreground/50 p-3">
        {additionalFields.map((field) => (
          <div
            key={field.id}
            className="flex flex-col gap-1.5 border-b border-border/50 py-2 last:border-b-0"
          >
            <Label
              htmlFor={field.id}
              className="text-xs uppercase tracking-wider text-muted-foreground/80"
            >
              {field.label}
            </Label>
            <Input
              onChange={field.onChange}
              type={field.type}
              id={field.id}
              className={field.type === "checkbox" ? "w-40 p-0" : "w-full"}
              name={field.id.toLowerCase()}
              required={field.required ?? false}
            />
          </div>
        ))}
      </div>
      {lunch && (
        <div className="mt-3 flex w-full flex-col rounded-xl bg-accent-foreground/50 p-3">
          <h2 className="pb-2 text-xl font-bold">Personen Angaben</h2>
          <p className="flex items-center gap-2 text-sm text-foreground">
            <AlertTriangle className="h-4 w-4 text-red-600" /> Bitte nur Externe
            Teilnehmer eintragen.
          </p>
          <p className="flex items-center gap-2 text-sm text-foreground">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Bitte nur einen Teilnehmer pro Zeile
          </p>

          <div className="flex gap-2 py-0.5">
            <OrderParticipantsField />{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderMoreInformationForm;
