import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./TokenGenerator.css";
import axios from "axios";
import notificationService from "../services/NotificationService";
import loaderService from "../services/LoaderService";
import Form from "react-bootstrap/Form";
import Environment from "../lib/Environment";
import BaseUri from "../lib/BaseUri";
import userService from "../services/UserService";

export default function TokenGenerator() {
  const [variantRenault, setVariantRenault] = useState("warning");
  const [variantNissan, setVariantNissan] = useState("primary");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState(1);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const baseUri = BaseUri.url;

  const getToken = (nissan) => {
    if (!user) {
      notificationService.warn("User not selected");
      return;
    }
    const id = user.id;
    setDisable(true);
    setVariantRenault("secondary");
    setVariantNissan("secondary");
    loaderService.load();
    let uri = nissan ? baseUri + "/nissan" : baseUri + "/renault";
    const env = Environment[val];
    uri = `${uri}/${env}/${id}`;
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
        setVariantRenault("warning");
        setVariantNissan("primary");
        setDisable(false);
      });
  };

  const selectEnvironment = (e) => {
    const value = e.target.value;
    setVal(value);
  };

  const selectUser = (e) => {
    const val = e.target.value;
    const selectedUser = users.find((el) => el.id === +val);
    setUser(selectedUser);
  };

  useEffect(() => {
    userService.getUsers().then((list) => {
      if (!users.length) {
        setUsers(list);
        if (user === null) {
          setUser(list[0]);
        }
      }
    });
  }, [users.length, user]);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
          Token Generator
        </h1>

        <Form.Select
          aria-label="Default select example"
          onChange={(e) => selectEnvironment(e)}
          className={"margin-15-top margin-15-bottom"}
        >
          <option value="1">Devint</option>
          <option value="2">Ft1</option>
          <option value="3">Dev</option>
          <option value="4">RT</option>
          <option value="5">DEV-MP</option>
          <option value="6">RT-MP</option>
        </Form.Select>

        {!users.length ? (
          <></>
        ) : (
          <Form.Select
            aria-label="Default select example"
            className={"margin-15-top margin-15-bottom"}
            onChange={(e) => selectUser(e)}
          >
            {users.map((op) => (
              <option key={op.id} value={op.id}>
                {op.username}; {op.brand}; {op.role}
              </option>
            ))}
          </Form.Select>
        )}

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
