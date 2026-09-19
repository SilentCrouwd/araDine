import OrderPackageForm from "./OrderPackegeForm";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import OrderRefreshmentForm from "./OrderRefreshmentForm";
import OrderMoreInformationForm from "./OrderMoreInformationForm";

function OrderForm() {
  // Zustände für die ausgewählten Werte in der Standort- und Raum-Auswahl.
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  // Definiert die verfügbaren Standorte und die Räume, die zu jedem Standort gehören.
  // Diese Daten werden in den Select-Feldern dynamisch dargestellt.
  const locationItems = [
    { label: "LHM", value: "LHM", rooms: ["Room 102", "Room 102"] },
    { label: "LEX", value: "LEX", rooms: ["Room 201", "Room 202"] },
    { label: "MCC", value: "MCC", rooms: ["Room 301", "Room 302"] },
  ];

  // Holt den aktuell ausgewählten Standort inklusive seiner Räume.
  const selectedLocationItem = locationItems.find(
    (item) => item.value === selectedLocation,
  );

  return (
    // Hauptformular für die Bewirtungsbestellung.
    <form className="p-4 flex flex-col items-center gap-4">
      {/* Standort- und Raum-Auswahl */}
      <div className="flex p-4 w-full justify-between sm:justify-evenly">
        <Select
          items={locationItems}
          value={selectedLocation}
          onValueChange={(value) => {
            setSelectedLocation(value ?? "");
            setSelectedRoom("");
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
              {locationItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={selectedLocationItem?.rooms.map((room) => ({
            label: room,
            value: room,
          }))}
          value={selectedRoom}
          onValueChange={(value) => setSelectedRoom(value ?? "")}
        >
          <SelectTrigger className="w-fit p-5 bg-card/20 hover:bg-transparent ">
            <SelectValue
              placeholder="Raum"
              className="text-muted-foreground text-base lg:text-xl"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectedLocationItem?.rooms.map((room) => (
                <SelectItem key={room} value={room}>
                  {room}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <OrderRefreshmentForm />
        <OrderMoreInformationForm />
      </div>
      <OrderPackageForm />
    </form>
  );
}
export default OrderForm;
