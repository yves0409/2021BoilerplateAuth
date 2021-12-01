import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
// import { postReviewReducer, getReviewReducer } from "./reducers/reviewReducers";
// import { getPortfolioReducer } from "./reducers/portfolioReducers";
// import { getTrendingReducer } from "./reducers/trendingReducers";

const reducer = combineReducers({
  user: userReducer,
  //   userRegister: userRegisterReducer,
  //   reviewsAdded: postReviewReducer,
  //   reviewList: getReviewReducer,
  //   portfolioList: getPortfolioReducer,
  //   trendingList: getTrendingReducer,
});

//if userInfo is in localStorage , set it to the userInfoFromStorage variable
// const userInfoFromStorage = localStorage.getItem("userInfo")
//   ? JSON.parse(localStorage.getItem("userInfo"))
//   : null;

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
