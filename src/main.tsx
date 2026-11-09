import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { LocationProvider } from "./context/locationContext.tsx";
import { AuthProvider } from "./context/AuthContetxt.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {" "}
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LocationProvider>{" "}
    </AuthProvider>
  </StrictMode>,
);
