import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Teilnehmer } from "@/Types/types";
import { User } from "lucide-react";
type PaxOverviewProps = Readonly<{
  pax: Teilnehmer;
}>;

function PaxOverviewList({ pax }: PaxOverviewProps) {
  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground">
          Personen Mittagessen:
        </h2>
      </CardHeader>
      <CardContent className="text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2">
        <div className="grid grid-cols-2 gap-2">
          <p>Name</p>
          <p>Abteilung</p>
        </div>
        {/* Ab hier wird dasnn mit map dynamisch eingelesen erst speichern als Array von Personen  */}
        {pax.map((participant, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 border-b border-border/50 py-2 "
          >
            <p className=" grid grid-cols-3 items-center capitalize ">
              <User className="col-span-1  text-green-500" />{" "}
              <span className="col-span-2">{participant.name}</span>
            </p>
            <p className="capitalize">{participant.abteilung}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default PaxOverviewList;
