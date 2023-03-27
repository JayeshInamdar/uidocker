import React, { Component } from "react";
import SSPortalService from "../services/SSPortalService";

const queryString = window.location.search;
const sp = new URLSearchParams(queryString);
console.log(sp.get('esign'));

class SSPortalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linkReceived: "",
      isLoading: false,
      file: ""
    };
    this.createScriveTrn = this.createScriveTrn.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.esign = this.esign.bind(this);
  }

  componentDidMount() {}

  createScriveTrn() {
    this.setState({ isLoading: true });
    SSPortalService.createScriveTransaction().then((res) => {
      window.open(res.data.accessUrl, "_blank");
      window.close();
      this.setState({
        linkReceived: res.data.accessUrl,
        isLoading: false,
      });
    });
  }

  handleFileChange(e){
    console.log(e);
    this.setState({ file : e });
    console.log("state", this.state.file);
  };

  esign() {
    console.log("esign state", this.state);
    let fileData = new FormData();
    fileData.append(`file`, this.state.file, this.state.file.name);
    SSPortalService.creatDocument(fileData)
      .then((res) => {
        console.log(res.data);
        let documentJson = res.data;
        documentJson.parties[0] = { ...documentJson.parties[0], delivery_method:"api", sign_success_redirect_url:"http://localhost:3000/?esign=success"};
        let documentData = new FormData();
        documentData.append(`document`, JSON.stringify(documentJson));
        SSPortalService.updateDocument(documentData, documentJson.id)
        .then((res) => {
            SSPortalService.startESign(documentJson.id)
            .then(res => {
                window.open('https://api-testbed.scrive.com' + res.data.parties[0].api_delivery_url, "_self");
                // window.close();
                // redirect to Scrive Esign
            })
        })
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        {/* <h2 className="text-center">Self Serve Portal</h2> */}
        <br></br>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={this.createScriveTrn}
            disabled={this.state.isLoading}
          >
            {" "}
            DL Validation
            {this.state.isLoading ? (
              <span style={{ marginLeft: "1.25em" }}>
                <span
                  disabled={this.state.isLoading}
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span disabled={this.state.isLoading} className="sr-only">
                  Loading...
                </span>
              </span>
            ) : null}
          </button>
        </div>
        <div
          style={{
            width: "100%",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          {this.state.linkReceived ? (
            <div>
              {" "}
              "Redirecting user to :"{" "}
              <a href={this.state.linkReceived}>
                {this.state.linkReceived}{" "}
              </a>{" "}
            </div>
          ) : null}
        </div>
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
       
         <div className="text-left" style={{"paddingLeft": "220px"}}>
            <input type="file" onChange={(e) => this.handleFileChange(e.target.files[0])}/>

{/* <button onClick={handleUploadClick}>Upload</button> */}
           <button
             className="btn btn-primary"
             onClick={this.esign}
             disabled={this.state.isLoading}
           >
             {" "}
             E-Sign
             {this.state.isLoading ? (
               <span style={{ marginLeft: "1.25em" }}>
                 <span
                   disabled={this.state.isLoading}
                   className="spinner-grow spinner-grow-sm"
                   role="status"
                   aria-hidden="true"
                 ></span>
                 <span disabled={this.state.isLoading} className="sr-only">
                   Loading...
                 </span>
               </span>
             ) : null}
           </button>
         </div>

         <br></br>
         <br></br>
            {sp.has("esign") &&
            sp.get("esign") === 'success' ? (
            <div
                className="alert alert-primary"
                role="alert"
                style={{ textAlign: "center" }}
            >
                E-Sign successful
            </div>
            ) : null}

        <br></br>
      </div>
    );
  }
}

export default SSPortalComponent;
