import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TokenGenerator from "./components/TokenGenerator";
import AlertComponent from "./components/AlertComponent";
import SpinnerComponent from "./components/SpinnerComponent";
import notificationService from "./services/NotificationService";
import loaderService from "./services/LoaderService";

function App() {
  /* A variable that is used to set the color of the alert. */
  const [alert, setAlert] = useState(false);
  const [variant, setVariant] = useState("info");
  const [alertTxt, setAlertTxt] = useState("");
  const [loading, setLoading] = useState(false);

  loaderService.subscribe("load", () => setLoading(true));
  loaderService.subscribe("stop", () => setLoading(false));

  const info = (txt) => {
    setVariant("info");
    setAlert(true);
    setAlertTxt(txt);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  const warn = (txt) => {
    setVariant("warn");
    setAlert(true);
    setAlertTxt(txt);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  notificationService.subscribe("info", info);
  notificationService.subscribe("warn", warn);

  return (
    <>
      <div className={"App"}>
        <div className={"flex-container center body-height"}>
          <TokenGenerator></TokenGenerator>
          <SpinnerComponent loading={loading}></SpinnerComponent>
        </div>
        <AlertComponent
          variant={variant}
          alertTxt={alertTxt}
          alert={alert}
        ></AlertComponent>
      </div>
    </>
  );
}

export default App;
