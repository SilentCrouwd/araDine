import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { BewirtungenMitExtras } from "@/Types/types";
import { Ban, CircleCheckBig } from "lucide-react";

type RefreshmentInfoCardProps = Readonly<{
  refreshment: BewirtungenMitExtras;
}>;

function RefreshmentInfoCard({ refreshment }: RefreshmentInfoCardProps) {
  return (
    <Card className=" h-fit w-full border border-border bg-card/20 p-2 ">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
          Bewirtungsdaten:
        </h2>
      </CardHeader>
      <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 ">
          <p>Name:</p> <p>{refreshment.kunden_name}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 ">
          <p>Personen:</p> <p>{refreshment.personen_zahl}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 wrap-break-word">
          <p>E-mail:</p> <p>{refreshment.kunden_email}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Kostenstelle:</p> <p>{refreshment.kostenstelle || "-"}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Bewirtungsart:</p>
          <p>{refreshment.kundenBewirtung ? "Kundenbewirtung" : "Intern"}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Buchungskreis:</p> <p>{refreshment.buchungskreis || "-"}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Abteilung:</p> <p>{refreshment.abteilung || "-"}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Anlass:</p> <p>{refreshment.anlass || "-"}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Mittagessen:</p>{" "}
          {refreshment.mittagsverpflegung ? (
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
