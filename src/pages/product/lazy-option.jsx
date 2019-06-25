import React, { Component } from "react";
import { Cascader } from "antd";
import PropTypes from "prop-types";

import { reqCategoryList } from "../../api/index";

export default class LazyOptions extends React.Component {
  constructor(props) {
    super(props);
    if (props.pCategoryId) {
      if (props.pCategoryId == "0") {
        this.state = {
          value: [props.categoryId],
          options: []
        };
      } else {
        this.state = {
          value: [props.pCategoryId, props.categoryId],
          options: []
        };
      }
    } else {
      this.state = {
        options: []
      };
    }
  }
  static propTypes = {
    pCategoryId: PropTypes.string,
    categoryId: PropTypes.string
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      value: value
    });
  };
  getValue = () => this.state.value;
  loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    this.getData(targetOption.value, targetOption);
  };
  getData = async (parentId, targetOption) => {
    let result = await reqCategoryList({ parentId });
    if (result && result.status === 0) {
      if (parentId === "0") {
        let options = result.data.map((item, index) => ({
          value: item._id,
          label: item.name,
          isLeaf: false
        }));
        this.setState({
          options: options
        });
        if (this.props.pCategoryId && this.props.pCategoryId !== "0") {
          let res = await reqCategoryList({ parentId: this.state.value[0] });
          let newRes = res.data.map((item, index) => ({
            value: item._id,
            label: item.name,
            isLeaf: true
          }));
          let option = options.find((ele, ind) => {
            return ele.value === this.props.pCategoryId;
          });
          option.children = newRes;
          this.setState({
            options: [...this.state.options]
          });
        }
      } else {
        let options = result.data.map((item, index) => ({
          value: item._id,
          label: item.name,
          isLeaf: true
        }));
        targetOption.loading = false;
        targetOption.children = options;
        console.log(options);

        this.setState({
          options: [...this.state.options]
        });
      }
    }
  };
  componentWillMount() {
    this.getData("0");
  }
  render() {
    return (
      <Cascader
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
        defaultValue={this.state.value}
      />
    );
  }
}
