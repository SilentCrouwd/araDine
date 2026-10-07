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
import type { Bewirtungen, Raeume } from "@/Types/types";

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
  const selectedRefreshments = date
    ? refreshmentsAtSelectedLocation.filter(
        (refreshment) => refreshment.datum === selectedDate,
      )
    : [];

  // Ermittelt die Räume des ausgewählten Standorts.
  const selectedRooms =
    locations.find((location) => location.name === selectedLocationName)
      ?.raeume ?? [];

  // Räume filtern todo:

  // wenn Heute bewirung in diesem raum dann Service

  function updateRoomStatus(selectedRefreshments: Bewirtungen, rooms: Raeume) {
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const currentTime = format(now, "HH:mm");

    return rooms.map((room) => {
      const refreshment = selectedRefreshments.find(
        (item) => item.raum_id === room.id,
      );

      if (selectedDate && selectedDate < today) {
        return { ...room, status: "Frei" };
      }

      if (!refreshment) {
        return { ...room, status: "Frei" };
      }

      if (selectedDate && selectedDate > today) {
        return { ...room, status: "Service" };
      }

      const endTime = refreshment.endzeit.slice(0, 5);

      if (currentTime > endTime) {
        return { ...room, status: "Frei" };
      }

      return { ...room, status: "Service" };
    });
  }

  const updatedRooms = updateRoomStatus(selectedRefreshments, selectedRooms);
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
        <div className="grid gap-10 grid-cols-1   overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
          {selectedRefreshments.map((refreshment) => (
            <Link
              className="flex  w-full gap-2"
              to={`araDine/dashboard/refreshment-detail/${refreshment.id}`}
              key={refreshment.id}
            >
              <RefreshmentCard
                refreshment={refreshment}
                rooms={selectedRooms}
                extras={orderContext.state.extra.filter(
                  (extra) => extra.bewirtung_id === refreshment.id,
                )}
              ></RefreshmentCard>
            </Link>
          ))}
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

          <RoomStatusOverview rooms={updatedRooms} refreshments={selectedRefreshments} />
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
