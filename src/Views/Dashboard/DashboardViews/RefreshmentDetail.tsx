import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Ban, CircleCheckBig, User } from "lucide-react";

function RefreshmentDetail() {
  const mittagsverpflegung = true;
  return (
    <div className="flex flex-col justify-evenly sm:flex-row gap-4 py-4 px-6">
      <div className="w-full flex flex-col gap-4">
        <Card className=" h-fit w-full border border-border bg-card/20 p-2 ">
          <CardHeader>
            <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
              Bewirtungsdaten:
            </h2>
          </CardHeader>
          <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
            <div className="grid grid-cols-2 gap-2">
              <p>Name:</p> <p>John Doe</p>
            </div>
            <div className="grid grid-cols-2">
              <p>PersonenZahl:</p> <p>15</p>
            </div>
            <div className="grid grid-cols-2">
              <p>E-mail:</p> <p>john.doe@example.com</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Kostenstelle:</p> <p>KST-2401</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Standort:</p> <p>LHM</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Bewirtungsart:</p> <p>Kundenbewirtung</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Buchungskreis:</p> <p>1000</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Abteilung:</p> <p>Vertrieb</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Anlass:</p> <p>Jahresmeeting</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Mittagsverpflegung:</p>{" "}
              {mittagsverpflegung ? (
                <CircleCheckBig className=" h-5 text-green-500" />
              ) : (
                <Ban className=" h-5 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit w-full border border-border bg-card/20 p-2">
          <CardHeader>
            <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground">
              Personen:
            </h2>
          </CardHeader>
          <CardContent className="text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2">
            <div className="grid grid-cols-2 gap-2">
              <p>Name</p>
              <p>Abteilung</p>
            </div>
            {/* Ab hier wird dasnn mit map dynamisch eingelesen erst speichern als Array von Personen  */}
            <div className="grid grid-cols-2 gap-2 border-b border-border py-2 ">
              <p className="flex items-center">
                <User className="h-4 w-4 inline-block mr-2" /> Max Musermann
              </p>
              <p>Vertrieb</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-border py-2 ">
              <p className="flex items-center">
                <User className="h-4 w-4 inline-block mr-2" /> Max Musermann
              </p>
              <p>Vertrieb</p>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-border py-2 ">
              <p className="flex items-center">
                <User className="h-4 w-4 inline-block mr-2" /> Max Musermann
              </p>
              <p>Vertrieb</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-4 ">
        <Card className=" h-fit  w-full border border-border bg-card/20 p-2">
          <CardHeader>
            <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
              Lieferdetails:
            </h2>
            <p className="italic flex gap-2 items-center">
              <AlertTriangle className="h-4 text-red-700" />1 Flasche oder Kanne
              pro 4Pax{" "}
            </p>
            <p className="italic flex gap-2 items-center">
              <AlertTriangle className="h-4 text-red-700" />1 Flasche Softdrinks
              pro Pax
            </p>
          </CardHeader>
          <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
            <div className="grid grid-cols-2">
              <p>Raum:</p> <p>12:00</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Startzeit:</p> <p>12:00</p>
            </div>
            <div className="grid grid-cols-2">
              <p>Endzeit:</p> <p>13:00</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Paket:</p> <p>Paket 1</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Kaffee:</p> <p>Ja</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Tee:</p> <p>Ja</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Wasser:</p> <p>Ja</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Softdrinks:</p> <p>Nein</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p>Süßware:</p> <p>Ja</p>
            </div>
            {/* Hier wird ein Array mit map Raus gerändert maybe auch ein Obj mal schauen */}
            <div className="grid grid-cols-2 gap-2">
              <p>Zusatz:</p>{" "}
              <p>Bitte 5 flaschen wasser und süßigkeiten um 16 uhr</p>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit w-full border border-border bg-card/20 p-2">
          <CardHeader>
            <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground">
              Lieferung tatsächlich:
            </h2>
          </CardHeader>
          <CardContent className="text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2">
            <form>
              <div className="grid grid-cols-2 gap-2">
                <p>Kaffee:</p> <Input defaultValue="0" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Tee:</p> <Input defaultValue="0" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Wasser:</p> <Input defaultValue="0" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <p>Softdrinks:</p> <Input defaultValue="0" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <p>Süßware:</p> <Input defaultValue="0" />
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <p>Servicepauschale:</p>
                <Select>
                  <SelectTrigger className="w-full  bg-card/20 hover:bg-transparent ">
                    <SelectValue
                      placeholder="Personen"
                      className="text-muted-foreground text-base lg:text-xl"
                    />
                  </SelectTrigger>
                  <SelectContent side="left" align="start" sideOffset={2}>
                    <SelectGroup>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="10">1</SelectItem>
                      <SelectItem value="20">2</SelectItem>
                      <SelectItem value="50">3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className=" w-50  px-4 my-2"
                  type="submit"
                >
                  Abschließen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default RefreshmentDetail;
