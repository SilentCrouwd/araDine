import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

function Order() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-350 lg:mx-auto border border-border lg:text-xl">
      <header className=" flex justify-between items-center border-b border-l border-r border-border bg-background px-6 py-4 ">
        <Button variant="link" onClick={() => navigate("/araDine/")}>
          <ArrowBigLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          Bestellung
        </h1>
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          AraDine
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
export default Order;
