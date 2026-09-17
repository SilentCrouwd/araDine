import Login from "@/Views/Root/components/Login";
import OrderForm from "./OrderForm";

function OrderView() {
  const user = true;
  if (user) {
    return <OrderForm />;
  } else {
    return <Login />;
  }
}

export default OrderView;
