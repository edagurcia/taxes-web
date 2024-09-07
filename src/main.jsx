import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TaxesApp } from "./TaxesApp.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaxesApp />
  </StrictMode>
);
