import React from "react";
import { cn } from "cn";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function DashboardEmployee() {
  const items = [
    { label: "LHM", value: "LHM" },
    { label: "LEX", value: "LEX" },
    { label: "MCC", value: "MCC" },
  ];
  const [date, setDate] = React.useState<Date>();
  return (
    <div className="flex flex-col py-4 px-2 gap-4  md:flex-row">
      <div className="gap-4  grid grid-cols-2">
        <Select items={items}>
          <SelectTrigger className="w-45 p-5 bg-card/20 hover:bg-transparent ">
            <SelectValue
              placeholder="Standort"
              className="text-muted-foreground "
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                data-empty={!date}
                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground p-5 hover:bg-transparent bg-card/20"
              />
            }
          >
            {date ? (
              <span className="text-muted-foreground">
                {format(date, "PPP")}
              </span>
            ) : (
              <span className="text-muted-foreground w-30 ">Pick a date</span>
            )}
            <CalendarIcon className="text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold ">5</span>
          <br></br>
          <span>Räume belegt</span>
        </div>
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold">5</span>
          <br></br>
          <span>Räume Service</span>
        </div>
        <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4">
          <span className="text-2xl font-bold">5</span>
          <br></br>
          <span>Räume Frei</span>
        </div>
      </div>
      <div className="w-full flex flex-col bg-card/20 border border-border rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold p-4">Bewirtungen Heute</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card/20 border border-border rounded-xl text-muted-foreground text-center p-4"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
// // Dashboard Employee
// Header: Räume belegt,Räume Gebucht, Bewirtungen Gesamt, Datumsauswahl
// Datumsauswahl via Select
//  Main: Bewirtung Today Board: Auflistung der heutigen Bewirtungen
// Die Bewirtung Karte  anklickbar.
// Footer: Räume abräumen:Auflistung aller Bewirtungen die abgeräumt werden müssen
// Footer: Farblicher status: Bewirtung abschließen
// Klicken: für Detailansicht, ID-Übergabe durch Link Adresse.
