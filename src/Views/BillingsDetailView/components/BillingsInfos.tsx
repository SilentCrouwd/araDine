import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOrderContext } from "@/context/RefreshmentContext";
import type { BewirtungenMitExtras } from "@/types/types";

type BillingsInfosProps = Readonly<{
  refreshment: BewirtungenMitExtras;
}>;

function BillingsInfos({ refreshment }: BillingsInfosProps) {
  const orderContext = useOrderContext();
  const rows = [
    ["Name", refreshment.kunden_name],
    ["E-Mail", refreshment.kunden_email],
    [
      "Datum",
      new Date(`${refreshment.datum}T00:00:00`).toLocaleDateString("de-DE"),
    ],
    ["Personen", String(refreshment.personen_zahl)],
    ["Paket", refreshment.paket.replaceAll("_", " ")],
    ["Status", refreshment.status],
    [
      "Standort-ID",
      orderContext.state.location.find(
        (location) => location.id === refreshment.standort_id,
      )?.name ?? "-",
    ],
    [
      "Raum-ID",
      orderContext.state.location
        .find((location) => location.id === refreshment.standort_id)
        ?.raeume.find((room) => room.id === refreshment.raum_id)?.name ?? "-",
    ],
    ["Kostenstelle", refreshment.kostenstelle || "-"],
    ["Buchungskreis", refreshment.buchungskreis || "-"],
    ["Abteilung", refreshment.abteilung || "-"],
    ["Anlass", refreshment.anlass || "-"],
    [
      "Bewirtungsart",
      refreshment.kundenBewirtung === null
        ? "-"
        : refreshment.kundenBewirtung
          ? "Kundenbewirtung"
          : "Intern",
    ],
    [
      "Mittagsverpflegung",
      refreshment.mittagsverpflegung === null
        ? "-"
        : refreshment.mittagsverpflegung
          ? "Ja"
          : "Nein",
    ],
  ];

  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl font-bold text-muted-foreground underline underline-offset-3">
          Rechnungsübersicht
        </h2>
      </CardHeader>
      <CardContent className="m-2 rounded-xl bg-card-foreground/30 p-2 text-base text-muted-foreground shadow-2xl/20">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 last:border-b-0"
          >
            <p>{label}:</p>
            <p className="break-words">{value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default BillingsInfos;
