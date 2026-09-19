import Login from "@/Views/Root/components/Login";
import OrderForm from "./components/OrderForm";

function OrderView() {
  // Temporäre Login-Logik für die Bestellansicht.
  // Wenn ein Nutzer vorhanden ist, wird das Bestellformular angezeigt,
  // ansonsten die Login-Seite.
  const user = true;
  if (user) {
    return <OrderForm />;
  } else {
    return <Login />;
  }
}

export default OrderView;
