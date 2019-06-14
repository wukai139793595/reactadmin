import React, { Component } from "react";
import { Card, Button, Icon, Table, Modal, message } from "antd";

import LinkButton from "../../components/link-button/link-button.jsx";
import Update from "./update.jsx";
import Add from "./add.jsx";
import {
  reqCategorys,
  reqAddCategory,
  reqUpdateCategory
} from "../../api/index.js";

class Category extends Component {
  state = {
    parentId: "0", //父级Id
    categorys: [], //一级分类列表
    subCategorys: [], // 二级分类列表
    loading: false, //是否显示加载中
    category: {}, //选中要操作的分类
    modalVisible: 0 //0是都不显示，1显示修改，2显示添加
  };
  showUpdate = category => {
    this.setState({
      modalVisible: 1,
      category
    });
  };
  addCategory = () => {
    this.setState({
      modalVisible: 2
    });
  };
  handleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          modalVisible: 0
        });
        let result = await reqUpdateCategory(
          this.state.category._id,
          values.categoryName
        );
        this.form.resetFields();
        if (result && result.status === 0) {
          message.success("修改成功");
          this.getCategory();
        }
      }
    });
  };
  addHandleOk = () => {
    this.form.validateFields(async (err, values) => {
      let { parentId, categoryName } = values;
      console.log(parentId, categoryName);
      if (!err) {
        this.setState({
          modalVisible: 0
        });
        let result = await reqAddCategory(categoryName, parentId);
        this.form.resetFields();
        if (result && result.status === 0) {
          message.success("添加分类成功");
          this.getCategory();
        }
      }
    });
  };
  handleCancel = () => {
    this.setState({
      modalVisible: 0
    });
  };
  showTopCategory = () => {
    this.setState({
      parentId: "0",
      subCategorys: []
    });
  };
  showSubCategorys = category => {
    console.log("category", category);
    this.setState(
      {
        parentId: category._id
      },
      async () => {
        this.getCategory();
      }
    );
  };
  getCategory = async () => {
    this.setState({ loading: true });
    let parentId = this.state.parentId || "0";

    let result = await reqCategorys(parentId);
    this.setState({ loading: false });
    if (result && result.status === 0) {
      if (parentId === "0") {
        this.setState({
          categorys: result.data
        });
      } else {
        this.setState({
          subCategorys: result.data
        });
      }
    }
  };
  componentWillMount() {
    this.getCategory();
  }
  render() {
    let {
      loading,
      parentId,
      categorys,
      subCategorys,
      modalVisible,
      category
    } = this.state;
    let extra = (
      <Button type="primary" onClick={this.addCategory}>
        <Icon type="plus" />
        添加
      </Button>
    );
    let columns = [
      {
        title: "分类名称",
        dataIndex: "name"
      },
      {
        title: "更多",
        render: category => (
          <span>
            <LinkButton
              onClick={() => {
                this.showUpdate(category);
              }}
            >
              修改分类
            </LinkButton>
            {parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategorys(category);
                }}
              >
                查看子分类
              </LinkButton>
            ) : null}
          </span>
        ),
        width: 300
      }
    ];
    let title =
      parentId === "0" ? (
        "一级分类"
      ) : (
        <span>
          <LinkButton onClick={this.showTopCategory}>一级分类</LinkButton>
          <Icon type="right" />
          <span>二级分类</span>
        </span>
      );

    return (
      <Card title={title} extra={extra} style={{ marginTop: "20px" }}>
        <Table
          loading={loading}
          bordered
          rowKey="_id"
          columns={columns}
          dataSource={parentId === "0" ? categorys : subCategorys}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
          size="middle"
        />
        <Modal
          title="确认修改分类"
          visible={modalVisible === 1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Update
            categoryName={category.name}
            setForm={form => {
              this.form = form;
            }}
          />
        </Modal>
        <Modal
          title="确认添加"
          visible={modalVisible === 2}
          onOk={this.addHandleOk}
          onCancel={this.handleCancel}
        >
          <Add
            categorys={categorys}
            parentId={parentId}
            setForm={form => {
              this.form = form;
            }}
          />
        </Modal>
      </Card>
    );
  }
}

export default Category;
