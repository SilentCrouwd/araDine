import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function OrderExtraService() {
  return (
    <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start border border-border rounded-xl bg-card/20 p-3">
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-xl font-bold text-muted-foreground">
          Zusatzleistungen
        </h2>
        <div className="flex items-center gap-2">
          <Label
            className="cursor-pointer w-fit text-lg text-muted-foreground"
            htmlFor="extra-service"
          >
            Extra Service
          </Label>
          <Input
            id="extra-service"
            className="cursor-pointer w-6"
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
}

export default OrderExtraService;
