import { useState } from "react";

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
import RefreshmentCard from "./components/RefreshmentCard";
import { Link } from "react-router";
import RoomInfoCard from "./components/RoomInfoCard";
import RoomStatusOverview from "./components/RoomStatusOverview";
import { useOrderContext } from "@/Context/RefreshmentContext";

function DashboardEmployee() {
  const orderContext = useOrderContext();
  const locations = orderContext.state.location;

  // Speichert den ausgewählten Standort und das ausgewählte Datum.
  const [selectedLocationName, setselectedLocationName] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  // Ermittelt den vollständigen Standort anhand des ausgewählten Namens.
  const currLocation = locations.find(
    (location) => location.name === selectedLocationName,
  );

  // Formatiert das Datum passend zum gespeicherten Format YYYY-MM-DD.
  const selectedDate = date ? format(date, "yyyy-MM-dd") : undefined;

  // Filtert die Bewirtungen zuerst nach dem ausgewählten Standort.
  const refreshmentsAtSelectedLocation = currLocation
    ? orderContext.state.refreshments.filter(
        (refreshment) => refreshment.standort_id === currLocation.id,
      )
    : [];

  // Filtert die bereits nach Standort gefilterten Bewirtungen zusätzlich nach Datum.
  // Ohne ausgewähltes Datum wird eine leere Liste angezeigt.
  const refreshmentsForSelectedLocationAndDate = date
    ? refreshmentsAtSelectedLocation.filter(
        (refreshment) => refreshment.datum === selectedDate,
      )
    : [];

  // Ermittelt die Räume des ausgewählten Standorts.
  const selectedRooms =
    locations.find((location) => location.name === selectedLocationName)
      ?.raeume ?? [];

  // Räume filtern todo:

  const refreshmentRoomIds = refreshmentsForSelectedLocationAndDate.map(
    (refreshment) => refreshment.raum_id,
  );
  // wenn Heute bewirung in diesem raum dann Service
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const currentTime = format(now, "HH:mm");

  const isSelectedDateToday = selectedDate === today;

  const updatedRooms = selectedRooms.map((room) =>
    refreshmentRoomIds.includes(room.id)
      ? { ...room, status: "Service" }
      : room,
  );

  // wenn Uhrzeit < als Startzeit -30min dann Frei grün
  // wenn Urzeit > als Startzeitund Uhrzeit kleiner als Endzeit +30 min dann Service HellRot
  // wenn Uhrzeit > als Endzeit dann Fertig Orange

  return (
    <div className="flex flex-col py-4 px-4 gap-4  ">
      <div className="  grid grid-cols-2 self-center md:gap-5">
        {/* Auswahl des Standorts */}
        <Select
          value={selectedLocationName}
          onValueChange={(value) => setselectedLocationName(value ?? "")}
          items={locations.map((location) => ({
            label: location.name,
            value: location.name,
          }))}
        >
          <SelectTrigger className="w-fit p-5 bg-card/20 hover:bg-transparent ">
            <SelectValue
              placeholder="Standort"
              className="text-muted-foreground text-base lg:text-xl"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Auswahl des Datums */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                data-empty={!date}
                className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground p-5 hover:bg-transparent bg-card/20 w-fit"
              />
            }
          >
            {date ? (
              <span className="text-muted-foreground text-base lg:text-xl">
                {format(date, "dd.MM.yyyy")}
              </span>
            ) : (
              <span className="text-muted-foreground w-fit text-base lg:text-xl">
                Datum
              </span>
            )}
            <CalendarIcon className="text-muted-foreground" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <RoomInfoCard room={updatedRooms} />

      {/* Zeigt die Bewirtungen für den ausgewählten Standort und das Datum an. */}
      <div className="w-full p-6  mx-auto flex flex-col bg-card/20 border border-border rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold p-4">Bewirtungen Heute</h2>
        <div className="grid gap-10 grid-cols-1  max-h-75 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
          <Link
            className="flex justify-start gap-2"
            to={`araDine/dashboard/refreshment-detail/${"2"}`}
          >
            {refreshmentsForSelectedLocationAndDate.map((refreshment) => (
              <RefreshmentCard
                key={refreshment.id}
                title={refreshment.kunden_name}
                startTime={refreshment.startzeit.slice(0, 5)}
                endTime={refreshment.endzeit.slice(0, 5)}
                numberPax={refreshment.personen_zahl}
                date={new Date(refreshment.datum).toLocaleDateString("de-DE")}
                room={orderContext.state.location.map(
                  (location) =>
                    location.raeume.find(
                      (raum) => raum.id === refreshment.raum_id,
                    )?.name,
                )}
                // Hier muss noch das Extra eingelesen werden.
                refresh={true}
                refreshmentId={refreshment.id}
              ></RefreshmentCard>
            ))}
          </Link>
        </div>
      </div>

      {/* Übersicht über Räume und deren aktuellen Status */}
      <div className=" flex flex-col bg-card/20 border border-border py-4 px-6 rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold   ">Raum Übersicht</h2>
        <div className="flex flex-col px-1 ">
          <div className="grid grid-cols-4">
            <p>Räume</p> <p>Startzeit</p> <p>Status</p>
            <p>Aktion</p>
          </div>

          <RoomStatusOverview roomOverview={updatedRooms} />
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
