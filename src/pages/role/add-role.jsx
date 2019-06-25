import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const { Item } = Form;

class AddRole extends Component {
  state = {};
  static propTypes = {
    setForm: PropTypes.func.isRequired
  };
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const labelCol = {
      xs: { span: 24 },
      sm: { span: 4 }
    };
    const wrapperCol = {
      xs: { span: 24 },
      sm: { span: 14 }
    };
    return (
      <Form style={{ textAlign: "center" }}>
        <Item label="角色名称" labelCol={labelCol} wrapperCol={wrapperCol}>
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入角色名称" }]
          })(<Input placeholder="请输入角色名称" />)}
        </Item>
      </Form>
    );
  }
}

export default Form.create()(AddRole);
