import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Fragment } from "react";
import DetailRow from "@/components/DetailRow";
import { useOrderContext } from "@/context/RefreshmentContext";
import type { RefreshmentWithAdditionalServices } from "@/types/types";
import {
  AlertTriangle,
  BottleWine,
  CheckCircle,
  Croissant,
  Milk,
  Package,
  Truck,
} from "lucide-react";
type DeliveryDetailCardProps = Readonly<{
  refreshment: RefreshmentWithAdditionalServices;
}>;

function handleExtraStatus(extras: {
  name: string | null;
  menge: string | null;
}) {
  if (extras.name === null) return;
  else if (extras.menge === "on") {
    return (
      <DetailRow label={extras.name}>
        <CheckCircle className="text-green-500 w-5 h-5" />
      </DetailRow>
    );
  } else if (extras.name === "nachbewirtungUhrzeit") {
    if (extras.menge === null) return;
    return <DetailRow label="Uhrzeit">{extras.menge.slice(0, 5)}</DetailRow>;
  } else if (extras.name === "wasser") {
    return (
      <DetailRow label={extras.name}>
        <span className="flex items-center gap-2">
          {extras.menge}
          <BottleWine />
        </span>
      </DetailRow>
    );
  } else if (extras.name === "tee" || extras.name === "kaffee") {
    return (
      <DetailRow label={extras.name}>
        <span className="flex items-center gap-2">
          {extras.menge}
          <Milk />
        </span>
      </DetailRow>
    );
  } else if (extras.name === "sonstige") {
    return <DetailRow label={extras.name}>{extras.menge}</DetailRow>;
  } else {
    return (
      <DetailRow label={extras.name}>
        <span className="flex items-center gap-2">
          {extras.menge}
          {extras.name === "softdrinks" ? <BottleWine /> : <Croissant />}
        </span>
      </DetailRow>
    );
  }
}

function DeliveryDetailCard({ refreshment }: DeliveryDetailCardProps) {
  const orderContext = useOrderContext();

  const locationName = orderContext.state.location.find(
    (location) => location.id === refreshment.location_id,
  )?.name;
  const roomName = orderContext.state.location
    .find((standort) => standort.id === refreshment.location_id)
    ?.rooms.find((room) => room.id === refreshment.room_id)?.name;

  const extraRows = refreshment.additional_services.map((extra) => ({
    name: extra.service_name,
    menge: extra.service_value,
  }));

  return (
    <Card className="h-fit w-full border border-border bg-card/20 p-2">
      <CardHeader>
        <h2 className="text-xl font-bold text-muted-foreground">
          Lieferdetails
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
      <CardContent className="flex flex-col gap-3">
        <div className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground">
          <h3 className="mb-2 flex items-center gap-2 font-bold">
            <Truck className="size-5" />
            Lieferung
          </h3>
          <DetailRow label="Raum">
            {locationName} {roomName}
          </DetailRow>
          <DetailRow label="Startzeit">
            {refreshment.start_time.slice(0, 5)}
          </DetailRow>
          <DetailRow label="Endzeit">
            {refreshment.end_time.slice(0, 5)}
          </DetailRow>
          <DetailRow label="Paket">
            {refreshment.package.replace("_", " ")}
          </DetailRow>
        </div>

        <div className="rounded-xl bg-accent-foreground/50 p-3 text-muted-foreground">
          <h3 className="mb-2 flex items-center gap-2 font-bold">
            <Package className="size-5" />
            Zusatzleistungen
          </h3>
          {extraRows.map((extra, index) => (
            <Fragment key={index}>{handleExtraStatus(extra)}</Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default DeliveryDetailCard;
