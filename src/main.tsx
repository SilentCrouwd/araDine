import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { OrderProvider } from "./Context/RefreshmentContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <OrderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrderProvider>
  </StrictMode>,
);
