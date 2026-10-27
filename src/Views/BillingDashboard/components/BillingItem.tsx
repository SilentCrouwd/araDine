import { Button } from "@/components/ui/button";
import { Link } from "react-router";

type BillingItemProps = Readonly<{
  id: string;
  name: string;
  date: string;
  location: string;
}>;

function BillingItem({ id, name, date, location }: BillingItemProps) {
  return (
    <div className="grid grid-cols-4 gap-4 text-sm text-center items-center p-2 border-b border-border ">
      <p>{name}</p>
      <p>
        {" "}
        {new Date(date).toLocaleDateString("de-De", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </p>
      <p>{location}</p>
      <Link to={`details/${id}`}>
        <Button className="text-xs h-7  " variant="outline">
          Details
        </Button>
      </Link>
    </div>
  );
}

export default BillingItem;
