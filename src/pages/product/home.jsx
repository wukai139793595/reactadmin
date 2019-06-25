import React, { Component } from "react";
import { Card, Select, Input, Button, Table, message } from "antd";
import { NavLink, Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getProducts, getSearchProducts } from "../../redux/actions.jsx";
import LinkButton from "../../components/link-button/link-button.jsx";
import { reqUpdateStatus } from "../../api/index";

const { Option } = Select;
class Home extends Component {
  state = {
    pageNum: 1,
    pageSize: 1,
    searchType: "productName",
    searchValue: ""
  };
  static propTypes = {
    products: PropTypes.object,
    getProducts: PropTypes.func.isRequired,
    getSearchProducts: PropTypes.func.isRequired
  };
  pageChange = page => {
    let pageNum = page;
    this.setState({
      pageNum: pageNum
    });
    let pageSize = this.state.pageSize;
    this.getData(pageNum, pageSize);
  };
  selcetChange = value => {
    this.setState({
      searchType: value
    });
  };
  inputChange = event => {
    this.setState({
      searchValue: event.target.value
    });
  };
  searchProducts = () => {
    // | pageNum | Y | Number | 页码
    //   | pageSize | Y | Number | 每页条目数
    //   | productName | N | String | 根据商品名称搜索
    //   | productDesc | N | String | 根据商品描述搜索
    let { searchType, searchValue, pageNum, pageSize } = this.state;
    let { getSearchProducts } = this.props;
    if (searchValue.trim()) {
      getSearchProducts({
        pageNum: pageNum,
        pageSize: pageSize,
        [searchType]: searchValue
      });
    } else {
      this.getData(pageNum, pageSize);
    }
  };
  updataStatus = async product => {
    let { _id, status } = product;
    let result = await reqUpdateStatus({
      productId: _id,
      status: status === 1 ? 2 : 1
    });
    if (result.status === 0) {
      let { pageNum, pageSize } = this.state;
      message.success(`${status === 1 ? "下架" : "上架"}成功`);
      this.getData(pageNum, pageSize);
    }
  };
  getData = async (pageNum, pageSize) => {
    let { getProducts } = this.props;

    getProducts({
      pageNum: pageNum,
      pageSize: pageSize
    });
  };
  componentWillMount() {
    let { pageNum, pageSize } = this.state;
    this.getData(pageNum, pageSize);
  }
  render() {
    let title = (
      <span>
        <Select
          defaultValue="productName"
          style={{ width: 160, marginRight: 16 }}
          onChange={this.selcetChange}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 160, marginRight: 16 }}
          onChange={this.inputChange}
        />
        <Button type="primary" onClick={this.searchProducts}>
          搜索
        </Button>
      </span>
    );
    let exact = (
      <Button
        type="primary"
        icon="plus"
        onClick={() => this.props.history.push("/product/add")}
      >
        添加商品
      </Button>
    );
    let columns = [
      {
        title: "商品名称",
        dataIndex: "name",
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: "商品描述",
        dataIndex: "desc"
      },
      {
        title: "价格",
        dataIndex: "price"
      },
      {
        title: "状态",
        width: 100,
        render: product => {
          return (
            <div style={{ width: 64 }}>
              <Button
                type="primary"
                size="default"
                onClick={() => this.updataStatus(product)}
              >
                {product.status === 2 ? "上架" : "下架"}
              </Button>
              {product.status === 2 ? "已下架" : "在售"}
            </div>
          );
        }
      },
      {
        title: "操作",
        width: 100,
        render: product => {
          return (
            <div style={{ width: 40 }}>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/detail", { product })
                }
              >
                详情
              </LinkButton>
              <LinkButton
                onClick={() => this.props.history.push("/product/add", product)}
              >
                修改
              </LinkButton>
            </div>
          );
        }
      }
    ];
    let products = this.props.products.list;
    let { total, pageNum } = this.props.products;

    return (
      <Card title={title} extra={exact}>
        <Table
          columns={columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            defaultPageSize: 1,
            showQuickJumper: true,
            total: total,
            current: pageNum,
            onChange: this.pageChange
          }}
        >
          table
        </Table>
      </Card>
    );
  }
}

export default connect(
  state => ({ products: state.products }),
  { getProducts, getSearchProducts }
)(withRouter(Home));
