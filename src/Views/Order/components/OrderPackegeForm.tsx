import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { useState } from "react";

function OrderPackageForm() {
  // Speichert das aktuell ausgewählte Paket.
  const [selectedPackage, setSelectedPackage] = useState("");

  // Gibt je nach Auswahl eine kurze Paketbeschreibung zurück.
  // Diese Info wird unter den Radio-Buttons angezeigt.
  function handlePackageInfo() {
    if (selectedPackage === "paket-1") {
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
    if (selectedPackage === "paket-2") {
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
    if (selectedPackage === "paket-3") {
      return (
        <p>
          <span className="tracking-tighter">
            Paket-3: enthält die Premium-Verpflegung.
          </span>
          <span className="flex items-start gap-2 tracking-tight">
            <Coffee className="shrink-0" />
            <span>
              Kaffee, Tee, Milch, Zucker, Wasser, Obst, Snacks und Softdrinks
            </span>
          </span>
        </p>
      );
    }
    return null;
  }
  return (
    // Auswahl der Verpflegungspakete mit erläuternder Vorschau.
    <div className="w-full text-muted-foreground border border-border rounded-xl bg-card/20">
      <h2 className="text-xl font-bold p-2 ">Pakete</h2>
      <div className=" w-full flex justify-center">
        <div className="flex flex-col p-2 w-fit items-center ">
          <Label
            htmlFor="paket-1"
            className="text-base underline underline-offset-2"
          >
            Paket 1:
          </Label>
          <Input
            onChange={() => setSelectedPackage("paket-1")}
            checked={selectedPackage === "paket-1"}
            type="radio"
            name="paket"
            id="paket-1"
            className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
          />
        </div>
        <div className="flex flex-col p-2 w-fit items-center ">
          <Label
            htmlFor="paket-2"
            className="text-base underline underline-offset-2"
          >
            Paket 2:
          </Label>
          <Input
            onChange={() => setSelectedPackage("paket-2")}
            checked={selectedPackage === "paket-2"}
            type="radio"
            name="paket"
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
            onChange={() => setSelectedPackage("paket-3")}
            checked={selectedPackage === "paket-3"}
            type="radio"
            name="paket"
            id="paket-3"
            className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
          />
        </div>
      </div>
      {selectedPackage && (
        <div className="p-2 mt-5 bg-card-foreground/20 rounded-xl m-2">
          {handlePackageInfo()}
        </div>
      )}
    </div>
  );
}

export default OrderPackageForm;
