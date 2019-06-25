import React, { Component } from "react";
import { Modal } from "antd";
import { withRouter } from "react-router-dom";
import dateFns from "date-fns";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LinkButton from "../../components/link-button/link-button.jsx";
// import memory from "../../utils/memory.js";
import { receiveWeather } from "../../api/index.js";
import menuList from "../../config/menuConfig";
import { resetUser } from "../../redux/actions.jsx";
import "./header-con.less";
class HeaderCon extends Component {
  state = {
    weather: "",
    dayPictureUrl: "",
    intervalId: 0,
    currentTime: dateFns.format(Date.now(), "YYYY-MM-DD hh:mm:ss")
  };
  static propTypes = {
    user: PropTypes.object.isRequired,
    resetUser: PropTypes.func.isRequired
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
    clearInterval(this.intervalId);
  }
  logout = () => {
    let self = this;
    Modal.confirm({
      content: "确认退出",
      onOk: () => {
        self.props.resetUser();
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
    let { username } = this.props.user;
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

export default connect(
  state => ({ user: state.user }),
  { resetUser }
)(withRouter(HeaderCon));
