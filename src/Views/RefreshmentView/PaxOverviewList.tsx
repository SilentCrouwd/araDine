import { Card, CardHeader, CardContent } from "@/components/ui/card";
import type { Teilnehmer } from "@/types/types";
import { User, Utensils } from "lucide-react";
type PaxOverviewProps = Readonly<{
  pax: Teilnehmer;
}>;

function PaxOverviewList({ pax }: PaxOverviewProps) {
  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl font-bold text-muted-foreground">
          Personen Mittagessen
        </h2>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground">
          <h3 className="mb-2 flex items-center gap-2 font-bold">
            <Utensils className="size-5" />
            Teilnehmer
          </h3>
          <div className="grid grid-cols-2 gap-2 border-b border-border/50 pb-2 text-xs uppercase tracking-wider text-muted-foreground/80">
            <p>Name</p>
            <p>Abteilung</p>
          </div>
          {/* Ab hier wird dasnn mit map dynamisch eingelesen erst speichern als Array von Personen  */}
          {pax.map((participant, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-center gap-2 border-b border-border/50 py-2 font-semibold last:border-b-0"
            >
              <p className="flex items-center gap-2 capitalize">
                <User className="size-5 shrink-0 text-green-500" />
                <span className="wrap-break-word">{participant.name}</span>
              </p>
              <p className="wrap-break-word capitalize">
                {participant.abteilung}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default PaxOverviewList;
