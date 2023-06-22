import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { colourScheme } from "./utils/colorScheme";

// const theme = {
//   primaryColor: colourScheme.darkBlue,
//   errorColor: colourScheme.red,
//   infoColor: colourScheme.grey,
//   processingColor: colourScheme.lightBlue,
//   successColor: colourScheme.lightBlue,
//   warningColor: colourScheme.red,
// };

// const theme = {
//   primaryColor: "red",
//   errorColor: "red",
//   infoColor: "red",
//   processingColor: "red",
//   successColor: colourScheme.lightBlue,
//   warningColor: colourScheme.red,
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: colourScheme.darkBlue,
            colorError: colourScheme.red,
            colorInfo: colourScheme.grey,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
