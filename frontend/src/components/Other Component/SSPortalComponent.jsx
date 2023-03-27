import React, { useState } from "react";
import ScriveService from "../services/ScriveService";
import SixtService from "../services/SixtService";
import PodiumService from "../services/PodiumService";
import Card from "react-bootstrap/Card";
import "./SSPDesign.css";
const queryString = window.location.search;
const sp = new URLSearchParams(queryString);
console.log(sp.get("esign"));

function SSPortalComponent() {
  const [linkReceived, setLinkReceived] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [file, setFile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [contact, setContact] = useState("");
  const [showDetails, setShowDetails] = useState("");

  const createScriveTrn = () => {
    setIsLoading(true);
    ScriveService.createScriveTransaction().then((res) => {
      window.open(res.data.accessUrl, "_blank");
      window.close();
      setLinkReceived(res.data.accessUrl);
      setIsLoading(false);
    });
  };
  const handleFileChange = (e) => {
    console.log(e);
    setFile(e);
  };
  const esign = () => {
    let fileData = new FormData();
    fileData.append(`file`, file, file.name);
    ScriveService.creatDocument(fileData)
      .then((res) => {
        console.log(res.data);
        let documentJson = res.data;
        documentJson.parties[0] = {
          ...documentJson.parties[0],
          delivery_method: "api",
          sign_success_redirect_url: "http://localhost:3000/?esign=success",
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
              // window.close();
              // redirect to Scrive Esign
            });
          }
        );
      })
      .catch((err) => console.error(err));
  };

  const getTransaction = () => {
    let id = localStorage.getItem("id");
    ScriveService.getScriveDLTransaction(id).then((res) => {
      console.log(res);
    });
  };
  const sixtToken = () => {
    SixtService.createToken().then((res) => {
      localStorage.setItem("token", res.data.access_token);
      // alert("Token is Generated");
    });
  };
  const getReservation = () => {
    console.log("Reservation");
    let token = localStorage.getItem("token");
    console.log(token);
    SixtService.getReservationByID(token).then((res) => {
      setFirstName(res.data.drivers[0].givenName);
      setLastName(res.data.drivers[0].familyName);
      setBirthdate(res.data.drivers[0].birthdate);
      setContact(res.data.drivers[0].contact.email);
      setShowDetails(true);
    });
  };
  const getLocation = () => {
    PodiumService.getLocations().then((res) => {
      console.log(res.data.data);
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <br></br>
      <div style={{ width: "100%", display: "flex" }}>
        <Card style={{ width: "18rem", boxShadow: "5px 5px 5px 5px#f6f6f6" }}>
          <Card.Body>
            <Card.Title>
              <b>Sixt(COBRA) - Create Token</b>
            </Card.Title>
            <Card.Text>Access Token to access the SIXT API</Card.Text>
            <button className="sixt-button" onClick={sixtToken}>
              Token
            </button>
          </Card.Body>
        </Card>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Card style={{ width: "18rem", boxShadow: "5px 5px 5px 5px#f6f6f6" }}>
          <Card.Body>
            <Card.Title>
              <b>Sixt(COBRA) - Get Reservation</b>
            </Card.Title>
            <Card.Text>Fetch the Reservation Details</Card.Text>
            <button className="sixt-button" onClick={getReservation}>
              Get Reservation
            </button>
          </Card.Body>
        </Card>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Card style={{ width: "20rem", boxShadow: "5px 5px 5px 5px#f6f6f6" }}>
          <Card.Body>
            <Card.Title>
              <b>Scrive - DL Validation</b>
            </Card.Title>
            <Card.Text>
              Upload the Front & Back Image of Driver License. Fetch the
              Transaction Details
            </Card.Text>
            <button
              className="sixt-button"
              onClick={createScriveTrn}
              disabled={isLoading}
            >
              {" "}
              DL Validation
              {isLoading ? (
                <span style={{ marginLeft: "1.25em" }}>
                  <span
                    disabled={isLoading}
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span disabled={isLoading} className="sr-only">
                    Loading...
                  </span>
                </span>
              ) : null}
            </button>
            <br></br>
            <br></br>
            <button className="sixt-button" onClick={getTransaction}>
              Get Details
            </button>
            <br></br>
            <br></br>
            {sp.has("success") &&
            sp.get("success") &&
            sp.has("transaction_id") &&
            sp.get("transaction_id").length === 36 ? (
              <div
                className="alert alert-primary"
                role="alert"
                style={{ textAlign: "center" }}
              >
                DL Validated successfully
              </div>
            ) : null}
            <br></br>
          </Card.Body>
        </Card>
        &nbsp; &nbsp;&nbsp;&nbsp;
        <Card style={{ width: "21rem", boxShadow: "5px 5px 5px 5px#f6f6f6" }}>
          <Card.Body>
            <Card.Title>
              <b>Scrive - ESign</b>
            </Card.Title>
            <Card.Text>Digitally Sign the Rent Agreement</Card.Text>

            <div className="text-left">
              <input
                type="file"
                onChange={(e) => handleFileChange(e.target.files[0])}
              />
              <br></br>
              <br></br>
              <button
                className="sixt-button"
                onClick={esign}
                // disabled={this.state.isLoading}
              >
                {" "}
                E-Sign
                {isLoading ? (
                  <span style={{ marginLeft: "1.25em" }}>
                    <span
                      disabled={isLoading}
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span disabled={isLoading} className="sr-only">
                      Loading...
                    </span>
                  </span>
                ) : null}
              </button>
            </div>

            <br></br>
            <br></br>
            {sp.has("esign") && sp.get("esign") === "success" ? (
              <div
                className="alert alert-primary"
                role="alert"
                style={{ textAlign: "center" }}
              >
                E-Sign successful
              </div>
            ) : null}
          </Card.Body>
        </Card>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Card style={{ width: "18rem", boxShadow: "5px 5px 5px 5px#f6f6f6" }}>
          <Card.Body>
            <Card.Title>
              <b>Podium - Get Locations</b>
            </Card.Title>
            <Card.Text>Get Test Location</Card.Text>
            <button className="sixt-button" onClick={getLocation}>
              {" "}
              Podium Get Location
            </button>
          </Card.Body>
        </Card>
      </div>
      <br></br>
      {showDetails ? (
        <Card
          className="card-align"
          style={{ width: "25rem", boxShadow: "5px 5px 5px 5px#848484" }}
        >
          <Card.Body>
            <Card.Title>
              <b>Customer Reservation Details</b>
            </Card.Title>
            <br></br>
            <div className="row">
              <label>
                {" "}
                <b>First Name: </b>
              </label>
              <div> {firstName}</div>
            </div>
            <div className="row">
              <label>
                {" "}
                <b>Last Name:</b>{" "}
              </label>
              <div> {lastName}</div>
            </div>
            <div className="row">
              <label>
                {" "}
                <b>Birth Date: </b>
              </label>
              <div> {birthdate}</div>
            </div>
            <div className="row">
              <label>
                {" "}
                <b>Contact Details:</b>{" "}
              </label>
              <div> {contact}</div>
            </div>
          </Card.Body>
        </Card>
      ) : null}
    </div>
  );
}

export default SSPortalComponent;
