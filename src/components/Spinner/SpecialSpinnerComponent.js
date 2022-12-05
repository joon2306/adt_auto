import React from "react";
import { RingLoader } from "react-spinners";
import "./SpecialSpinnerComponent.css";

export default function SpecialSpinnerComponent() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    zIndex:"100"
  };
  return (
    <>
    <div className={"center height"}>
      <RingLoader
        color="#36d7b7"
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </>
  );
}
