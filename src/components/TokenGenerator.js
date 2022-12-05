import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./TokenGenerator.css";
import axios from "axios";
import notificationService from "../services/NotificationService";
import loaderService from "../services/LoaderService";
import Form from "react-bootstrap/Form";
import Environment from "../lib/Environment";
import BaseUri from "../lib/BaseUri";
import userService from "../services/UserService";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { AiFillAppstore } from 'react-icons/ai';

export default function TokenGenerator({ users }) {
  const [variant, setVariant] = useState("primary");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState(1);
  const [user, setUser] = useState(users[0]);
  const [type, setType] = useState(true);
  const baseUri = BaseUri.url;
  const navigate = useNavigate();

  const loading = () => {
    setDisable(true);
    setVariant("secondary");
    loaderService.load();
  };

  const unloading = () => {
    loaderService.stop();
    setVariant("primary");
    setDisable(false);
  };

  const getToken = (nissan) => {
    if (!user) {
      notificationService.warn("User not selected");
      return;
    }
    const id = user.id;
    const brand = user.brand.toLowerCase();
    loading();
    const env = Environment[val];
    const uri = `${baseUri}/${brand}/${env}/${id}/${type}`;
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
        unloading();
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

  const selectType = (e) => {
    const val = e.target.value;
    setType(val);
  };

  const copy = () => {
    if (!user) {
      notificationService.warn("User empty");
      return;
    }
    loading();

    userService.copyUsername(user).then((res) => {
      if (res === "Success") {
        setTimeout(() => {
          userService.copyPwd(user);
          notificationService.info("Successfully Copied User");
          unloading();
        }, 2000);
      }
    });
  };

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
          <>
            <Row>
              <Col xs={9} sm={9} md={9} lg={9}>
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
              </Col>
              <Col
                xs={3}
                sm={3}
                md={3}
                lg={3}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <Button
                  variant="success"
                  onClick={() => copy()}
                  disabled={disable}
                >
                  Copy
                </Button>
              </Col>
            </Row>
          </>
        )}

        <Form.Select
          aria-label="Default select example"
          onChange={(e) => selectType(e)}
          className={"margin-15-top margin-15-bottom"}
        >
          <option value="true">Front</option>
          <option value="false">Backend</option>
        </Form.Select>

        <div>
          <Button
            variant={variant}
            className={"text-btn margin-15-top margin-15-right btn-width"}
            onClick={() => getToken(false)}
            disabled={disable}
          >
            Generate
          </Button>
          <Button
            variant="warning"
            className={"text-btn margin-15-top btn-width"}
            onClick={() => navigate("/apps")}
            disabled={disable}
          >
            Apps <AiFillAppstore/>
          </Button>
        </div>
      </div>
    </>
  );
}
