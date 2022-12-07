import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AlertComponent from "./components/AlertComponent";
import notificationService from "./services/NotificationService";
import loaderService from "./services/LoaderService";
import userService from "./services/UserService";
import { Outlet } from "react-router-dom";
import appsService from "./services/AppsService";
import SpinnerComponent from "./components/SpinnerComponent";

function App() {
  /* A variable that is used to set the color of the alert. */
  const [alert, setAlert] = useState(false);
  const [variant, setVariant] = useState("info");
  const [alertTxt, setAlertTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
    setVariant("danger");
    setAlert(true);
    setAlertTxt(txt);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  notificationService.subscribe("info", info);
  notificationService.subscribe("warn", warn);

  useEffect(() => {
    if (!users.length) {
      userService.getUsers().then((list) => {
        setUsers(list);
      });
    }
    appsService.initApps();
  }, [users.length]);

  const props = {
    loading,
    users,
  };

  return (
    <>
      <div className={"App"}>
        <Outlet context={props} />

        <div className={"flex-container center"}>
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
