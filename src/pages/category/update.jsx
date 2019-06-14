import React, { Component } from "react";
import { Input, Form } from "antd";
import PropTypes from "prop-types";

class Update extends Component {
  static propTypes = {
    categoryName: PropTypes.string,
    setForm: PropTypes.func
  };
  render() {
    let { categoryName, setForm } = this.props;
    let { getFieldDecorator } = this.props.form;
    setForm(this.props.form);
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            initialValue: categoryName,
            rules: [
              { required: true, message: "请输入分类名称" },
              { max: 20, message: "名字不能超过20 位" }
            ]
          })(<Input ref={input => (this.input = input)} />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Update);
