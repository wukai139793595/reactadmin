import { message } from "antd";
import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_PRODUCTS,
  RECEIVE_SEARCH_PRODUCTS
} from "./action-types";

import { setUserStore } from "../utils/store.js";
import { login, reqProducts, reqSearchProducts } from "../api/index.js";

export const setHeadTitle = title => ({ type: SET_HEAD_TITLE, data: title });
export const receiveUser = user => ({ type: RECEIVE_USER, data: user });
export const resetUser = () => {
  setUserStore({});
  return { type: RESET_USER };
};
export const receiveProducts = data => ({ type: RECEIVE_PRODUCTS, data: data });
export const receiveSearchProducts = data => ({
  type: RECEIVE_SEARCH_PRODUCTS,
  data: data
});

export const asyncLogin = (username, password) => {
  return async dispatch => {
    let result = await login({ username, password });
    if (result.status === 0) {
      message.success("登录成功");
      setUserStore(result.data);
      dispatch(receiveUser(result.data));
      // self.props.history.replace("/");
    } else {
      message.error(result.msg);
    }
  };
};

export const getProducts = data => {
  return async dispatch => {
    let result = await reqProducts(data);
    if (result.status === 0) {
      dispatch(receiveProducts(result.data));
    }
  };
};

export const getSearchProducts = data => {
  return async dispatch => {
    let result = await reqSearchProducts(data);
    if (result.status === 0) {
      dispatch(receiveSearchProducts(result.data));
    }
  };
};
