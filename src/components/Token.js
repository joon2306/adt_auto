import React from "react";
import { useOutletContext } from "react-router-dom";
import SpecialSpinnerComponent from "./Spinner/SpecialSpinnerComponent";
import SpinnerComponent from "./SpinnerComponent";
import TokenGenerator from "./TokenGenerator";
export default function Token() {
  const { loading, users } = useOutletContext();
  if (users.length) {
    return (
      <div className={"flex-container center body-height"}>
        <TokenGenerator users={users}></TokenGenerator>
      </div>
    );
  } else {
    return <SpecialSpinnerComponent></SpecialSpinnerComponent>;
  }
}
