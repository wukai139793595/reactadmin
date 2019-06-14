import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import dateFns from "date-fns";

import LinkButton from "../../components/link-button/link-button.jsx";
import memory from "../../utils/memory.js";
import { receiveWeather } from "../../api/index.js";
import menuList from "../../config/menuConfig";
import { removeUserStore } from "../../utils/store.js";
import "./header-con.less";
class HeaderCon extends Component {
  state = {
    weather: "",
    dayPictureUrl: "",
    intervalId: 0,
    currentTime: dateFns.format(Date.now(), "YYYY-MM-DD hh:mm:ss")
  };
  componentDidMount() {
    this.intervalId = setInterval(() => {
      let currentTime = dateFns.format(Date.now(), "YYYY-MM-DD hh:mm:ss");
      this.setState({
        currentTime
      });
    }, 1000);

    receiveWeather("杭州").then(res => {
      this.setState({
        weather: res.weather,
        dayPictureUrl: res.dayPictureUrl
      });
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  logout = () => {
    Modal.confirm({
      content: "确认退出",
      onOk: () => {
        removeUserStore();
        this.props.history.replace("/login");
      }
    });
  };
  getHeaderName = () => {
    let path = this.props.location.pathname;
    let headerName = "";
    menuList.forEach((item, index) => {
      if (item.key === path) {
        headerName = item.title;
      } else if (item.children) {
        let temp = item.children.find(ele => path.indexOf(ele.key) === 0);
        if (temp) {
          headerName = temp.title;
        }
      }
    });
    return headerName;
  };
  render() {
    let { username } = memory.user;
    let headerName = this.getHeaderName();
    let { currentTime, weather, dayPictureUrl } = this.state;
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {username}</span>
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{headerName}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderCon);
