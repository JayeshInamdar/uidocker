import axios from 'axios';

// const token =
//     "3c2e067e-1ead-46dd-b4e1-1087b5f5e3bd.94153c92-93f3-4e30-95f6-470e24169ec9";
const headers = {
    "Authorization": "Bearer 3c2e067e-1ead-46dd-b4e1-1087b5f5e3bd.94153c92-93f3-4e30-95f6-470e24169ec9",
    "Accept": "application/json",
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',

  };  
//   const dlBaseUrl = "";
//   const esignBaseUrl = "https://api-testbed.scrive.com/api/v2/documents/";
  const esignHeader = {
    "Authorization" : 'oauth_realm="Scrive",oauth_signature_method="PLAINTEXT",oauth_consumer_key="c48dd647c24ddf06_5193",oauth_signature="9f74234a2f56dd33&8f483429f10939b2",oauth_token="4417a1ab01765e71_13237"',
    "Content-Type": "multipart/form-data", 
    'Access-Control-Allow-Origin': '*',
  } ;

const payload = JSON.stringify({
        "redirectUrl": "http://localhost:3000",
        "method": "auth",
        "provider": "onfido",
        "providerParameters": {
            "onfido": {
                "report": "document",
                "firstName": null,
                "lastName": null,
                "dateOfBirth": null,
                "email": null,
                "uiLocale": "en-US",
                "allowedDocumentTypes": [
                    "DrivingLicence"
                ],
                "allowedDocumentCountries": null,
                "forceMobileDocumentCapture": false,
                "forceCrossDevice": false,
                "additionalReportInfo": "addressInfo",
                "referrerUrlPatternForSdk": null
            }
        }
  });
  
class ScriveService {

    createScriveTransaction(){
        axios.defaults.withCredentials = false;
       return axios.post("/api/v1/transaction/new", payload, {headers});
    //    return axios.post("https://mvnch8pox9.execute-api.ap-south-1.amazonaws.com/default/nrma-sixt-lambda");
    }
    getScriveDLTransaction(transactionId){
        axios.defaults.withCredentials = false;
        return axios.get("/api/v1/transaction/" + transactionId, {headers});
    }

    creatDocument(data) {
        axios.defaults.withCredentials = false;
        return axios.post("/api/v2/documents/new", data, {headers: esignHeader});
    }

    updateDocument(data, documentId) {
        axios.defaults.withCredentials = false;
        return axios.post("/api/v2/documents/" + documentId + "/update", data, {headers: esignHeader});
    } 
    
    startESign(documentId) {
        axios.defaults.withCredentials = false;
        return axios.post("/api/v2/documents/" + documentId + "/start", {}, {headers: {...esignHeader, "Content-Type": "application/json"}});
    }
}

export default new ScriveService()