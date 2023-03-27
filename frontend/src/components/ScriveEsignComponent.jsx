import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

import ScriveService from "../services/ScriveService";
import "../pages/ReservationForm.css";


const queryString = window.location.search;
const sp = new URLSearchParams(queryString);

function ScriveEsignComponent() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState("");
  const [file, setFile] = useState("");

  const handleFileChange = (e) => {
    console.log(e);
    setFile(e);
  };

  const esign = () => {
    let fileData = new FormData();
    fileData.append(`file`, file, file.name);
    setIsLoading(true);
    ScriveService.creatDocument(fileData)
      .then((res) => {
        console.log(res.data);
        let documentJson = res.data;
        documentJson.parties[0] = {
          ...documentJson.parties[0],
          delivery_method: "api",
          sign_success_redirect_url: "http://localhost:3000/?esign=success",
          reject_redirect_url: "http://localhost:3000/?esign=failed",
        };
        let documentData = new FormData();
        documentData.append(`document`, JSON.stringify(documentJson));
        ScriveService.updateDocument(documentData, documentJson.id).then(
          (res) => {
            ScriveService.startESign(documentJson.id).then((res) => {
              window.open(
                "https://api-testbed.scrive.com" +
                  res.data.parties[0].api_delivery_url,
                "_self"
              );
              setIsLoading(false);
            });
          }
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />
      <Button
        variant="primary"
        className="sixt-button"
        disabled={isLoading}
        onClick={esign}
      >
         {t("esign")}
        {isLoading ? (
          <span style={{ marginLeft: "1.25em" }}>
            <span
              disabled={isLoading}
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </span>
        ) : null}
      </Button>
      {sp.has("esign") && sp.get("esign") === "success" ? (
        <div
          className="alert alert-success"
          role="alert"
          style={{ textAlign: "center" }}
        >
          {t("esign_success")}
        </div>
      ) : null}
      {sp.has("esign") && sp.get("esign") === "failed" ? (
        <div
          className="alert alert-danger"
          role="alert"
          style={{ textAlign: "center" }}
        >
          {t("esign_failed")}
        </div>
      ) : null}
    </>
  );
}

export default ScriveEsignComponent;
