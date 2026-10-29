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
import OrderExtraService from "./OrderExtraService";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import {
  fetchRefreshmentsByRoomAndDate,
  insertRefreshment,
} from "@/hooks/SupaBaseAPI";
import type { NewRefreshment } from "@/types/types";
import { useOrderContext } from "@/context/RefreshmentContext";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router";

function toaster(type: string, description: string) {
  toast.add({
    type: type,
    description: description,
  });
}

function OrderForm() {
  // Die Auswahlwerte steuern abhängige Felder; currDate wird für die Konfliktprüfung benötigt.
  const navigate = useNavigate();
  const [currDate, setCurrDate] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const orderContext = useOrderContext();
  const [selectedRoom, setSelectedRoom] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Verhindert das native Neuladen der Seite und sammelt die Formularwerte für die Prüfung.
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const currentDate = String(formData.get("main_date") ?? "");
    const today = new Date().toISOString().split("T")[0];
    const startTime = String(formData.get("main_start_time") ?? "");
    const endTime = String(formData.get("main_end_time") ?? "");
    const hasAfterRefreshment = formData.get("extra_nachbewirtung") === "on";
    const afterRefreshmentTime = String(
      formData.get("extra_nachbewirtungUhrzeit") ?? "",
    );

    // Prüft Zeitregeln, die sich nicht allein durch Pflichtfelder absichern lassen.
    if (currentDate < today) {
      toaster(
        "error",
        "Das aktuelle Datum darf nicht in der Vergangenheit liegen.",
      );
      return;
    }

    if (startTime >= endTime) {
      toaster("error", "Die Startzeit muss vor der Endzeit liegen.");
      return;
    }

    if (
      hasAfterRefreshment &&
      (!afterRefreshmentTime ||
        afterRefreshmentTime <= startTime ||
        afterRefreshmentTime >= endTime)
    ) {
      toaster(
        "error",
        "Die Uhrzeit der Nachbewirtung muss nach der Startzeit und vor der Endzeit liegen.",
      );
      return;
    }

    // Entfernt das Formularpräfix, damit die Feldnamen den Datenbankspalten entsprechen.
    const main: Record<string, FormDataEntryValue> = {};
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("main_")) {
        main[key.slice("main_".length)] = value;
      }
    }

    const location = orderContext.state.location.find(
      (loc) => loc.name === selectedLocation,
    );

    const newRefreshment = {
      ...main,
      participant_count: Number(main.participant_count),
      // Nicht angehakte Checkboxen fehlen in FormData.
      is_customer_refreshment: main.is_customer_refreshment === "on",
      lunch_provided: main.lunch_provided === "on",
      occasion: String(main.occasion ?? "") || null,
      location_id: location?.id ?? null,
      room_id: location?.rooms.find((r) => r.name === selectedRoom)?.id ?? null,
      status: "Geplant",
    } as NewRefreshment;

    // Zusatzleistungen werden getrennt von den Bewirtungsfeldern gespeichert.
    const extraService: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("extra_")) {
        // Das Präfix ist Teil des Formularnamens, nicht des gespeicherten Leistungsnamens.
        const cleanKey = key.replace("extra_", "");
        extraService[cleanKey] = value;
      }
    }

    // Paketmengen richten sich nach der Personenzahl: Kaffee, Tee und Wasser je vier Personen.
    if (selectedPackage === "package-1") {
      extraService.kaffee = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
    }

    if (selectedPackage === "package-2") {
      extraService.kaffee = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
      extraService.wasser = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
      extraService.tee = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
    }
    if (selectedPackage === "package-3") {
      extraService.kaffee = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
      extraService.wasser = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
      extraService.tee = String(
        Math.ceil(newRefreshment.participant_count / 4),
      );
      extraService.obst = String(newRefreshment.participant_count);
      extraService.softdrinks = String(newRefreshment.participant_count);
    }

    const filteredRoomId = orderContext.state.location
      .find((location) => location.name === selectedLocation)
      ?.rooms.find((room) => room.name === selectedRoom)?.id;

    // Erfasst auch Teilüberschneidungen: neuer Start vor bestehendem Ende und neues Ende nach bestehendem Start.
    const currBew = await fetchRefreshmentsByRoomAndDate(
      filteredRoomId ?? "",
      currDate,
    );
    const conflict = currBew?.some(
      (bew) =>
        newRefreshment.start_time < bew.end_time &&
        newRefreshment.end_time > bew.start_time,
    );
    if (conflict) {
      toaster("error", "Zeit Konflikt bitte andere Uhrzeit auswählen ");
      return;
    } else {
      await insertRefreshment(
        newRefreshment,
        extraService,
        orderContext.state.participants,
      );
      toaster("success", "Danke! Wir haben ihren Termin gebucht");
    }
    await navigate(-1);
  }

  // Begrenzt die Raum-Auswahl auf den zuvor gewählten Standort.
  const selectedLocationItem = orderContext.state.location.find(
    (item) => item?.name === selectedLocation,
  );

  return (
    <form
      className="p-4 flex flex-col items-center gap-4 "
      onSubmit={handleSubmit}
    >
      <div className="flex p-4 w-full justify-between sm:justify-evenly">
        {/* Die Standortauswahl speichert den Namen; beim Absenden wird daraus die Datenbank-ID ermittelt. */}
        <Select
          items={orderContext.state.location?.map((location) => ({
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
              {orderContext.state.location?.map((item) => (
                <SelectItem key={item?.id} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={selectedLocationItem?.rooms.map((room) => ({
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
              {selectedLocationItem?.rooms.map((room) => (
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
          <OrderRefreshmentForm onChangeDate={setCurrDate} />
          <OrderPackageForm
            currPackage={selectedPackage}
            onCurrPackageChange={setSelectedPackage}
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <OrderMoreInformationForm />
          <OrderExtraService selectedPackage={selectedPackage} />
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
