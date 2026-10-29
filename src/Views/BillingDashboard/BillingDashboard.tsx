import { useOrderContext } from "@/context/RefreshmentContext";
import BillingItem from "./components/BillingItem";
import { fetchRefreshments } from "@/hooks/SupaBaseAPI";
import type { Refreshments } from "@/types/types";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  CalendarClock,
  CircleCheckBig,
  Receipt,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Monatswerte 0-11 wie bei Date.getMonth(), Labels auf Deutsch.
const monthItems = Array.from({ length: 12 }, (_, monthIndex) => ({
  value: String(monthIndex),
  label: new Date(2000, monthIndex).toLocaleDateString("de-DE", {
    month: "long",
  }),
}));

// Eine Statusdefinition steuert sowohl die Kennzahl-Kachel als auch die zugehörige Liste.
const sections = [
  {
    title: "Geplante Bewirtungen",
    status: "Geplant",
    Icon: CalendarClock,
    iconColor: "text-blue-500",
  },
  {
    title: "Erledigte Bewirtungen",
    status: "Erledigt",
    Icon: CircleCheckBig,
    iconColor: "text-green-500",
  },
  {
    title: "Abrechenbare Bewirtungen",
    status: "Abrechnungsbereit",
    Icon: Receipt,
    iconColor: "text-amber-500",
  },
  {
    title: "Abgerechnete Bewirtungen",
    status: "Abgerechnet",
    Icon: BadgeCheck,
    iconColor: "text-purple-500",
  },
];

function BillingDashboard() {
  const orderContext = useOrderContext();
  const [refreshmentData, setRefreshmentData] = useState<Refreshments>([]);

  useEffect(() => {
    async function fetchBillingsData() {
      const responseRefreshmentData = await fetchRefreshments();
      if (!responseRefreshmentData) {
        console.error("Failed to fetch refreshment data");
        return;
      }
      setRefreshmentData(responseRefreshmentData);
    }

    fetchBillingsData().catch(console.error);
  }, []);

  const now = new Date();
  // Stellt gespeicherte Filter wieder her; ohne Auswahl gelten aktueller Monat und aktuelles Jahr.
  const [selectedMonth, setSelectedMonth] = useState(
    () =>
      sessionStorage.getItem("araDine.billing.month") ?? String(now.getMonth()),
  );
  const [selectedYear, setSelectedYear] = useState(
    () =>
      sessionStorage.getItem("araDine.billing.year") ??
      String(now.getFullYear()),
  );

  function changeMonth(month: string) {
    setSelectedMonth(month);
    sessionStorage.setItem("araDine.billing.month", month);
  }

  function changeYear(year: string) {
    setSelectedYear(year);
    sessionStorage.setItem("araDine.billing.year", year);
  }

  // Bietet alle Jahre aus den Daten und das aktuelle Jahr ohne Duplikate, neueste zuerst, an.
  const yearItems = [
    ...new Set([
      now.getFullYear(),
      ...refreshmentData.map((refreshment) =>
        new Date(refreshment.date).getFullYear(),
      ),
    ]),
  ]
    .sort((firstYear, secondYear) => secondYear - firstYear)
    .map((year) => ({ value: String(year), label: String(year) }));

  const monthName = monthItems[Number(selectedMonth)].label;

  // Select-Werte sind Strings; für den Vergleich mit Date-Werten werden sie in Zahlen umgewandelt.
  function isInSelectedMonth(date: string) {
    const refreshmentDate = new Date(date);
    return (
      refreshmentDate.getMonth() === Number(selectedMonth) &&
      refreshmentDate.getFullYear() === Number(selectedYear)
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-evenly gap-2 p-2 pb-0">
        <Select
          value={selectedMonth}
          onValueChange={(value) => value && changeMonth(value)}
          items={monthItems}
        >
          <SelectTrigger className="w-40 bg-card/20 hover:bg-transparent">
            <SelectValue
              className="text-muted-foreground"
              placeholder="Monat"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {monthItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedYear}
          onValueChange={(value) => value && changeYear(value)}
          items={yearItems}
        >
          <SelectTrigger className="w-28 bg-card/20 hover:bg-transparent">
            <SelectValue className="text-muted-foreground" placeholder="Jahr" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {yearItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 pb-0">
        {sections.map((section) => (
          <div
            key={section.status}
            className="flex flex-col items-center bg-card/20 border border-border rounded-xl p-4"
          >
            <section.Icon className={`size-8 mb-1 ${section.iconColor}`} />
            <p className="text-sm text-muted-foreground">
              {section.title} (für {monthName} {selectedYear})
            </p>
            <p className="text-3xl font-bold text-muted-foreground">
              {
                refreshmentData.filter(
                  (ref) =>
                    ref.status === section.status &&
                    isInSelectedMonth(ref.date),
                ).length
              }
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {sections.map((section) => {
          const entries = refreshmentData.filter(
            (ref) =>
              ref.status === section.status && isInSelectedMonth(ref.date),
          );
          return (
            <div
              key={section.status}
              className="flex flex-col bg-card/20 border border-border rounded-xl py-5"
            >
              <h1 className="text-xl font-bold text-muted-foreground underline underline-offset-4 p-2">
                {section.title}:
              </h1>
              <div className="grid grid-cols-1 bg-accent-foreground/50 text-muted-foreground mx-2 rounded-xl">
                {entries.length === 0 ? (
                  <p className="p-4 text-center">Keine Einträge</p>
                ) : (
                  entries.map((ref) => (
                    <BillingItem
                      key={ref.id}
                      id={ref.id}
                      name={ref.customer_name}
                      date={ref.date}
                      location={
                        orderContext.state.location.find(
                          (loc) => loc.id === ref.location_id,
                        )?.name ?? "Unbekannt"
                      }
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BillingDashboard;
