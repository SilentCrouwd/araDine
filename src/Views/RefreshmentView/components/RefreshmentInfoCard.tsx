import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DetailRow from "@/components/DetailRow";
import type { RefreshmentWithAdditionalServices } from "@/types/types";
import { Ban, CalendarDays, CircleCheckBig, Receipt, User } from "lucide-react";

type RefreshmentInfoCardProps = Readonly<{
  refreshment: RefreshmentWithAdditionalServices;
}>;

// Badge-Farben je Status, als volle Tailwind-Klassen.
const statusColors: Record<string, string> = {
  Geplant: "bg-blue-500/20 text-blue-500",
  Erledigt: "bg-green-500/20 text-green-500",
  Abrechnungsbereit: "bg-amber-500/20 text-amber-500",
};

function RefreshmentInfoCard({ refreshment }: RefreshmentInfoCardProps) {
  const sections = [
    {
      title: "Kunde",
      Icon: User,
      rows: [
        ["Name", refreshment.customer_name],
        ["E-Mail", refreshment.customer_email],
      ],
    },
    {
      title: "Bewirtung",
      Icon: CalendarDays,
      rows: [
        ["Personen", refreshment.participant_count],
        [
          "Bewirtungsart",
          refreshment.is_customer_refreshment ? "Kundenbewirtung" : "Intern",
        ],
        ["Anlass", refreshment.occasion || "-"],
        [
          "Mittagessen",
          refreshment.lunch_provided ? (
            <CircleCheckBig className="h-5 text-green-500" />
          ) : (
            <Ban className="h-5 text-red-500" />
          ),
        ],
      ],
    },
    {
      title: "Abrechnung",
      Icon: Receipt,
      rows: [
        ["Kostenstelle", refreshment.cost_center || "-"],
        ["Buchungskreis", refreshment.company_code || "-"],
        ["Abteilung", refreshment.department || "-"],
      ],
    },
  ];

  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-muted-foreground">
          Bewirtungsdaten
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
              <DetailRow key={label as string} label={label as string}>
                {value}
              </DetailRow>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RefreshmentInfoCard;
