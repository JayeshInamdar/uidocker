import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

import SixtService from "../services/SixtService";
import "../pages/ReservationForm.css";
import Counter from "./Counter";

function SixtComponent() {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contact, setContact] = useState("");

  const getReservation = () => {
    SixtService.getReservationByID().then((res) => {
      setFirstName(res.data.drivers[0].givenName);
      setLastName(res.data.drivers[0].familyName);
      setBirthdate(res.data.drivers[0].birthdate);
      setContact(res.data.drivers[0].contact.email);
    });
    alert("Reservation Details");
  };

  return (
    <>
    {/* <Counter/> */}
      <Button
        variant="primary"
        onClick={getReservation}
        className="sixt-button"
      >
        {t("details")}
      </Button>{" "}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>{t("first_name")}</Form.Label>
          <Form.Control
            placeholder={t("first_name_placeholder")}
            value={firstName}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("last_name")}</Form.Label>
          <Form.Control
            placeholder={t("last_name_placeholder")}
            value={lastName}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("birthdate")}</Form.Label>
          <Form.Control
            placeholder={t("birthdate_placeholder")}
            value={birthdate}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{t("email")}</Form.Label>
          <Form.Control
            placeholder={t("email_placeholder")}
            value={contact}
            disabled
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default SixtComponent;
