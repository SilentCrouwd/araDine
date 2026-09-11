import { OctagonAlert } from "lucide-react";
import { Link } from "react-router";

function DashboardOverview() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center py-5">Overview</h1>
      <div className="flex justify-evenly border-b border-border  px-6 py-4">
        <select
          className="srounded-md focus:outline-none focus:ring-2 "
          name="buildingSelect"
          id="buildingSelect"
        >
          <option value="werk1LHM">Werk1 LHM</option>
          <option value="werk2LHM">Werk2 LHM</option>
          <option value="werk3MCC">Werk3 MCC</option>
        </select>{" "}
        <p className="text-lg text-muted-foreground">
          Datum: {new Date().toLocaleDateString()}
        </p>
      </div>
      <div className="grid grid-cols-4 py-4 gap-4 px-6">
        <h2 className="text-lg font-medium col-span-4 mb-2 underline underline-offset-4">
          Raum Übersicht
        </h2>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Frei: 10
        </p>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Belegt: 5
        </p>
        <p className="col-span-4 border border-border rounded-4xl text-lg text-center px-1">
          Gesamt:15{" "}
        </p>
        <h2 className="text-lg font-medium col-span-4 my-2 underline underline-offset-4">
          Bewirtung Übersicht:
        </h2>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Erste:7:00
        </p>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Letzte: 20:00
        </p>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Gesamt: 5
        </p>
        <p className="col-span-2 border border-border rounded-4xl text-lg text-center px-1">
          Lunch: 15 pax
        </p>
      </div>
      <div className="grid grid-cols-3 justify-items-center  py-4 gap-4 px-6">
        <p className=" text-lg font-medium col-span-3 underline underline-offset-4 justify-self-start  ">
          {" "}
          Raumübersicht
        </p>
        <Link to="/dashboard/room-view/101">
          <div className="border border-border px-2 rounded-2xl w-45 flex justify-center items-center gap-1">
            <p className="text-lg">Raum:101</p>
            <OctagonAlert className="h-5 w-5  ml-5 text-red-500" />
          </div>
        </Link>
        <Link to="/dashboard/room-view/103">
          <div className="border border-border px-2 rounded-2xl w-45 flex justify-center items-center gap-1">
            <p className="text-lg">Raum:103</p>
            <OctagonAlert className="h-5 w-5 text-green-600  ml-5" />
          </div>
        </Link>
        <Link to="/dashboard/room-view/105">
          <div className="border border-border px-2 rounded-2xl w-45 flex justify-center items-center gap-1">
            <p className="text-lg">Raum:105</p>
            <OctagonAlert className="h-5 w-5 text-green-600  ml-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default DashboardOverview;
