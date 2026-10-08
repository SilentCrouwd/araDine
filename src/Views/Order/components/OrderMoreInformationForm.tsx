import { useState, type ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrderParticipantsField from "./OrderParticipantsField";

function OrderMoreInformationForm() {
  // Der Toggle bestimmt, ob im Formular zusätzliche Teilnehmer- oder Zeitangaben
  // für die Mittagsverpflegung bzw. Nachbewirtung angezeigt werden.
  const [lunch, setLunch] = useState(false);
  // Teilnehmer bleiben während der Formulareingabe als Liste im Komponentenstatus.
  const [participants, setParticipants] = useState<string[]>([]);
  // Standardfelder für die Zusatzinformationen des Belegs.
  // Checkboxen schalten zusätzliche Abschnitte ein oder aus.
  // Die Feldnamen entsprechen den Schlüsseln, die OrderForm beim Submit aus FormData liest.
  const additionalFields = [
    { id: "main_buchungskreis", label: "Buchungskreis:", type: "text" },
    { id: "main_abteilung", label: "Abteilung:", type: "text" },
    { id: "main_kostenstelle", label: "Kostenstelle:", type: "text" },
    { id: "main_anlass", label: "Anlass:", type: "text" },
    {
      id: "main_mittagsverpflegung",
      label: "Mittagsverpflegung:",
      type: "checkbox",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setLunch(e.target.checked),
    },
  ];

  return (
    <div className="w-full  text-muted-foreground border border-border rounded-xl bg-card-foreground/20 p-3">
      <h2 className="text-xl font-bold p-2">Weitere Angaben</h2>
      {additionalFields.map((field) => (
        <div
          key={field.id}
          className="flex gap-2 justify-between  px-2 border-b border-border py-2"
        >
          <Label htmlFor={field.id} className="w-1/2">
            {field.label}
          </Label>
          <Input
            onChange={field.onChange}
            type={field.type}
            id={field.id}
            className={`w-50 ${field.type === "checkbox" ? "w-40  p-0" : ""}`}
            name={field.id.toLowerCase()}
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
            <OrderParticipantsField
              participants={participants}
              onParticipantsChange={setParticipants}
            />{" "}
          </div>
        </div>
      )}
      {/* Versteckte Felder machen die Teilnehmerliste für FormData im übergeordneten Formular verfügbar. */}
      {participants.map((participant, index) => (
        <input
          key={`${participant}-${index}`}
          type="hidden"
          name="main_teilnehmerliste"
          value={participant}
        />
      ))}
    </div>
  );
}

export default OrderMoreInformationForm;
