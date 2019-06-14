import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import PropTypes from "prop-types";

class Add extends Component {
  static propTypes = {
    setForm: PropTypes.func,
    categorys: PropTypes.array,
    parentId: PropTypes.string
  };
  componentWillMount() {
    this.props.setForm(this.props.form);
  }
  render() {
    let { Option } = Select;
    let { categorys, parentId } = this.props;
    let { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("parentId", {
            initialValue: parentId
          })(
            <Select>
              <Option value="0">一级分类</Option>
              {categorys.map((item, index) => (
                <Option value={item._id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            rules: [{ required: true, message: "请输入分类名" }]
          })(<Input placeholder="请输入分类名称" />)}
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(Add);
