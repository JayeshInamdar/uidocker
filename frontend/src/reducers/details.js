import { RETRIEVE_RESERVATION_DETAILS } from "../actions/types";

const initialState = [""];

function detailsReducer(details = initialState, action) {
  switch (action.type) {
    case RETRIEVE_RESERVATION_DETAILS:
      return action.payload;

    default:
      return details;
  }
}

export default detailsReducer;
