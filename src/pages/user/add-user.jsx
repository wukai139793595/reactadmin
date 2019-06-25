import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";

const { Item } = Form;
const { Option } = Select;

class AddUser extends Component {
  state = {};
  static propTypes = {
    visible: PropTypes.string.isRequired,
    userInfo: PropTypes.object.isRequired,
    setForm: PropTypes.func.isRequired,
    roleList: PropTypes.array
  };
  findRole = role_id => {
    let name = "";
    this.props.roleList.forEach((ele, ind) => {
      if (ele._id === role_id) {
        name = ele.name;
      }
    });
    return name;
  };
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, roleList } = this.props;
    const { username, phone, email, role_id } = this.props.userInfo;
    return (
      <Form
        labelCol={{
          xs: { span: 24 },
          sm: { span: 6 }
        }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 14 }
        }}
      >
        <Item label="用户名">
          {getFieldDecorator("username", {
            initialValue: username,
            rules: [{ required: true, message: "请输入用户名" }]
          })(<Input placeholder="请输入用户名" />)}
        </Item>
        {visible === "createUser" ? (
          <Item label="密码">
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码" }]
            })(<Input placeholder="请输入密码" />)}
          </Item>
        ) : null}

        <Item label="电话号码">
          {getFieldDecorator("phone", {
            initialValue: phone
          })(<Input placeholder="请输入电话号码" />)}
        </Item>
        <Item label="邮箱">
          {getFieldDecorator("email", {
            initialValue: email
          })(<Input placeholder="请输入邮箱" />)}
        </Item>

        <Item label="角色">
          {getFieldDecorator("role_id", {
            initialValue: this.findRole(role_id)
          })(
            <Select>
              {roleList.map((item, index) => (
                <Option value={item._id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddUser);
