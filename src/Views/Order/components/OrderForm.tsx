import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Coffee } from "lucide-react";

function OrderForm() {
  // Zustände für Standort, Raum und optionale Formularbereiche
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [lunch, setLunch] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  function handlePackageInfo() {
    if (selectedPackage === "paket-1") {
      return (
        <p>
          <span>Paket-1: enthält die Standardverpflegung.</span>

          <span className="flex items-center gap-2">
            <Coffee />
            Kaffee,Milch und Zucker
          </span>
        </p>
      );
    }
    if (selectedPackage === "paket-2") {
      return (
        <p>
          <span className="tracking-tighter">
            Paket-2: enthält die erweiterte Verpflegung.
          </span>

          <span className="flex items-center gap-2 tracking-tight">
            <Coffee />
            Kaffee,Tee,Milch,Zucker und Wasser
          </span>
        </p>
      );
    }
    if (selectedPackage === "paket-3") {
      return (
        <p>
          <span className="tracking-tighter">
            Paket-3: enthält die Premium-Verpflegung.
          </span>
          <span className="flex items-start gap-2 tracking-tight">
            <Coffee className="shrink-0" />
            <span>
              Kaffee, Tee, Milch, Zucker, Wasser, Obst, Snacks und Softdrinks
            </span>
          </span>
        </p>
      );
    }
    return null;
  }

  // Standorte und die dazugehörigen Räume

  const locationItems = [
    { label: "LHM", value: "LHM", rooms: ["Room 102", "Room 102"] },
    { label: "LEX", value: "LEX", rooms: ["Room 201", "Room 202"] },
    { label: "MCC", value: "MCC", rooms: ["Room 301", "Room 302"] },
  ];
  const selectedLocationItem = locationItems.find(
    (item) => item.value === selectedLocation,
  );

  // Dynamische Felder für die Karte "Weitere Angaben"
  const additionalFields = [
    { id: "buchungskreis", label: "Buchungskreis:", type: "text" },
    { id: "abteilung", label: "Abteilung:", type: "text" },
    { id: "anlass", label: "Anlass:", type: "text" },
    {
      id: "mittagsverpflegung",
      label: "Mittagsverpflegung:",
      type: "checkbox",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setLunch(e.target.checked),
    },
    {
      id: "nachbewirtung",
      label: "Nachbewirtung:",
      type: "checkbox",
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setRefresh(e.target.checked),
    },
  ];
  return (
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
        {/* Karte: Bewirtungsbeleg */}
        <div className="w-full  text-muted-foreground border border-border rounded-xl bg-card/20">
          <h2 className="text-xl font-bold p-2">Bewirtungsbeleg</h2>
          <div className="flex gap-2 py-0.5 px-2">
            <Label htmlFor="name" className="w-1/2">
              Name:
            </Label>
            <Input type="text" id="name" required className="w-50 " />
          </div>
          <div className="flex gap-2 py-0.5 px-2">
            <Label htmlFor="personenZahl" className="w-1/2">
              Personen:
            </Label>
            <Input type="number" id="personenZahl" required className="w-50 " />
          </div>
          <div className="flex gap-2 py-0.5 px-2">
            <Label htmlFor="email" className="w-1/2">
              E-mail:
            </Label>
            <Input type="email" id="email" required className="w-50 " />
          </div>
          <div className="flex gap-2 py-0.5 px-2">
            <Label htmlFor="startzeit" className="w-1/2">
              Startzeit:
            </Label>
            <Input
              type="time"
              id="startzeit"
              required
              className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          <div className="flex gap-2 py-0.5 px-2">
            <Label htmlFor="endzeit" className="w-1/2">
              Endzeit:
            </Label>
            <Input
              type="time"
              id="endzeit"
              required
              className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
          <div className="flex gap-2 py-0.5 px-2  ">
            <Label htmlFor="kundenbewirtung" className="w-1/2">
              Kundenbewirtung:
            </Label>
            <Input
              type="text"
              id="kundenbewirtung"
              required
              className="w-50 "
            />
          </div>
        </div>
        {/* Karte: Weitere Angaben */}
        <div className="w-full  text-muted-foreground border border-border rounded-xl bg-card/20">
          <h2 className="text-xl font-bold p-2">Weitere Angaben</h2>
          {additionalFields.map((field) => (
            <div key={field.id} className="flex gap-2 py-0.5 px-2">
              <Label htmlFor={field.id} className="w-1/2">
                {field.label}
              </Label>
              <Input
                onChange={field.onChange}
                type={field.type}
                id={field.id}
                className="w-50 "
              />
            </div>
          ))}
          {/* Wird nur bei aktivierter Mittagsverpflegung angezeigt */}
          {lunch && (
            <div className="w-full flex flex-col  text-muted-foreground rounded-xl">
              <h2 className="text-xl font-bold p-2">Personen Angaben</h2>
              <p className=" px-2 flex items-center gap-2 text-foreground text-sm">
                <AlertTriangle className="h-4 w-4 text-red-600" /> Bitte nur
                Externe Teilnehmer eintragen.
              </p>
              <p className=" px-2 flex items-center gap-2 text-foreground text-sm">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                Bitte nur einen Teilnehmer pro Zeile
              </p>

              <div className="flex gap-2 py-0.5 px-2">
                <Label htmlFor="teilnehmerName" className="w-1/2">
                  Teilnehmer:
                </Label>
                <textarea
                  id="teilnehmerName"
                  className="w-50 border border-border rounded-xl text-foreground p-2 text-base"
                />
              </div>
            </div>
          )}
          {/* Wird nur bei aktivierter Nachbewirtung angezeigt */}
          {refresh && (
            <div className="flex gap-2 py-0.5 px-2">
              <Label htmlFor="startzeit" className="w-1/2">
                Nachbewirtung:
              </Label>
              <Input
                type="time"
                id="startzeit"
                required
                className="w-50 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          )}
        </div>
      </div>
      <div className="w-full text-muted-foreground border border-border rounded-xl bg-card/20">
        <h2 className="text-xl font-bold p-2 ">Pakete</h2>
        <div className=" w-full flex justify-center">
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="paket-1"
              className="text-base underline underline-offset-2"
            >
              Paket 1:
            </Label>
            <Input
              onChange={() => setSelectedPackage("paket-1")}
              checked={selectedPackage === "paket-1"}
              type="radio"
              name="paket"
              id="paket-1"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="paket-2"
              className="text-base underline underline-offset-2"
            >
              Paket 2:
            </Label>
            <Input
              onChange={() => setSelectedPackage("paket-2")}
              checked={selectedPackage === "paket-2"}
              type="radio"
              name="paket"
              id="paket-2"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
          <div className="flex flex-col p-2 w-fit items-center ">
            <Label
              htmlFor="paket-3"
              className="text-base underline underline-offset-2"
            >
              Paket 3:
            </Label>
            <Input
              onChange={() => setSelectedPackage("paket-3")}
              checked={selectedPackage === "paket-3"}
              type="radio"
              name="paket"
              id="paket-3"
              className=" h-8 w-8  border border-border rounded-xl text-foreground p-2 text-base"
            />
          </div>
        </div>
        <div className="p-2 mt-5 bg-card-foreground/20 rounded-xl m-2">
          {handlePackageInfo()}
        </div>
      </div>
    </form>
  );
}
export default OrderForm;
