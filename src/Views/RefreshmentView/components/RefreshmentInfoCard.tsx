import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Ban, CircleCheckBig } from "lucide-react";

function RefreshmentInfoCard() {
  const mittagsverpflegung = true;
  return (
    <Card className=" h-fit w-full border border-border bg-card/20 p-2 ">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
          Bewirtungsdaten:
        </h2>
      </CardHeader>
      <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
        <div className="grid grid-cols-2 gap-2">
          <p>Name:</p> <p>John Doe</p>
        </div>
        <div className="grid grid-cols-2">
          <p>PersonenZahl:</p> <p>15</p>
        </div>
        <div className="grid grid-cols-2 wrap-break-word">
          <p>E-mail:</p> <p>john.doe@example.com</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Kostenstelle:</p> <p>KST-2401</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Standort:</p> <p>LHM</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Bewirtungsart:</p> <p>Kundenbewirtung</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Buchungskreis:</p> <p>1000</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Abteilung:</p> <p>Vertrieb</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Anlass:</p> <p>Jahresmeeting</p>
        </div>
        <div className="grid grid-cols-2">
          <p>Mittagessen:</p>{" "}
          {mittagsverpflegung ? (
            <CircleCheckBig className=" h-5 text-green-500" />
          ) : (
            <Ban className=" h-5 text-red-500" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default RefreshmentInfoCard;
