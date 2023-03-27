import axios from 'axios';
import { encode } from "base-64";

 
const username = 'iag';
const password = '9a788776-73ad-41fb-b739-b7de6acde741';
const sixtTokenURL = 'https://identity-stage.goorange.sixt.com/auth/realms/External/protocol/openid-connect/token';
const sixtGetReservationURL = 'https://api.stage.mobility.rent.sixt.com/v1/reservations/'
const sixtReservationURL = 'https://api.stage.mobility.rent.sixt.com/v1/reservations' 
const ReservationID = '985ab555-2bc3-4af6-8633-e84173275722'
const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Basic ' + encode(`${username}:${password}`)
}
const payload = new URLSearchParams({
   "grant_type" : "client_credentials"
  });

  const SixtData = JSON.stringify({
    "configurationId": "38466ef4-dc7c-4297-af7c-c9adffd637c3",
    "communicationLanguage": "en",
    "drivers": [
    {
      "givenName": "Nikhil",
      "familyName": "Test",
      "birthdate": "1988-05-05",
      "address": {
        "countryCode": "AU"
      },
      "contact": {
        "telephone": {
          "countryCode": "+67",
          "number": "1234567890"
        },
        "email": "nikhil.chordia@sixt.com.au"
      }
    }
  ],
  "corporateCustomerNumber": "19245546"
  })


const SixtHeader = {
  "Access-Control-Allow-Origin": "*",
  "Accept": "application/json",
  "Accept-Language" : "en-US",
  "Content-Type": "application/json",
}
const ReservationHeader = {
    'Access-Control-Allow-Origin': '*',
    "Accept": "application/json",
    "Content-Type": "application/json",
}
class SixtService {

    createToken() {
        axios.defaults.withCredentials = false;
        return axios.post(sixtTokenURL, payload, {headers});
    }
    getReservationByID(){
        axios.defaults.withCredentials = false;
        return axios.get("https://y807zns357.execute-api.ap-south-1.amazonaws.com/default/getReservationById");
    }
    createReservation(token) {
       console.log(token)
        axios.defaults.withCredentials = false;
        return axios.post(sixtReservationURL,SixtData, {headers: {...ReservationHeader,  'Authorization': 'Bearer' + ' ' + `${token}`}});
    }

}

export default new SixtService()