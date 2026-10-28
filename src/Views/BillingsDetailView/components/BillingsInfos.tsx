import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DetailRow from "@/components/DetailRow";
import { useOrderContext } from "@/context/RefreshmentContext";
import type { BewirtungenMitExtras } from "@/types/types";
import { CalendarDays, Receipt, User } from "lucide-react";

type BillingsInfosProps = Readonly<{
  refreshment: BewirtungenMitExtras;
}>;

// Badge-Farben je Status, als volle Tailwind-Klassen.
const statusColors: Record<string, string> = {
  Geplant: "bg-blue-500/20 text-blue-500",
  Erledigt: "bg-green-500/20 text-green-500",
  Abrechnungsbereit: "bg-amber-500/20 text-amber-500",
};

function formatRefreshmentType(isCustomerRefreshment: boolean | null) {
  if (isCustomerRefreshment === null) {
    return "-";
  }
  return isCustomerRefreshment ? "Kundenbewirtung" : "Intern";
}

function formatLunchProvision(hasLunchProvision: boolean | null) {
  if (hasLunchProvision === null) {
    return "-";
  }
  return hasLunchProvision ? "Ja" : "Nein";
}

function BillingsInfos({ refreshment }: BillingsInfosProps) {
  const orderContext = useOrderContext();
  const location = orderContext.state.location.find(
    (location) => location.id === refreshment.standort_id,
  );
  const roomName =
    location?.raeume.find((room) => room.id === refreshment.raum_id)?.name ??
    "-";

  const sections = [
    {
      title: "Kunde",
      Icon: User,
      rows: [
        ["Name", refreshment.kunden_name],
        ["E-Mail", refreshment.kunden_email],
      ],
    },
    {
      title: "Bewirtung",
      Icon: CalendarDays,
      rows: [
        [
          "Datum",
          new Date(`${refreshment.datum}T00:00:00`).toLocaleDateString("de-DE"),
        ],
        ["Personen", String(refreshment.personen_zahl)],
        ["Paket", refreshment.paket.replaceAll("_", " ")],
        ["Standort", location?.name ?? "-"],
        ["Raum", roomName],
        ["Anlass", refreshment.anlass || "-"],
        ["Bewirtungsart", formatRefreshmentType(refreshment.kundenBewirtung)],
        [
          "Mittagsverpflegung",
          formatLunchProvision(refreshment.mittagsverpflegung),
        ],
      ],
    },
    {
      title: "Abrechnung",
      Icon: Receipt,
      rows: [
        ["Kostenstelle", refreshment.kostenstelle || "-"],
        ["Buchungskreis", refreshment.buchungskreis || "-"],
        ["Abteilung", refreshment.abteilung || "-"],
      ],
    },
  ];

  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-muted-foreground">
          Rechnungsübersicht
        </h2>
        <span
          className={`rounded-full px-3 py-1 text-sm font-bold ${statusColors[refreshment.status] ?? "bg-muted text-muted-foreground"}`}
        >
          {refreshment.status}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground"
          >
            <h3 className="mb-2 flex items-center gap-2 font-bold">
              <section.Icon className="size-5" />
              {section.title}
            </h3>
            {section.rows.map(([label, value]) => (
              <DetailRow key={label} label={label}>
                {value}
              </DetailRow>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default BillingsInfos;
