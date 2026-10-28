import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";

type OrderCurrPackageFormProps = Readonly<{
  currPackage: string;
  onCurrPackageChange: (name: string) => void;
}>;
function OrdercurrPackageForm({
  currPackage,
  onCurrPackageChange,
}: OrderCurrPackageFormProps) {
  // Steuert sowohl die markierte Radio-Option als auch die darunter angezeigte Beschreibung.

  // Gibt je nach Auswahl eine kurze Paketbeschreibung zurück.
  // Diese Info wird unter den Radio-Buttons angezeigt.
  function handleCurrPackageInfo() {
    if (currPackage === "paket-1") {
      return (
        <p>
          <span>Paket-1: enthält die Standardverpflegung.</span>

          <span className="flex items-center gap-2">
            <Coffee />
            Kaffee,Milch und Zucker
          </span>
        </p>
      );
    }
    if (currPackage === "paket-2") {
      return (
        <p>
          <span className="tracking-tighter">
            Paket-2: enthält die erweiterte Verpflegung.
          </span>

          <span className="flex items-center gap-2 tracking-tight">
            <Coffee />
            Kaffee,Tee,Milch,Zucker und Wasser
          </span>
        </p>
      );
    }
    if (currPackage === "paket-3") {
      return (
        <p>
          <span className="tracking-tighter">
            Paket-3: enthält die Premium-Verpflegung.
          </span>
          <span className="flex items-start gap-2 tracking-tight">
            <Coffee className="shrink-0" />
            <span>Kaffee, Tee, Milch, Zucker, Wasser, Obst und Softdrinks</span>
          </span>
        </p>
      );
    }
    return null;
  }
  return (
    // Auswahl der Verpflegungspakete mit erläuternder Vorschau.
    <div className="h-fit w-full rounded-xl border border-border bg-card/20 p-2 text-muted-foreground">
      <h2 className="p-2 text-xl font-bold">Pakete</h2>
      <div className="rounded-xl bg-accent-foreground/50 p-3">
        <div className="flex w-full justify-center">
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="paket-1"
              className="text-base underline underline-offset-2"
            >
              Paket 1:
            </Label>
            <Input
              onChange={() => {
                onCurrPackageChange("paket-1");
                // Meldet dem übergeordneten Formular, dass eine gültige Paketauswahl vorliegt.
              }}
              checked={currPackage === "paket-1"}
              type="radio"
              name="main_paket"
              value="Paket_1"
              required
              id="paket-1"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="main_paket-2"
              className="text-base underline underline-offset-2"
            >
              Paket 2:
            </Label>
            <Input
              onChange={() => {
                onCurrPackageChange("paket-2");
              }}
              checked={currPackage === "paket-2"}
              type="radio"
              name="main_paket"
              value="Paket_2"
              id="paket-2"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="paket-3"
              className="text-base underline underline-offset-2"
            >
              Paket 3:
            </Label>
            <Input
              onChange={() => {
                onCurrPackageChange("paket-3");
              }}
              checked={currPackage === "paket-3"}
              type="radio"
              name="main_paket"
              value="Paket_3"
              id="paket-3"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
        </div>
        {currPackage && (
          <div className="mt-3 rounded-xl border border-border/50 p-2">
            {handleCurrPackageInfo()}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdercurrPackageForm;
