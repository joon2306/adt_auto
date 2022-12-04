import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./TokenGenerator.css";
import axios from "axios";
import notificationService from "../services/NotificationService";
import loaderService from "../services/LoaderService";

export default function TokenGenerator() {
  const [variantRenault, setVariantRenault] = useState("warning");
  const [variantNissan, setVariantNissan] = useState("primary");
  const [disable, setDisable] = useState(false);
  const baseUri = "http://localhost:4000";

  const getToken = (nissan) => {
    setDisable(true);
    setVariantRenault("secondary");
    setVariantNissan("secondary");
    loaderService.load();
    const uri = nissan ? baseUri + "/nissan" : baseUri;
    axios
      .get(uri)
      .then((response) => {
        const success = response?.data === "Successful";
        const txt = success ? "Successful" : "Failure";
        if (success) {
          notificationService.info(txt);
        } else {
          notificationService.warn(txt);
        }
      })
      .catch(() => {
        notificationService.warn("Server Error");
      })
      .finally(() => {
        loaderService.stop();
        setDisable(false);
        setVariantRenault("warning");
        setVariantNissan("primary");
      });
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Token Generator
        </h1>
        <Button
          variant={variantRenault}
          className={
            "text-btn margin-50 padding-15 padding-left-30 padding-right-30"
          }
          onClick={() => getToken(false)}
          disabled={disable}
        >
          Renault
        </Button>
        <Button
          variant={variantNissan}
          className={
            "text-btn margin-50 padding-15 padding-left-30 padding-right-30"
          }
          onClick={() => getToken(true)}
          disabled={disable}
        >
          Nissan
        </Button>
      </div>
    </>
  );
}
