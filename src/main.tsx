import { StrictMode } from "react";
import { createRoot } from "react-dom/client"; //
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <SidebarProvider>
        <LocalizationProvider>
          {/* <HeroUIProvider> */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
          {/* </HeroUIProvider> */}
        </LocalizationProvider>
      </SidebarProvider>
    </HelmetProvider>
  </StrictMode>
);
