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

function ActualDeliveryForm() {
  return (
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
                  <SelectItem value="0">0Pax</SelectItem>
                  <SelectItem value="10">10Pax</SelectItem>
                  <SelectItem value="20">20Pax</SelectItem>
                  <SelectItem value="50">50Pax</SelectItem>
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
  );
}

export default ActualDeliveryForm;
