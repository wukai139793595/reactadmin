import React, { Component } from "react";
import { Card, Table, Button, Modal, message } from "antd";

import {
  reqUserList,
  reqUpdateUser,
  reqCreateUser,
  reqRoleList,
  reqRemoveUser
} from "../../api/index.js";

import LinkButton from "../../components/link-button/link-button.jsx";
import AddUser from "./add-user.jsx";

class User extends Component {
  state = {
    userList: [],
    loading: false,
    userInfo: {},
    visible: ""
  };
  //获取所有用户信息
  initData = async () => {
    this.setState({ loading: true });

    let result = await Promise.all([reqUserList(), reqRoleList()]);
    this.setState({ loading: false });
    if (result) {
      this.setState(state => ({
        userList: result[0].data.users,
        roleList: result[1].data
      }));
    }
  };
  //创建用户
  createUser = () => {
    this.setState({ userInfo: {} });
    this.setState(state => ({ visible: "createUser" }));
  };
  //修改用户信息
  updateUser = userInfo => {
    this.setState({ userInfo });
    this.setState(state => ({ visible: "updateUser" }));
  };
  // 删除用户
  removeUser = async userInfo => {
    let result = await reqRemoveUser({
      userId: userInfo._id
    });
    if (result && result.status === 0) {
      this.initData();
      message.success("删除用户成功");
    }
  };
  //Modal确认按钮
  handleOk = () => {
    let { visible } = this.state;
    let result = null;
    this.form.validateFields(async (err, values) => {
      if (!err) {
        if (visible === "createUser") {
          const { username, password, phone, email, role_id } = values;
          result = await reqCreateUser({
            username,
            password,
            phone,
            email,
            role_id
          });
        } else if (visible === "updateUser") {
          const { username, phone, email } = values;
          console.log(this.state.userInfo._id, this.state.userInfo.role_id);
          result = await reqUpdateUser({
            _id: this.state.userInfo._id,
            username,
            phone,
            email,
            role_id: this.state.userInfo.role_id
          });
        }
        console.log(result);
        if (result && result.status === 0) {
          message.success(
            `${visible === "createUser" ? "添加用户成功" : "修改用户成功"}`
          );
          this.setState(state => ({ visible: "" }));
          this.initData();
        } else {
          message.error(result.msg);
        }
      }
    });
  };
  //Modal取消按钮
  handleCancel = () => {
    this.setState(state => ({ visible: "" }));
  };
  componentWillMount() {
    this.initData();
  }
  render() {
    let title = (
      <Button type="primary" onClick={this.createUser}>
        创建用户
      </Button>
    );
    let columns = [
      { title: "用户名", key: "username", dataIndex: "username", width: "16%" },
      { title: "邮箱", key: "email", dataIndex: "email", width: "16%" },
      { title: "电话", key: "phone", dataIndex: "phone", width: "16%" },
      {
        title: "注册时间",
        key: "create_time",
        dataIndex: "create_time",
        width: "16%"
      },
      { title: "所属角色", key: "role_id", dataIndex: "role_id", width: "16%" },
      {
        title: "操作",
        key: "action",
        render: userInfo => (
          <span>
            <LinkButton onClick={() => this.updateUser(userInfo)}>
              修改
            </LinkButton>
            <LinkButton onClick={() => this.removeUser(userInfo)}>
              删除
            </LinkButton>
          </span>
        ),
        width: "16%"
      }
    ];
    let { userList, loading, visible, userInfo, roleList } = this.state;
    return (
      <Card title={title}>
        <Table
          loading={loading}
          columns={columns}
          dataSource={userList}
          rowkey="_id"
          bordered
          pagination={{ showQuickJumper: true, defaultPageSize: 1 }}
        />
        <Modal
          title={visible === "updateUser" ? "修改用户" : "添加用户"}
          visible={
            this.state.visible === "createUser" ||
            this.state.visible === "updateUser"
          }
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUser
            userInfo={userInfo}
            visible={visible}
            roleList={roleList}
            setForm={form => (this.form = form)}
          />
        </Modal>
      </Card>
    );
  }
}

export default User;
