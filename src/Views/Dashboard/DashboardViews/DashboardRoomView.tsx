import { Link, Outlet, useParams } from "react-router";
import BewCard from "../components/BewCard";

function DashboardRoomView() {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className="min-h-screen bg-background text-foreground lg:max-w-350 lg:mx-auto py-4 px-6">
      <h1 className="text-2xl font-semibold text-center py-5">
        Raum: {roomId}
      </h1>
      <h2 className="text-xl font-medium py-2 underline underline-offset-4">
        Bewirtungen:
      </h2>
      <div className=" grid grid-cols-1 min-h-45 h-fit gap-1 border border-border rounded-4xl px-2 py-2 text-lg">
        <Link to="refreshment-detail/1">
          <BewCard />
        </Link>
        <BewCard />
        <BewCard />
      </div>
      <Outlet />
    </div>
  );
}

export default DashboardRoomView;
