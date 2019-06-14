import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import HeaderCon from "../../components/header-con/header-con.jsx";
import LeftNav from "../../components/left-nav/left-nav.jsx";
import Home from "../home/home.jsx";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import memory from "../../utils/memory.js";

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component {
  state = {};
  render() {
    let user = memory.user;
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
          <Content>
            <Switch>
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/home" component={Home} />
              <Redirect to="/home" />
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

export default Admin;
