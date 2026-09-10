import { Route, Routes } from "react-router";
import "./App.css";
import Root from "./Views/Root/Root";
import Order from "./Views/Order/Order";
import Dashboard from "./Views/Dashboard/Dashboard";
import DashboardOverview from "./Views/Dashboard/Dashboardviews/DashboardOverview";
import DashboardWeekly from "./Views/Dashboard/Dashboardviews/DashboardWeekly";
import SignUp from "./Views/Root/components/SignUp";
import Login from "./Views/Root/components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />} />

      <Route path="order" element={<Order />}>
        <Route path="login/:roll" element={<Login />} />
        <Route path="signup/:roll" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
