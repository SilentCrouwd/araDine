import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function OrderExtraService() {
  const extraServices = ["Wasser", "Softgetränke", "Obst", "Nüsse", "Süßwaren"];

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:items-start border border-border rounded-xl bg-card/20 p-3">
      <div className="w-full flex flex-col gap-3">
        <h2 className="text-xl font-bold text-muted-foreground">
          Zusatzleistungen
        </h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {extraServices.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1"
            >
              <Label
                htmlFor={item.toLowerCase()}
                className="text-base text-muted-foreground"
              >
                {item}
              </Label>
              <Input
                id={item.toLowerCase()}
                type="checkbox"
                className="h-5 w-5 rounded border-border"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderExtraService;
