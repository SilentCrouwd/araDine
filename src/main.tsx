import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { OrderProvider } from "./context/RefreshmentContext.tsx";
import { AuthProvider } from "./context/AuthContetxt.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <AuthProvider>
      <OrderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OrderProvider>{" "}
    </AuthProvider>
  </StrictMode>,
);
