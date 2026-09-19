import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function OrderRefreshmentForm() {
  return (
    // Formular für die Stammdaten der Bewirtung.
    // Enthält Kontakt- und Zeitangaben sowie die Kundenbewirtung.
    <div className="w-full  text-muted-foreground border border-border rounded-xl bg-card/20">
      <h2 className="text-xl font-bold p-2">Bewirtungsbeleg</h2>
      <div className="flex gap-2 py-0.5 px-2">
        <Label htmlFor="name" className="w-1/2">
          Name:
        </Label>
        <Input type="text" id="name" required className="w-50 " />
      </div>
      <div className="flex gap-2 py-0.5 px-2">
        <Label htmlFor="personenZahl" className="w-1/2">
          Personen:
        </Label>
        <Input type="number" id="personenZahl" required className="w-50 " />
      </div>
      <div className="flex gap-2 py-0.5 px-2">
        <Label htmlFor="email" className="w-1/2">
          E-mail:
        </Label>
        <Input type="email" id="email" required className="w-50 " />
      </div>
      <div className="flex gap-2 py-0.5 px-2">
        <Label htmlFor="startzeit" className="w-1/2">
          Startzeit:
        </Label>
        <Input
          type="time"
          id="startzeit"
          required
          className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
        />
      </div>
      <div className="flex gap-2 py-0.5 px-2">
        <Label htmlFor="endzeit" className="w-1/2">
          Endzeit:
        </Label>
        <Input
          type="time"
          id="endzeit"
          required
          className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
        />
      </div>
      <div className="flex gap-2 py-0.5 px-2  ">
        <Label htmlFor="kundenbewirtung" className="w-1/2">
          Kundenbewirtung:
        </Label>
        <Input type="text" id="kundenbewirtung" required className="w-50 " />
      </div>
    </div>
  );
}

export default OrderRefreshmentForm;
