import React, { useState} from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

import ScriveService from "../services/ScriveService";
import "../pages/ReservationForm.css";


const queryString = window.location.search;
const sp = new URLSearchParams(queryString);

function ScriveDlvalidationComponent() {
  const [linkReceived, setLinkReceived] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [showA, setShowA] = useState(false);
  const [show, setShow] = useState(false);
  const [address, setAddress] = useState("");
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [driverDateOfBirth, setDriverDOB] = useState("");
  const [driverDocumentNo, setDriverLicenseDocumentNo] = useState("");
  const [driverLicenseIssueDate, setDriverLicenseDateOfIssue] = useState("");
  const [driverLicenseExpiryDate, setDriverLicenseDateOfExpiry] = useState("");

  const { t } = useTranslation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createScriveTrn = () => {
    setIsLoading(true);
    ScriveService.createScriveTransaction().then((res) => {
      window.open(res.data.accessUrl, "_blank");
      window.close();
      setLinkReceived(res.data.accessUrl);
      setIsLoading(false);
      setShowA(true);
    });
    console.log(showA);
  };

  const getTransaction = () => {
    const queryString = window.location.search;
    const sp = new URLSearchParams(queryString);
    const transaction_Id = sp.get("transaction_id");
    setShow(true);
    setTransactionID(transaction_Id);
    ScriveService.getScriveDLTransaction(transaction_Id).then((res) => {
      setAddress(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .address
      );
      setDriverFirstName(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .firstName
      );
      setDriverLastName(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .lastName
      );
      setDriverDOB(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .dateOfBirth
      );
      setDriverLicenseDocumentNo(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .documentNumber
      );
      setDriverLicenseDateOfIssue(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .dateOfIssue
      );
      setDriverLicenseDateOfExpiry(
        res.data.providerInfo.onfidoAuth.completionData.documentReportData
          .dateOfExpiry
      );
    });
  };

  return (
    <>
      <Button
        variant="primary"
        className="sixt-button"
        onClick={createScriveTrn}
        disabled={isLoading}
      >
        {" "}
        {t("dl_validation")}
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
      </Button>{" "}
      <Button
        variant="primary"
        onClick={getTransaction}
        disabled={!sp.has("transaction_id")}
        className="sixt-button"
      >
        {t("scrive_transaction")}
      </Button>{" "}
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("driver_details")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>{t("driver_name")}:</b> {driverFirstName}
          <br></br>
          <b>{t("driver_lastname")}:</b> {driverLastName}
          <br></br>
          <b>{t("driver_address")}:</b> {address}
          <br></br>
          <b>{t("driver_birthdate")}:</b> {driverDateOfBirth}
          <br></br>
          <b>{t("driver_document_no")}:</b> {driverDocumentNo}
          <br></br>
          <b>{t("driver_license_issue_date")}:</b> {driverLicenseIssueDate}
          <br></br>
          <b> {t("driver_license_expiry_date")}:</b> {driverLicenseExpiryDate}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="sixt-button"
            onClick={handleClose}
          >
            {t("close_modal")}
          </Button>
        </Modal.Footer>
      </Modal>
      {sp.has("success") &&
      sp.get("success") &&
      sp.has("transaction_id") &&
      sp.get("transaction_id").length === 36 ? (
        <div
          className="alert alert-primary"
          role="alert"
          style={{ textAlign: "center" }}
        >
         {t("dl_success")}
        </div>
      ) : null}
    </>
  );
}
export default ScriveDlvalidationComponent;
