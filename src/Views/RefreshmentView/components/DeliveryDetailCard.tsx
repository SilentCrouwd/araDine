import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOrderContext } from "@/Context/RefreshmentContext";
import type { BewirtungenMitExtras } from "@/Types/types";
import {
  AlertTriangle,
  BottleWine,
  CheckCircle,
  Croissant,
  Milk,
} from "lucide-react";
type DeliveryDetailCardPros = {
  refreshment: BewirtungenMitExtras;
};

function handleExtraStatus(extras: {
  name: string | null;
  menge: string | null;
}) {
  if (extras.name === null) return;
  else if (extras.menge === "on") {
    return (
      <div className="grid grid-cols-2 border-b border-border/50 p-2 ">
        <p className="capitalize">{extras.name}:</p>
        <CheckCircle className="text-green-500 w-5 h-5" />
      </div>
    );
  } else if (extras.name === "nachbewirtungUhrzeit") {
    if (extras.menge === null) return;
    return (
      <div className="grid grid-cols-2 border-b border-border/50 p-2 ">
        <p className="capitalize">Uhrzeit:</p>
        <p>{extras.menge.slice(0, 5)}</p>
      </div>
    );
  } else if (extras.name === "wasser" || extras.name == "tee") {
    return (
      <div className="grid grid-cols-2 border-b border-border/50 p-2 ">
        <p className="capitalize">{extras.name}:</p>
        <p className="flex">
          <span className="w-1/5">{extras.menge}</span>
          {extras.name === "tee" ? <Milk /> : <BottleWine />}
        </p>
      </div>
    );
  } else if (extras.name === "sonstige") {
    return (
      <div className="grid grid-cols-2 border-b border-border/50 p-2 ">
        <p className="capitalize">{extras.name}:</p>
        <p>{extras.menge}</p>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-2 border-b border-border/50 p-2 ">
        <p className="capitalize">{extras.name}:</p>
        <p className="flex">
          <span className="w-1/5">{extras.menge}</span>
          {extras.name === "softdrinks" ? <BottleWine /> : <Croissant />}
        </p>
      </div>
    );
  }
}

function DeliveryDetailCard({ refreshment }: DeliveryDetailCardPros) {
  const orderContext = useOrderContext();

  const locationName = orderContext.state.location.find(
    (location) => location.id === refreshment.standort_id,
  )?.name;
  const roomName = orderContext.state.location
    .find((standort) => standort.id === refreshment.standort_id)
    ?.raeume.find((room) => room.id === refreshment.raum_id)?.name;

  const extraRows = refreshment.zusatzleistungen.map((extra) => ({
    name: extra.extra_name,
    menge: extra.extra_value,
  }));

  return (
    <Card className=" h-fit  w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl underline underline-offset-3 font-bold text-muted-foreground ">
          Lieferdetails:
        </h2>
        <p className="italic flex gap-2 items-center">
          <AlertTriangle className="h-4 text-red-700" />1 Flasche oder Kanne pro
          4Pax{" "}
        </p>
        <p className="italic flex gap-2 items-center">
          <AlertTriangle className="h-4 text-red-700" />1 Flasche Softdrinks pro
          Pax
        </p>
      </CardHeader>
      <CardContent className=" text-base bg-card-foreground/30 text-muted-foreground shadow-2xl/20 rounded-xl m-2 p-2 ">
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Raum:</p>{" "}
          <p>
            {locationName} {roomName}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Startzeit:</p> <p>{refreshment.startzeit.slice(0, 5)}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2">
          <p>Endzeit:</p> <p>{refreshment.endzeit.slice(0, 5)}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 gap-2">
          <p>Paket:</p> <p>{refreshment.paket.replace("_", " ")}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-b border-border/50 p-2 gap-2">
          <p>Kaffee:</p>{" "}
          <p className="flex">
            <span className="w-1/5">
              {Math.ceil(refreshment.personen_zahl / 4)}{" "}
            </span>{" "}
            <Milk />
          </p>
        </div>
        {extraRows.map((extra, index) => {
          return <div key={index}>{handleExtraStatus(extra)}</div>;
        })}
      </CardContent>
    </Card>
  );
}
export default DeliveryDetailCard;
