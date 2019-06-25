import { combineReducers } from "redux";

import { getUserStore } from "../utils/store.js";

import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_PRODUCTS,
  RECEIVE_SEARCH_PRODUCTS
} from "./action-types";

function headTitle(state = "shouye", action) {
  switch (action.type) {
    case SET_HEAD_TITLE:
      return action.data;
    default:
      return state;
  }
}

let initUser = getUserStore();
function user(state = initUser, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {};
    default:
      return state;
  }
}
function products(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return action.data;
    case RECEIVE_SEARCH_PRODUCTS:
      return action.data;
    default:
      return state;
  }
}
export default combineReducers({ headTitle, user, products });
