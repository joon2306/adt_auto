import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./TokenGenerator.css";
import axios from "axios";
import notificationService from "../services/NotificationService";
import loaderService from "../services/LoaderService";
import Form from "react-bootstrap/Form";
import Environment from "../lib/Environment";

export default function TokenGenerator() {
  const [variantRenault, setVariantRenault] = useState("warning");
  const [variantNissan, setVariantNissan] = useState("primary");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState(1);
  const baseUri = "http://localhost:4000";

  const getToken = (nissan) => {
    setDisable(true);
    setVariantRenault("secondary");
    setVariantNissan("secondary");
    loaderService.load();
    let uri = nissan ? baseUri + "/nissan" : baseUri + "/renault";
    const env = Environment[val];
    uri = `${uri}/${env}`;
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

  const select = (e) => {
    const value = e.target.value;
    setVal(value);
  }

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Token Generator
        </h1>

        <Form.Select aria-label="Default select example" onChange={(e) => select(e)}>
          <option value="1">Devint</option>
          <option value="2">Ft1</option>
          <option value="3">Dev</option>
          <option value="4">RT</option>
          <option value="5">DEV-MP</option>
          <option value="6">RT-MP</option>
        </Form.Select>

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
