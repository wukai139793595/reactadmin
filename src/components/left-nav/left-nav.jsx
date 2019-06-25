import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./left-nav.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends Component {
  state = {};
  hasAuth = key => {
    let menus = this.props.user.role.menus;
    let result = menus.find(item => item === key);
    if (result) {
      return true;
    } else {
      return false;
    }
  };
  createMenuNodes = list => {
    const path = this.props.location.pathname;
    const { username } = this.props.user;
    let menus = this.props.user.role.menus;

    return list.map(item => {
      if (!item.children) {
        if (username === "admin" || item.isPublic || this.hasAuth(item.key)) {
          return (
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        }
      } else {
        if (
          username === "admin" ||
          item.isPublic ||
          item.children.find(child => menus.indexOf(child.key) > -1)
        ) {
          let result = item.children.find(
            child => path.indexOf(child.key) === 0
          );
          if (result) {
            this.openKey = item.key;
          }
          return (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.createMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
    });
  };
  componentWillMount() {
    this.menuNode = this.createMenuNodes(menuList);
  }
  render() {
    let path = this.props.location.pathname;
    if (path.indexOf("/product") === 0) {
      path = "/product";
    }
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="" />
          <h1>管理后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNode}
          {/* <Menu.Item key="1">
            <Link to="/role">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/product">
              <Icon type="user" />
              <span>用户管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/role">
              <Icon type="safety" />
              <span>角色管理</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="appstore" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/category">
                <Icon type="bars" />
                <span>品类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/user">
                <Icon type="tool" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="area-chart" />
                <span>图形图表</span>
              </span>
            }
          >
            <Menu.Item key="9">
              <Icon type="bar-chart" />
              <span>柱形图</span>
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="line-chart" />
              <span>折线图</span>
            </Menu.Item>
            <Menu.Item key="11">
              <Icon type="pie-chart" />
              <span>饼图</span>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    );
  }
}

export default connect(state => ({ user: state.user }))(withRouter(LeftNav));
