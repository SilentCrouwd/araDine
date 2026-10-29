import { useOrderContext } from "@/context/RefreshmentContext";
import { Outlet, useParams } from "react-router";

function RoomViewLayout() {
  const { roomId } = useParams();

  const orderContext = useOrderContext();

  const currTitle = orderContext.state.location
    .flatMap((location) => location.rooms)
    .find((room) => room.id === roomId)?.name;

  return (
    <div className=" bg-background text-foreground lg:max-w-350 lg:mx-auto  lg:text-xl">
      <header className=" flex justify-start underline underline-offset-4 decoration-border/50  items-center  bg-background px-6 py-4 ">
        <h1 className="text-xl font-semibold text-primary sm:text-2xl">
          Raum: {currTitle ?? ""}
        </h1>
      </header>
      <Outlet />
    </div>
  );
}
export default RoomViewLayout;
