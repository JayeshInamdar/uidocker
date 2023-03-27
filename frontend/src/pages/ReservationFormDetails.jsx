import React from "react";

import SixtComponent from "../components/SixtComponent"
import ScriveEsignComponent from "../components/ScriveEsignComponent";
import ScriveDlvalidationComponent from "../components/ScriveDlvalidationComponent";
import "./ReservationForm.css";

function ReservationFormDetails() {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <SixtComponent />
        <ScriveDlvalidationComponent />
        <ScriveEsignComponent />
      </div>
    </>
  );
}
export default ReservationFormDetails;
