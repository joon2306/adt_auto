import React from "react";
import Spinner from "react-bootstrap/Spinner";

export default function SpinnerComponent({ loading }) {
  if (loading) {
    return (
      <Spinner
        animation="grow"
        role="status"
        style={{ position: "absolute", top: "70vh" }}
        size="md"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    return <></>;
  }
}
