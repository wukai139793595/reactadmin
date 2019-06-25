import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";

import menuList from "../../config/menuConfig";

const { Item } = Form;
const { TreeNode } = Tree;

class AuthRole extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      checkedKeys: props.selectedRows.menus
    };
  }
  static propTypes = {
    selectedRows: PropTypes.object
  };
  getMenus = () => this.state.checkedKeys;
  createNodes = menuList => {
    return menuList.map(item => {
      return (
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.createNodes(item.children) : null}
        </TreeNode>
      );
    });
  };
  onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys);
    this.setState({ checkedKeys });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      checkedKeys: nextProps.selectedRows.menus
    });
  }
  componentWillMount() {
    this.treeNodes = this.createNodes(menuList);
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    let { name } = this.props.selectedRows;
    let { checkedKeys } = this.state;
    return (
      <div>
        <Item label="角色名称" {...formItemLayout}>
          <Input disabled defaultValue={name} />
        </Item>
        <Tree
          defaultExpandAll
          checkable
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="pingtaiquanxian">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

export default AuthRole;
