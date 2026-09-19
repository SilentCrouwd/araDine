import { useState, type ChangeEvent } from "react";
import OrderparticipantsField from "./OrderParticipantsField";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrderParticipantsField from "./OrderParticipantsField";

function OrderMoreInformationForm() {
  // Der Toggle bestimmt, ob im Formular zusätzliche Teilnehmer- oder Zeitangaben
  // für die Mittagsverpflegung bzw. Nachbewirtung angezeigt werden.
  const [lunch, setLunch] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Standardfelder für die Zusatzinformationen des Belegs.
  // Checkboxen schalten zusätzliche Abschnitte ein oder aus.
  const additionalFields = [
    { id: "buchungskreis", label: "Buchungskreis:", type: "text" },
    { id: "abteilung", label: "Abteilung:", type: "text" },
    { id: "anlass", label: "Anlass:", type: "text" },
    {
      id: "mittagsverpflegung",
      label: "Mittagsverpflegung:",
      type: "checkbox",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setLunch(e.target.checked),
    },
    {
      id: "nachbewirtung",
      label: "Nachbewirtung:",
      type: "checkbox",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setRefresh(e.target.checked),
    },
  ];
  return (
    <div className="w-full  text-muted-foreground border border-border rounded-xl bg-card/20">
      <h2 className="text-xl font-bold p-2">Weitere Angaben</h2>
      {additionalFields.map((field) => (
        <div key={field.id} className="flex gap-2 py-0.5 px-2">
          <Label htmlFor={field.id} className="w-1/2">
            {field.label}
          </Label>
          <Input
            onChange={field.onChange}
            type={field.type}
            id={field.id}
            className="w-50 "
          />
        </div>
      ))}
      {/* Wird nur bei aktivierter Mittagsverpflegung angezeigt */}
      {lunch && (
        <div className="w-full flex flex-col  text-muted-foreground rounded-xl">
          <h2 className="text-xl font-bold p-2">Personen Angaben</h2>
          <p className=" px-2 flex items-center gap-2 text-foreground text-sm">
            <AlertTriangle className="h-4 w-4 text-red-600" /> Bitte nur Externe
            Teilnehmer eintragen.
          </p>
          <p className=" px-2 flex items-center gap-2 text-foreground text-sm">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Bitte nur einen Teilnehmer pro Zeile
          </p>

          <div className="flex gap-2 py-0.5 px-2">
            <OrderParticipantsField />
          </div>
        </div>
      )}
      {/* Wird nur bei aktivierter Nachbewirtung angezeigt */}
      {refresh && (
        <div className="flex gap-2 py-0.5 px-2">
          <Label htmlFor="startzeit" className="w-1/2">
            Nachbewirtung:
          </Label>
          <Input
            type="time"
            id="startzeit"
            required
            className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
          />
        </div>
      )}
    </div>
  );
}

export default OrderMoreInformationForm;
