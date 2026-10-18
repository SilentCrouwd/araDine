import Login from "@/Views/Root/components/Login";
import OrderForm from "./components/OrderForm";
import { useAuthContext } from "@/Context/AuthContetxt";

function OrderView() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <p>Session wird geprüft ...</p>;
  }

  return user ? <OrderForm /> : <Login />;
}

export default OrderView;
