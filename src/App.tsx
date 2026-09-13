import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./Views/Root/Root";
import Order from "./Views/Order/Order";
import Dashboard from "./Views/Dashboard/Dashboard";
import DashboardOverview from "./Views/Dashboard/DashboardViews/DashboardOverview";
import SignUp from "./Views/Root/components/SignUp";
import Login from "./Views/Root/components/Login";
import DashboardRoomView from "./Views/Dashboard/DashboardViews/DashboardRoomView";
import RefreshmentDetail from "./Views/Dashboard/DashboardViews/RefreshmentDetail";

function App() {
  return (
    <Routes>
      <Route path="araDine/" element={<Root />} />

      <Route path="araDine/order" element={<Order />}>
        <Route path="araDine/order/login/:roll" element={<Login />} />
        <Route path="araDine/order/signup/:roll" element={<SignUp />} />
      </Route>
      <Route path="araDine/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardOverview />} />
        <Route
          path="araDine/dashboard/room-view/:roomId"
          element={<DashboardRoomView />}
        />
        <Route
          path="araDine/dashboard/room-view/:roomId/refreshment-detail/:refreshmentId"
          element={<RefreshmentDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
