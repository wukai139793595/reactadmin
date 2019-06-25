import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import logo from "../../assets/images/logo.png";
import "./login.less";
import { asyncLogin } from "../../redux/actions.jsx";

class Login extends Component {
  state = {};
  static propTypes = {
    user: PropTypes.object.isRequired,
    asyncLogin: PropTypes.func.isRequired
  };
  handleSubmit = event => {
    let self = this;
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        console.log("验证失败");
        message.info("验证失败");
      } else {
        let { username, password } = values;
        this.props.asyncLogin(username, password, self);
      }
    });
  };
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback("密码不能为空");
    } else if (value.length < 4) {
      callback("密码不能小于4位");
    } else if (value.length > 12) {
      callback("密码不能大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("用户名必须是字母下划线或数字组成");
    } else {
      callback();
    }
  };
  render() {
    let user = this.props.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "请输入用户名" },
                  { min: 4, message: "用户名不能少于4位" },
                  { max: 12, message: "用户名不能超过12位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是字母下划线或数字组成"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.validatePwd }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.user }),
  { asyncLogin }
)(Form.create()(Login));
