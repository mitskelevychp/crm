import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import CssBaseline from "@mui/material/CssBaseline";
import "./styles/index.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <CssBaseline>
      <App />
    </CssBaseline>
  </React.StrictMode>
);
