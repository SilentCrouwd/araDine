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
  fetchBewirtungenByStandortUndRaum,
  insertBewirtung,
} from "@/Hooks/SupaBaseAPI";
import type { NeueBewirtung, NeueZusatzleistung } from "@/Types/types";
import { useOrderContext } from "@/Context/RefreshmentContext";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router";

function toaster(type: string, description: string) {
  toast.add({
    type: type,
    description: description,
  });
}

function OrderForm() {
  // Zustände für die ausgewählten Werte in der Standort- und Raum-Auswahl.
  // Der Paketstatus wird zusätzlich zum Radiowert verwendet, um das Absenden zu steuern.
  const navigate = useNavigate();
  const [currDate, setCurrDate] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const orderContext = useOrderContext();
  const [selectedRoom, setSelectedRoom] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Verhindert das native Neuladen der Seite und liest alle benannten Formularfelder aus.
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Überführt die Formularwerte in das Datenbankformat der Bewirtung.
    // Alle Felder mit Präfix "main_" einsammeln (Präfix wird entfernt).
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
      personen_zahl: Number(main.personen_zahl),
      // Nicht angehakte Checkboxen fehlen in FormData.
      kundenBewirtung: main.kundenBewirtung === "on",
      mittagsverpflegung: main.mittagsverpflegung === "on",
      anlass: String(main.anlass ?? "") || null,
      standort_id: location?.id ?? null,
      raum_id:
        location?.raeume.find((r) => r.name === selectedRoom)?.id ?? null,
      status: "Geplant",
    } as NeueBewirtung;

    orderContext.dispatch({ type: "ADD_ORDER", payload: newRefreshment });

    // Wandelt die Felder mit dem Präfix "extra_" in ein Objekt für die Zusatzleistungen um.
    const extraService: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("extra_")) {
        // "sub_" vom Key entfernen, falls gewünscht:
        const cleanKey = key.replace("extra_", "");
        extraService[cleanKey] = value;
      }

      // Hier ist die neueZusatzleistung als Objekt vom Typ NeueZusatzleistung.
    }

    if (selectedPackage === "paket-1") {
      extraService.kaffee = String(Math.ceil(newRefreshment.personen_zahl / 4));
    }

    if (selectedPackage === "paket-2") {
      extraService.kaffee = String(Math.ceil(newRefreshment.personen_zahl / 4));
      extraService.wasser = String(Math.ceil(newRefreshment.personen_zahl / 4));
      extraService.tee = String(Math.ceil(newRefreshment.personen_zahl / 4));
    }
    if (selectedPackage === "paket-3") {
      extraService.kaffee = String(Math.ceil(newRefreshment.personen_zahl / 4));
      extraService.wasser = String(Math.ceil(newRefreshment.personen_zahl / 4));
      extraService.tee = String(Math.ceil(newRefreshment.personen_zahl / 4));
      extraService.obst = String(newRefreshment.personen_zahl);
      extraService.softdrinks = String(newRefreshment.personen_zahl);
    }

    const newExtraService: NeueZusatzleistung = extraService;
    orderContext.dispatch({
      type: "ADD_EXTRA_SERVICE",
      payload: newExtraService,
    });

    const filteredRoomId = orderContext.state.location
      .find((location) => location.name === selectedLocation)
      ?.raeume.find((room) => room.name === selectedRoom)?.id;

    const currBew = await fetchBewirtungenByStandortUndRaum(
      filteredRoomId ?? "",
      currDate,
    );
    const conflict = currBew?.some(
      (bew) =>
        newRefreshment.startzeit < bew.endzeit &&
        newRefreshment.endzeit > bew.startzeit,
    );
    if (conflict) {
      toaster("error", "Zeit Konflikt bitte andere Uhrzeit auswählen ");
      return;
    } else {
      await insertBewirtung(
        newRefreshment,
        newExtraService,
        orderContext.state.participants,
      );
      toaster("success", "Danke! Wir haben ihren Termin gebucht");
    }
    await navigate(-1);
  }

  // Dient dazu, im zweiten Auswahlfeld nur Räume des gewählten Standorts anzubieten.
  const selectedLocationItem = orderContext.state.location.find(
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
        {/* Die verfügbaren Räume hängen vom aktuell ausgewählten Standort ab. */}
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
        // Erst absenden, wenn Standort, Raum und Verpflegungspaket gewählt wurden.
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
