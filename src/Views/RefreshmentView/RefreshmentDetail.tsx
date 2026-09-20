import RefreshmentInfoCard from "./components/RefreshmentInfoCard";
import DeliveryDetailCard from "./components/DeliveryDetailCard";
import ActualDeliveryForm from "./components/ActualDeliveryForm";
import PaxOverviewList from "./PaxOverviewList";

function RefreshmentDetail() {
  const participants = [
    { name: "Max Mustermann", department: "Vertrieb" },
    { name: "Max Mustermann", department: "Vertrieb" },
    { name: "Max Mustermann", department: "Vertrieb" },
  ];
  return (
    <div>
      <div className="flex flex-col justify-evenly sm:flex-row gap-4 py-4 px-6">
        <div className="w-full flex flex-col gap-4">
          <RefreshmentInfoCard />
          <PaxOverviewList participants={participants} />
        </div>
        <div className="w-full flex flex-col gap-4 ">
          <DeliveryDetailCard />
          <ActualDeliveryForm />
        </div>
      </div>
    </div>
  );
}
export default RefreshmentDetail;
