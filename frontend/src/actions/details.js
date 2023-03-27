import { RETRIEVE_RESERVATION_DETAILS } from "./types";
import SixtService from "../services/SixtService";

export const retrieveReservationDetails = () => async (dispatch) => {
    try {
      const res = await SixtService.getReservationByID();
  
      dispatch({
        type: RETRIEVE_RESERVATION_DETAILS,
        payload: res.data,
        
      });
    } catch (err) {
      console.log(err);
    }
  };


