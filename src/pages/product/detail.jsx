import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, List, Icon } from "antd";

import { reqCategoryInfo } from "../../api/index";
import { IMG_BASE_URL } from "../../utils/constents";
const { Item } = List;
class Detail extends Component {
  state = {
    firstCategory: "",
    secondCategory: ""
  };
  initData = async () => {
    let { pCategoryId, categoryId } = this.props.location.state.product;
    if (pCategoryId === "0") {
      let result = await reqCategoryInfo({ categoryId: categoryId });
      this.setState({
        firstCategory: result.data.name
      });
    } else {
      let result = await Promise.all([
        reqCategoryInfo({ categoryId: pCategoryId }),
        reqCategoryInfo({ categoryId: categoryId })
      ]);
      this.setState({
        firstCategory: result[0].data.name,
        secondCategory: result[1].data.name
      });
    }
  };
  componentWillMount() {
    this.initData();
  }
  render() {
    let title = (
      <div>
        <Icon
          type="arrow-left"
          style={{
            color: "green",
            fontSize: 24,
            marginRight: 10,
            verticalAlign: "middle"
          }}
          onClick={() => this.props.history.goBack()}
        />
        <span>商品详情</span>
      </div>
    );
    let {
      name,
      desc,
      price,
      pCategoryId,
      imgs,
      detail
    } = this.props.location.state.product;
    let { firstCategory, secondCategory } = this.state;
    return (
      <Card title={title}>
        <List className="detail-list">
          <Item>
            <span>商品名称</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span>商品描述:</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span>商品价格:</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span>所属分类:</span>
            <span>
              {secondCategory
                ? firstCategory + " -> " + secondCategory
                : firstCategory}
            </span>
          </Item>
          <Item>
            <span>商品图片:</span>
            {imgs.map((ele, ind) => (
              <img src={IMG_BASE_URL + ele} alt="" key={ind} />
            ))}
          </Item>
          <Item>
            <span>商品详情:</span>
            <span>{detail}</span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default withRouter(Detail);
