import React, { Component } from "react";
import { Card, Button, Table, Modal, message } from "antd";

import AddRole from "./add-role.jsx";
import AuthRole from "./auth-role.jsx";
import { reqRoleList, reqAddRole, reqUpdateRole } from "../../api/index.js";

class Role extends Component {
  constructor(props) {
    super(props);
    this.auth = React.createRef();
  }
  state = {
    disabled: true,
    selectedRows: {},
    visible: 0,
    roleData: []
  };
  // 添加角色
  addRole = () => {
    this.setState(state => ({ visible: 1 }));
  };
  //
  authRole = () => {
    this.setState(state => ({ visible: 2 }));
  };
  //
  addHandleOk = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let result = await reqAddRole({ roleName: values.roleName });
        console.log("result", result);
        if (result && result.status === 0) {
          message.success("添加用户成功");
        }
        this.setState(state => ({ visible: 0 }));
      }
    });
  };
  //
  addHandleCancel = () => {
    this.setState(state => ({ visible: 0 }));
  };
  //
  authHandleOk = async () => {
    let { selectedRows } = this.state;
    selectedRows.menus = this.auth.current.getMenus();
    let result = await reqUpdateRole({
      _id: selectedRows._id,
      menus: selectedRows.menus,
      auth_time: selectedRows.auth_time,
      auth_name: selectedRows.auth_name
    });
    console.log(result);
    if (result && result.status === 0) {
      message.success("gengxinchenggong !!!");
      this.initData();
      this.setState({
        selectedRows: selectedRows,
        visible: 0
      });
    }
  };
  //
  authHandleCancel = () => {
    this.setState({
      visible: 0
    });
  };
  //
  onRow = selectedRows => {
    return {
      onClick: () => {
        this.setState({
          selectedRows
        });
      }
    };
  };
  initData = async () => {
    let result = await reqRoleList();
    if (result && result.status === 0) {
      this.setState(state => ({ roleData: result.data }));
      console.log(result);
    }
  };
  componentWillMount() {
    this.initData();
  }
  render() {
    let title = (
      <span>
        <Button
          type="primary"
          style={{ marginRight: 20 }}
          onClick={this.addRole}
        >
          创建角色
        </Button>
        <Button
          type="primary"
          disabled={!this.state.selectedRows._id}
          onClick={this.authRole}
        >
          设置角色权限
        </Button>
      </span>
    );
    const columns = [
      {
        title: "角色名称",
        dataIndex: "name"
      },
      {
        title: "创建时间",
        dataIndex: "create_time"
      },
      {
        title: "授权时间",
        dataIndex: "auth_time"
      },
      {
        title: "授权人",
        dataIndex: "auth_name"
      }
    ];
    const rowSelection = {
      selectedRowKeys: [this.state.selectedRows._id],
      type: "radio",
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        console.log(record, selected, selectedRows, nativeEvent);
        this.setState({
          selectedRows: record
        });
      },
      // onChange: (selectedRowskey, selectedRows) => {
      //   this.setState({
      //     selectedRows: selectedRows[0]
      //   });
      // },
      getCheckboxProps: record => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name
      })
    };
    let { visible, roleData, selectedRows } = this.state;
    return (
      <Card title={title}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={roleData}
          rowKey="_id"
          pagination={{ defaultPageSize: 1 }}
          onRow={this.onRow}
        />
        <Modal
          title="添加角色"
          visible={visible === 1}
          onOk={this.addHandleOk}
          onCancel={this.addHandleCancel}
        >
          <AddRole setForm={form => (this.form = form)} />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={visible === 2}
          onOk={this.authHandleOk}
          onCancel={this.authHandleCancel}
        >
          <AuthRole selectedRows={selectedRows} ref={this.auth} />
        </Modal>
      </Card>
    );
  }
}

export default Role;
