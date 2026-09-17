import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./Views/Root/Root";
import Order from "./Views/Order/OrderLayout";
import Dashboard from "./Views/Dashboard/Dashboard";
import SignUp from "./Views/Root/components/SignUp";
import Login from "./Views/Root/components/Login";
import RefreshmentDetail from "./Views/RefreshmentView/RefreshmentDetail";
import DashboardEmployee from "./Views/DashboardEmployeeView/DashboardEmployee";
import OrderView from "./Views/Order/components/OrderView";

function App() {
  return (
    <Routes>
      <Route path="araDine/" element={<Root />} />

      <Route path="araDine/order" element={<Order />}>
        <Route index element={<OrderView />} />
        <Route path="login/:roll" element={<Login />} />
        <Route path="signup/:roll" element={<SignUp />} />
      </Route>
      <Route path="araDine/dashboard" element={<Dashboard />}>
        <Route index element={<DashboardEmployee />} />

        <Route
          path="araDine/dashboard/refreshment-detail/:refreshmentId"
          element={<RefreshmentDetail />}
        />
      </Route>
    </Routes>
  );
}

export default App;
