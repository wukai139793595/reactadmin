import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Add from "./add.jsx";
import Detail from "./detail.jsx";
import Home from "./home.jsx";
import "./product.less";

class Product extends Component {
  state = {};
  render() {
    return (
      <Switch>
        <Redirect from="/product" to="/product/home" exact />
        <Route path="/product/detail" component={Detail} />
        <Route path="/product/add" component={Add} />
        <Route path="/product/home" component={Home} />
      </Switch>
    );
  }
}

export default Product;
