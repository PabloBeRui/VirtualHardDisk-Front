import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CustomTokenContextProvider } from "./contexts/TokenContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomTokenContextProvider>
        <App />
      </CustomTokenContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
