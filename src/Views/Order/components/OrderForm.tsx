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
import type {
  NeueBewirtung,
  NeueZusatzleistung,
  StandorteMitRaeumen,
} from "@/Types/types";
import { useOrderContext } from "@/Context/RefreshmentContext";
import type { Database } from "@/Types/supabaseTypes";

function getText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function OrderForm() {
  // Zustände für die ausgewählten Werte in der Standort- und Raum-Auswahl.
  const [locations, setLocations] = useState<StandorteMitRaeumen>([]);
  const [selectedPackage, setSelectedPackage] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const orderContext = useOrderContext();
  const [selectedRoom, setSelectedRoom] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newRefreshment: NeueBewirtung = {
      kunden_name: getText(formData, "main_kunden_name"),
      personen_zahl: Number(getText(formData, "main_personen_zahl")),
      kunden_email: getText(formData, "main_kunden_email"),
      startzeit: getText(formData, "main_startzeit"),
      endzeit: getText(formData, "main_endzeit"),
      kundenBewirtung: formData.get("main_kundenBewirtung") === "on",
      kostenstelle: getText(formData, "main_kostenstelle"),
      paket: formData.get(
        "main_paket",
      ) as Database["public"]["Enums"]["paket_enum"],
      anlass: getText(formData, "main_anlass") || null,
      standort_id:
        locations.find((locaton) => locaton.name === selectedLocation)?.id ??
        null,
      raum_id:
        locations
          .find((location) => location.name === selectedLocation)
          ?.raeume.find((raume) => raume.name === selectedRoom)?.id ?? null,
      status: "Ready",
      teilnehmerliste: "",
    };

    console.log(newRefreshment);

    orderContext.dispatch({ type: "ADD_ORDER", payload: newRefreshment });

    const extraService: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("extra_")) {
        // "sub_" vom Key entfernen, falls gewünscht:
        const cleanKey = key.replace("extra_", "");
        extraService[cleanKey] = value;
      }
      // Hier ist die neueZusatzleistung als Objekt vom Typ NeueZusatzleistung.
    }
    const newExtraService: NeueZusatzleistung = extraService;
  }

  async function handleLocationChange() {
    const newLocation = await fetchStandorte();

    setLocations(newLocation ?? []);
  }
  function handlePackageStatus(status: boolean) {
    setSelectedPackage(status);
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
    <form
      className="p-4 flex flex-col items-center gap-4 "
      onSubmit={handleSubmit}
    >
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
          <SelectTrigger className="w-fit p-5 bg-card-foreground/20 hover:bg-transparent ">
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
          <SelectTrigger className="w-fit p-5 bg-card-foreground/20 hover:bg-transparent ">
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
          <OrderPackageForm packageStatus={handlePackageStatus} />
          <OrderExtraService />
        </div>
        <div className="flex w-full flex-col gap-4">
          <OrderMoreInformationForm />
          <div></div>
        </div>
      </div>
      <Button
        type="submit"
        disabled={!selectedLocation || !selectedRoom || !selectedPackage}
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
