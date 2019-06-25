import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import HeaderCon from "../../components/header-con/header-con.jsx";
import LeftNav from "../../components/left-nav/left-nav.jsx";
import Home from "../home/home.jsx";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import notFound from "../not-found/not-found.jsx";
import menuList from "../../config/menuConfig";

import Line from "../charts/line";
import Pie from "../charts/pie";
// import memory from "../../utils/memory.js";

const { Header, Footer, Sider, Content } = Layout;

let comObj = {
  "/home": Home,
  "/category": Category,
  "/product": Product,
  "/user": User,
  "/role": Role,
  "/charts/bar": Bar,
  "/charts/line": Line,
  "/charts/pie": Pie
};
class Admin extends Component {
  state = {};
  static propTypes = {
    user: PropTypes.object.isRequired
  };
  hasAuth(key) {
    let { username } = this.props.user;
    if (username !== "admin") {
      var menus = this.props.user.role.menus;
      var result = menus.find(item => item === key);
    }
    return result ? true : false;
  }
  createRoute(list) {
    let { username } = this.props.user;
    return list.map(item => {
      if (!item.children) {
        if (username === "admin" || item.isPublic || this.hasAuth(item.key)) {
          return (
            <Route
              path={item.key}
              component={comObj[item.key]}
              key={item.key}
            />
          );
        }
      } else {
        return this.createRoute(item.children);
      }
    });
  }
  componentWillMount() {
    this.routeNodes = this.createRoute(menuList);
    // console.log("routeNodes", this.routeNodes);
  }
  render() {
    let user = this.props.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ width: "100%", height: "100%" }}>
        <Sider style={{ height: "100%" }}>
          <LeftNav />
        </Sider>
        <Layout>
          <Header
            style={{
              backgroundColor: "#ffffff",
              height: "80px",
              padding: "0",
              lineHeight: "40px"
            }}
          >
            <HeaderCon />
          </Header>
          <Content
            style={{ margin: "18px 16px 0 16px", backgroundColor: "#fff" }}
          >
            <Switch>
              <Redirect from="/" to="/home" exact />
              {this.routeNodes}
              <Route to="/notfound" component={notFound} />
              {/* <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/home" component={Home} /> */}
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaaaaa" }}>
            推荐使用谷歌浏览器，可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect(state => ({ user: state.user }))(Admin);
