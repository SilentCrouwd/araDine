import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

function PaxOverviewList({
  participants,
}: {
  participants: { name: string; department: string }[];
}) {
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
        {participants.map((participant, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-2 border-b border-border py-2 "
          >
            <p className="flex items-center">
              <User className="h-4 w-4 inline-block mr-2" /> {participant.name}
            </p>
            <p>{participant.department}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default PaxOverviewList;
