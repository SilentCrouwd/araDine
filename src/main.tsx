import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { OrderProvider } from "./Context/RefreshmentContext.tsx";
import { AuthProvider } from "./Context/AuthContetxt.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrderProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </OrderProvider>
  </StrictMode>,
);
