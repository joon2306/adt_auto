import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TokenGenerator from "./components/TokenGenerator";
import AlertComponent from "./components/AlertComponent";
import SpinnerComponent from "./components/SpinnerComponent";
import notificationService from "./services/NotificationService";
import loaderService from "./services/LoaderService";
import SpecialSpinnerComponent from "./components/Spinner/SpecialSpinnerComponent";
import userService from "./services/UserService";

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
    setVariant("warn");
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
  }, [users.length]);

  const showTokenGenerator = () => {
    if (users.length) {
      return (
        <div className={"flex-container center body-height"}>
          <TokenGenerator users={users}></TokenGenerator>
          <SpinnerComponent loading={loading}></SpinnerComponent>
        </div>
      );
    } else {
      return <SpecialSpinnerComponent></SpecialSpinnerComponent>;
    }
  };

  return (
    <>
      <div className={"App"}>
        {showTokenGenerator()}
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
