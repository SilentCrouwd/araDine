import Login from "@/Views/Root/components/Login";

function OrderView() {
  const user = true;
  if (user) {
    return <div>Order View</div>;
  } else {
    return <Login />;
  }
}

export default OrderView;
