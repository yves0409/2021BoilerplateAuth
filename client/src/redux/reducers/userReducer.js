import { LOGGED_IN_USER_REQUEST, LOGGED_OUT } from "../types";

//GET PORTFOLIOS
export const userReducer = (state = null, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_REQUEST:
      return action.payload;
    case LOGGED_OUT:
      return action.payload;

    default:
      return state;
  }
};
