import React, { Component } from "react";
import { Card, Form, Input, Icon, Button, message } from "antd";

import PictrueWall from "./picture-wall.jsx";
import LazyOption from "./lazy-option";
import RichText from "./rich-text";
import { reqAddProduct, reqUpdateProduct } from "../../api/index.js";

const { Item } = Form;
const { TextArea } = Input;
class Add extends Component {
  constructor(props) {
    super(props);
    this.oPictrueWall = React.createRef();
    this.oLazyOptions = React.createRef();
    this.oEditor = React.createRef();
  }
  state = {};
  validatorNumber = (rule, value, callback) => {
    if (value <= 0) {
      callback("请输入大于零的金额");
    } else {
      callback();
    }
  };
  formSubmit = event => {
    event.preventDefault();
    console.log("oEditor", this.oEditor.current.getContent());
    console.log("oLazyOptions", this.oLazyOptions.current.getValue());
    console.log("oPictrueWall", this.oPictrueWall.current.getImgList());
    let category = this.oLazyOptions.current.getValue();
    let detail = this.oEditor.current.getContent();
    let imgs = this.oPictrueWall.current.getImgList();
    let pCategoryId = category[0];
    let categoryId = category[1];
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { productName, productDesc, number } = values;
        let result;
        if (!this.props.location.state) {
          result = await reqAddProduct({
            categoryId,
            pCategoryId,
            name: productName,
            desc: productDesc,
            price: number,
            detail,
            imgs
          });
          if (result && result.status === 0) {
            message.success("添加商品成功");
            this.props.history.replace("/product");
          }
        } else {
          let _id = this.props.location.state._id;
          result = await reqUpdateProduct({
            _id,
            categoryId,
            pCategoryId,
            name: productName,
            desc: productDesc,
            price: number,
            detail,
            imgs
          });
          if (result && result.status === 0) {
            message.success("添加修改成功");
            this.props.history.replace("/product");
          }
        }
      }
    });
  };
  render() {
    let { getFieldDecorator } = this.props.form;

    if (this.props.location.state) {
      var {
        imgs,
        detail,
        pCategoryId,
        categoryId,
        name,
        desc,
        price
      } = this.props.location.state;
      imgs = imgs || [];
      pCategoryId = pCategoryId || "";
      categoryId = categoryId || "";
    }
    imgs = imgs || [];
    let title = (
      <div>
        <Icon
          type="arrow-left"
          style={{
            color: "green",
            marginRight: 10,
            fontSize: 24,
            verticalAlign: "middle"
          }}
          onClick={() => this.props.history.goBack()}
        />
        <span>添加商品</span>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };

    return (
      <Card title={title}>
        <Form {...formItemLayout} onSubmit={this.formSubmit}>
          <Item label="商品名称">
            {getFieldDecorator("productName", {
              initialValue: name,
              rules: [{ required: true }]
            })(<Input placeholder="请输入商品名称" />)}
          </Item>
          <Item label="商品描述">
            {getFieldDecorator("productDesc", {
              initialValue: desc,
              rules: [{ required: true }]
            })(
              <TextArea
                placeholder="请输入商品描述"
                autosize={{ minRows: 2, maxRows: 6 }}
              />
            )}
          </Item>
          <Item label="商品价格">
            {getFieldDecorator("number", {
              initialValue: price,
              rules: [{ required: true }, { validator: this.validatorNumber }]
            })(
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonAfter="元"
              />
            )}
          </Item>
          <Item label="商品分类">
            <LazyOption
              ref={this.oLazyOptions}
              pCategoryId={pCategoryId}
              categoryId={categoryId}
            />
          </Item>
          <Item label="图片上传">
            <PictrueWall ref={this.oPictrueWall} imgs={imgs} />
          </Item>

          <Item
            labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 18 }
            }}
          >
            <RichText ref={this.oEditor} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(Add);
