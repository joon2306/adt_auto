import React from "react";
import { useOutletContext } from "react-router-dom";
import SpecialSpinnerComponent from "../Spinner/SpecialSpinnerComponent";
import TokenGenerator from "../TokenGeneratorComponent/TokenGenerator";
export default function Token() {
  const { users , environments } = useOutletContext();
  if (users.length && environments.length) {
    return (
      <div className={"flex-container full-center App_body-height"}>
        <TokenGenerator users={users} environments={environments}></TokenGenerator>
      </div>
    );
  } else {
    return <SpecialSpinnerComponent></SpecialSpinnerComponent>;
  }
}
