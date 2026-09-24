import { Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = location.pathname.includes("refreshment-detail")
    ? "Refreshment Detail"
    : "Dashboard";
  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-350 lg:mx-auto border border-border lg:text-xl">
      <header className=" flex justify-between items-center border-b border-l border-r border-border bg-background px-6 py-4 ">
        <Button variant="link" onClick={() => navigate(-1)}>
          <ArrowBigLeft className="mr-2" />
          Back
        </Button>
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          {pageTitle}
        </h1>

        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          AraDine
        </h1>
      </header>

      <Outlet />
    </div>
  );
}
export default Dashboard;
