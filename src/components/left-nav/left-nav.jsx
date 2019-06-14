import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import "./left-nav.less";
import logo from "../../assets/images/logo.png";
import menuList from "../../config/menuConfig";
const { SubMenu } = Menu;
class LeftNav extends Component {
  state = {};
  createMenuNodes = list => {
    return list.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
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
    });
  };
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="" />
          <h1>管理后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[path]}
          mode="inline"
          theme="dark"
        >
          {this.createMenuNodes(menuList)}
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

export default withRouter(LeftNav);
