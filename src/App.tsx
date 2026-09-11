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
      <Route path="/" element={<Root />} />

      <Route path="order" element={<Order />}>
        <Route path="login/:roll" element={<Login />} />
        <Route path="signup/:roll" element={<SignUp />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<DashboardOverview />} />
        <Route path="room-view/:roomId" element={<DashboardRoomView />} />
        <Route
          path="room-view/:roomId/refreshment-detail/:refreshmentId"
          element={<RefreshmentDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
