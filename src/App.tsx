import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./Views/Root/Root";
import Order from "./Views/Layouts/OrderLayout";
import Dashboard from "./Views/Layouts/DashboardLayout";
import SignUp from "./Views/Root/components/SignUp";
import Login from "./Views/Root/components/Login";
import RefreshmentDetail from "./Views/RefreshmentView/RefreshmentDetail";
import DashboardEmployee from "./Views/DashboardEmployeeView/DashboardEmployee";
import OrderView from "./Views/Order/OrderView";
import RoomViewLayout from "./Views/Layouts/RoomViewLayout";
import RoomView from "./Views/RoomView/RoomView";
import { Toaster } from "./components/ui/toast";
import BillingDashboard from "./Views/BillingDashboard/BillingDashboard";
import BillingDashboardLayout from "./Views/Layouts/BillingDashboardLayout";
import BillingDetailView from "./Views/BillingsDetailView/BillingDetailView";
function App() {
  return (
    <>
      <Routes>
        <Route path="araDine/" element={<Root />} />

        <Route path="araDine/order" element={<Order />}>
          <Route index element={<OrderView />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<SignUp />} />
        </Route>
        <Route path="araDine/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardEmployee />} />

          <Route
            path="refreshment-detail/:refreshmentId"
            element={<RefreshmentDetail />}
          />
          <Route path="room-view/:roomId" element={<RoomViewLayout />}>
            <Route index element={<RoomView />} />
          </Route>
        </Route>
        <Route
          path="araDine/BillingDashboard"
          element={<BillingDashboardLayout />}
        >
          <Route index element={<BillingDashboard />} />
          <Route
            path="details/:refreshmentId"
            element={<BillingDetailView />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
