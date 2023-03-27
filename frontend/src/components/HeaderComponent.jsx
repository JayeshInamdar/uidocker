import React, { useContext } from "react";

import { useTranslation } from "react-i18next";
import i18n from "../helper/i18n";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import LocaleContext from "../helper/LocaleContext";

function HeaderComponent() {
  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  function changeLocale(l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#ff5f00" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Sixt-Logo.svg"
              height="40"
              alt="SIXT"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#home"> {t("title")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">{t("features")}</Nav.Link>
              <Nav.Link href="#pricing">{t("pricing")}</Nav.Link>
              <NavDropdown title={t("more")} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">{t("ride")}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                {t("manage_booking")}
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">{t("rent")}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">{t("share")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={t("language")} id="collasible-nav-dropdown">
                <NavDropdown.Item href="#" onClick={() => changeLocale("en")}>
                  English
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={() => changeLocale("sp")}>
                  Española
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
