import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./views/Root/Root";
import Order from "./views/layouts/OrderLayout";
import Dashboard from "./views/layouts/DashboardLayout";
import SignUp from "./views/Root/components/SignUp";
import Login from "./views/Root/components/Login";
import RefreshmentDetail from "./views/RefreshmentView/RefreshmentDetail";
import DashboardEmployee from "./views/DashboardEmployeeView/DashboardEmployee";
import OrderView from "./views/Order/OrderView";
import RoomViewLayout from "./views/layouts/RoomViewLayout";
import RoomView from "./views/RoomView/RoomView";
import { Toaster } from "./components/ui/toast";
import BillingDashboard from "./views/BillingDashboard/BillingDashboard";
import BillingDashboardLayout from "./views/layouts/BillingDashboardLayout";
import BillingDetailView from "./views/BillingsDetailView/BillingDetailView";
function App() {
  return (
    <>
      <Routes>
        <Route path="aradine/" element={<Root />} />

        <Route path="aradine/order" element={<Order />}>
          <Route index element={<OrderView />} />
          <Route path="login/" element={<Login />} />
          <Route path="signup/" element={<SignUp />} />
        </Route>
        <Route path="aradine/dashboard" element={<Dashboard />}>
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
          path="aradine/billingdashboard"
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
