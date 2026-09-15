import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./Views/Root/Root";
import Order from "./Views/Order/Order";
import Dashboard from "./Views/Dashboard/Dashboard";
import SignUp from "./Views/Root/components/SignUp";
import Login from "./Views/Root/components/Login";
import RefreshmentDetail from "./Views/Dashboard/DashboardViews/RefreshmentDetail";
import DashboardEmployee from "./Views/Dashboard/DashboardViews/DashboardEmployee";

function App() {
  return (
    <Routes>
      <Route path="araDine/" element={<Root />} />

      <Route path="araDine/order" element={<Order />}>
        <Route path="araDine/order/login/:roll" element={<Login />} />
        <Route path="araDine/order/signup/:roll" element={<SignUp />} />
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
