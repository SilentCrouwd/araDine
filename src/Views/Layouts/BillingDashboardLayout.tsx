import { useAuthContext } from "@/context/AuthContetxt";
import { Outlet, useNavigate } from "react-router";
import Login from "../Root/components/Login";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

function BillingDashboardLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();

  const content = loading ? (
    <p className="p-6">Session wird geprüft ...</p>
  ) : user ? (
    <Outlet />
  ) : (
    <Login />
  );

  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-350 lg:mx-auto border border-border lg:text-xl">
      <header className=" flex justify-between items-center border-b border-l border-r border-border bg-background px-6 py-4 ">
        <Button variant="link" onClick={() => navigate(-1)}>
          <ArrowBigLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          Abrechnung
        </h1>

        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          AraDine
        </h1>
      </header>
      {content}
    </div>
  );
}

export default BillingDashboardLayout;
