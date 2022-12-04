import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

export default function AlertComponent({alert, alertTxt, variant}) {

  if (alert) {
    return (
      <>
        <Alert
          key={variant}
          variant={variant}
          style={{ marginBottom:"0px", position:"absolute", width:"100%", bottom:"0px" }}
        >
          {alertTxt}
        </Alert>
      </>
    );
  } else {
    return <></>;
  }
}
