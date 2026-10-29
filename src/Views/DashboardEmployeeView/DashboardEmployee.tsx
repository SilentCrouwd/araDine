import { useEffect, useState } from "react";

import { format, parseISO } from "date-fns";
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
import { useOrderContext } from "@/context/RefreshmentContext";
import type { Refreshments, RefreshmentWithAdditionalServices, Rooms } from "@/types/types";
import {
  fetchRefreshmentsByDateAndLocation,
  updateRefreshmentStatus,
} from "@/hooks/SupaBaseAPI";

function DashboardEmployee() {
  const orderContext = useOrderContext();
  const locations = orderContext.state.location;
  // Enthält die vom Server geladenen Bewirtungen samt zugehörigen Zusatzleistungen.
  const [selectedRefreshments, setSelectedRefreshments] = useState<
    RefreshmentWithAdditionalServices[]
  >([]);
  // Speichert den ausgewählten Standort und das ausgewählte Datum.
  const [selectedLocationName, setSelectedLocationName] = useState(
    () => sessionStorage.getItem("araDine.dashboard.location") ?? "",
  );
  const [date, setDate] = useState<Date | undefined>(() => {
    const storedDate = sessionStorage.getItem("araDine.dashboard.date");
    return storedDate ? parseISO(storedDate) : new Date();
  });
  const [open, setOpen] = useState(false);
  // Ermittelt den vollständigen Standort anhand des ausgewählten Namens.
  const currLocation = locations.find(
    (location) => location.name === selectedLocationName,
  )?.id;

  // Formatiert das Datum passend zum gespeicherten Format YYYY-MM-DD.
  const selectedDate = date ? format(date, "yyyy-MM-dd") : undefined;

  // Lädt die Bewirtungen erneut, sobald Standort oder Datum geändert wurden.
  useEffect(() => {
    async function loadCurrBewirtungen() {
      // Ohne beide Filterwerte wird keine Datenbankabfrage gestartet.
      if (currLocation && selectedDate) {
        const selectedRefresh = await fetchRefreshmentsByDateAndLocation(
          selectedDate,
          currLocation,
        );
        if (selectedRefresh) {
          const today = format(new Date(), "yyyy-MM-dd");
          const currentTime = format(new Date(), "HH:mm");

          const toMarkDone = selectedRefresh.filter(
            (ref) =>
              ref.status === "Geplant" &&
              (selectedDate < today ||
                (selectedDate === today &&
                  ref.end_time.slice(0, 5) <= currentTime)),
          );

          await Promise.all(
            toMarkDone.map((ref) =>
              updateRefreshmentStatus("Erledigt", ref.id),
            ),
          );

          const idsToMarkDone = new Set(toMarkDone.map((ref) => ref.id));

          const updatedRefreshments = selectedRefresh.map((ref) =>
            idsToMarkDone.has(ref.id) ? { ...ref, status: "Erledigt" } : ref,
          );

          setSelectedRefreshments(updatedRefreshments);
        }
      }
    }
    loadCurrBewirtungen().catch((error) => {
      console.error("Fehler beim Laden der Bewirtungen:", error);
    });
  }, [selectedDate, currLocation]);

  // Ermittelt die Räume des ausgewählten Standorts.
  const selectedRooms =
    locations.find((location) => location.name === selectedLocationName)
      ?.rooms ?? [];

  function updateRoomStatus(selectedRefreshments: Refreshments, rooms: Rooms) {
    const now = new Date();
    const today = format(now, "yyyy-MM-dd");
    const currentTime = format(now, "HH:mm");

    return rooms.map((room) => {
      const refreshment = selectedRefreshments.find(
        (item) => item.room_id === room.id,
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

      // Bei heutigen Bewirtungen ist ein Raum nach der Endzeit wieder frei.
      const endTime = refreshment.end_time.slice(0, 5);

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
          onValueChange={(value) => {
            const locationName = value ?? "";
            setSelectedLocationName(locationName);
            sessionStorage.setItem("araDine.dashboard.location", locationName);
          }}
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
              onSelect={(selectedDate) => {
                setDate(selectedDate);

                if (selectedDate) {
                  sessionStorage.setItem(
                    "araDine.dashboard.date",
                    format(selectedDate, "yyyy-MM-dd"),
                  );
                } else {
                  sessionStorage.removeItem("araDine.dashboard.date");
                }

                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <RoomInfoCard room={updatedRooms} refreshments={selectedRefreshments} />

      {/* Zeigt die Bewirtungen für den ausgewählten Standort und das Datum an. */}
      {/* Jede Karte erhält außerdem die Räume und Zusatzleistungen der Bewirtung. */}
      <div className="w-full p-6  mx-auto flex flex-col bg-card/20 border border-border rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold p-4">Bewirtungen Heute</h2>
        <div className="grid gap-10 grid-cols-1   overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
          {selectedRefreshments.map((refreshment) => (
            <Link
              className="flex w-full gap-2 transition-transform hover:scale-98"
              to={`/araDine/dashboard/refreshment-detail/${refreshment.id}`}
              key={refreshment.id}
            >
              <RefreshmentCard
                refreshment={refreshment}
                rooms={selectedRooms}
                extras={refreshment.additional_services}
              ></RefreshmentCard>
            </Link>
          ))}
        </div>
      </div>

      {/* Übersicht über Räume und deren aktuellen Status */}
      {/* Die Übersicht verknüpft jeden Raum mit seiner Bewirtung für Details und Startzeit. */}
      <div className=" flex flex-col bg-card/20 border border-border py-4 px-6 rounded-xl text-muted-foreground">
        <h2 className="text-lg font-bold   ">Raum Übersicht</h2>
        <div className="flex flex-col px-1 ">
          <div className="grid grid-cols-4">
            <p>Räume</p> <p>Startzeit</p> <p>Status</p>
            <p>Aktion</p>
          </div>

          <RoomStatusOverview
            rooms={updatedRooms}
            refreshments={selectedRefreshments}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardEmployee;
