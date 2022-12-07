import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import appsService from "../../services/AppsService";
import loaderService from "../../services/LoaderService";
import notificationService from "../../services/NotificationService";
import IconComponent from "../IconComponent/IconComponent";
import SpecialSpinnerComponent from "../Spinner/SpecialSpinnerComponent";

export default function AppsComponent() {
  const [apps, setApps] = useState([]);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  let lastColour = null;

  const btnColours = ["primary", "warning", "success", "danger"];

  const getColour = () => {
    if (lastColour === null) {
      lastColour = btnColours[0];
      return btnColours[0];
    }

    if(lastColour === btnColours[btnColours.length - 1]){
      lastColour = btnColours[btnColours.length -1];
      return btnColours[0];
    }

    const index = btnColours.indexOf(lastColour);
    const color = btnColours[index + 1];
    lastColour = color;
    return color;
  };

  const loading = () => {
    setDisable(true);
    loaderService.load();
  };

  const unloading = () => {
    setDisable(false);
    loaderService.stop();
  };

  const copyApp = (username, pwd) => {
    loading();
    appsService.copy(username).then((res) => {
      if (res === "Success") {
        setTimeout(() => {
          appsService.copy(pwd).then((result) => {
            unloading();
            if (result === "Success") {
              notificationService.info("Success");
            } else {
              notificationService.warn("Failed to copy password");
            }
          });
        }, 2000);
      } else {
        unloading();
        notificationService.warn("Failed to copy username");
      }
    });
  };

  const listBtns = () => {
    return (
      <Row>
        {apps.map((app) => {
          return (
            <Col sm="4" md="4" key={app.name}>
              <Button
                variant={getColour()}
                className={"text-btn margin-30-top btn-height"}
                style={{ width: "100%" }}
                onClick={() => copyApp(app.username, app.pwd)}
                disabled={disable}
              >
                <span style={{ margin: "10px" }}>{app.name}</span>
                <IconComponent icon={app.icon}></IconComponent>
              </Button>
            </Col>
          );
        })}
      </Row>
    );
  };

  useEffect(() => {
    if (!appsService.getApps().length) {
      appsService.initApps().then(() => {
        setApps(appsService.getApps());
      });
    } else {
      setApps(appsService.getApps());
    }
  }, [apps]);
  if (!apps.length) {
    return <SpecialSpinnerComponent></SpecialSpinnerComponent>;
  } else {
    return (
      <div style={{ height: "100" }}>
        <Container style={{ height: "10vh" }}>
          <Row>
            <Col>
              <Button
                variant="link"
                className={"text-btn"}
                onClick={() => navigate("/")}
              >
                <span style={{ margin: "10px" }}>Back</span>
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className={"centerPage"} style={{ height: "90vh" }}>
          <Row>{listBtns()}</Row>
        </Container>
      </div>
    );
  }
}
