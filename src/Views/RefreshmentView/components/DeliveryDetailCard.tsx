import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

function DeliveryDetailCard() {
  return (
    <Card className=" h-fit  w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
          Lieferdetails:
        </h2>
        <p className="italic flex gap-2 items-center">
          <AlertTriangle className="h-4 text-red-700" />1 Flasche oder Kanne pro
          4Pax{" "}
        </p>
        <p className="italic flex gap-2 items-center">
          <AlertTriangle className="h-4 text-red-700" />1 Flasche Softdrinks pro
          Pax
        </p>
      </CardHeader>
      <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
        <div className="grid grid-cols-2">
          <p>Raum:</p> <p>12:00</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Startzeit:</p> <p>12:00</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Endzeit:</p> <p>13:00</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Paket:</p> <p>Paket 1</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Kaffee:</p> <p>Ja</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Tee:</p> <p>Ja</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Wasser:</p> <p>Ja</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Softdrinks:</p> <p>Nein</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <p>Süßware:</p> <p>Ja</p>
        </div>
        {/* Hier wird ein Array mit map Raus gerändert maybe auch ein Obj mal schauen */}
        <div className="grid grid-cols-2 gap-2">
          <p>Zusatz:</p>{" "}
          <p>Bitte 5 flaschen wasser und süßigkeiten um 16 uhr</p>
        </div>
      </CardContent>
    </Card>
  );
}
export default DeliveryDetailCard;
