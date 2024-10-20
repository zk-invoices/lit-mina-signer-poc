import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LitProvider } from "./contexts/LitContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LitProvider>
      <App />
    </LitProvider>
  </StrictMode>,
);
