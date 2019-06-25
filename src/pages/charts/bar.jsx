import React, { Component } from "react";
import { Card, Button } from "antd";
import ReactEcharts from "echarts-for-react";

class Bar extends Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20], // 销量的数组
    stores: [6, 10, 25, 20, 15, 10] // 库存的数组
  };
  updateOption = () => {
    let { sales, stores } = this.state;
    sales = sales.map((item, index) => item + 2);
    stores = stores.map((item, index) => item - 2);
    this.setState({
      sales,
      stores
    });
  };
  getOption = (sales, stores) => {
    return {
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: sales
        },
        {
          name: "库存",
          type: "bar",
          data: stores
        }
      ]
    };
  };
  render() {
    const { sales, stores } = this.state;
    let title = (
      <Button type="primary" onClick={this.updateOption}>
        更新
      </Button>
    );
    return (
      <Card title={title}>
        <ReactEcharts option={this.getOption(sales, stores)} />
      </Card>
    );
  }
}

export default Bar;
