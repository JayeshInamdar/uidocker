import React from "react";

import { useTranslation } from "react-i18next";

import "./Other Component/SSPDesign.css";

function FooterComponent() {
  const { t } = useTranslation();
  return (
    <>
      <footer className="footer">
        <span className="text-muted"> {t("footer_content")}</span>
      </footer>
    </>
  );
}

export default FooterComponent;
