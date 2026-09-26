import OrderPackageForm from "./OrderPackegeForm";
import { useEffect, useState } from "react";
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
import OrderExtraService from "./OrderExtraService";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { fetchStandorte } from "@/Hooks/SupaBaseAPI";
import type { StandorteMitRaeumen } from "@/Types/types";

function OrderForm() {
  // Zustände für die ausgewählten Werte in der Standort- und Raum-Auswahl.
  const [locations, setLocations] = useState<StandorteMitRaeumen>([]);

  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [selectedRoom, setSelectedRoom] = useState("");

  async function handleLocationChange() {
    const newLocation = await fetchStandorte();

    setLocations(newLocation ?? []);
  }

  useEffect(() => {
    handleLocationChange();
  }, []);

  // Holt den aktuell ausgewählten Standort inklusive seiner Räume.
  const selectedLocationItem = locations.find(
    (item) => item?.name === selectedLocation,
  );

  return (
    // Hauptformular für die Bewirtungsbestellung.
    <form className="p-4 flex flex-col items-center gap-4">
      {/* Standort- und Raum-Auswahl */}
      <div className="flex p-4 w-full justify-between sm:justify-evenly">
        <Select
          items={locations?.map((location) => ({
            label: location?.name,
            value: location?.name,
          }))}
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
              {locations.map((item) => (
                <SelectItem key={item?.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={selectedLocationItem?.raeume.map((room) => ({
            label: room.name,
            value: room.name,
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
              {selectedLocationItem?.raeume.map((room) => (
                <SelectItem key={room.id} value={room.name}>
                  {room.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex w-full flex-col gap-4">
          <OrderRefreshmentForm />
          <OrderPackageForm />
          <OrderExtraService />
        </div>
        <div className="flex w-full flex-col gap-4">
          <OrderMoreInformationForm />
          <div></div>
        </div>
      </div>
      <Button
        type="submit"
        disabled={!selectedLocation || !selectedRoom}
        variant="default"
        className="w-full mt-5 mx-auto p-5 text-lg flex items-center justify-center sm:w-120"
      >
        Abschicken
        <Send className="h-5 w-5 ml-2" />
      </Button>
    </form>
  );
}
export default OrderForm;
