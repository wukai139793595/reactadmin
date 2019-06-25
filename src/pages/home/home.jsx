import React, { Component } from "react";
import { Icon, Card, Statistic, DatePicker, Timeline } from "antd";
import ReactEchart from "echarts-for-react";
import moment from "moment";

import "./home.less";
import LinkButton from "../../components/link-button/link-button.jsx";
const { RangePicker } = DatePicker;
class Home extends Component {
  state = {};
  getOption = () => {
    return {
      title: {
        text: "未来一周气温变化",
        subtext: "纯属虚构"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["最高气温", "最低气温"]
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none"
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} °C"
        }
      },
      series: [
        {
          name: "最高气温",
          type: "line",
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" }
            ]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        },
        {
          name: "最低气温",
          type: "line",
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          markLine: {
            data: [
              { type: "average", name: "平均值" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max"
                },
                {
                  symbol: "circle",
                  label: {
                    normal: {
                      position: "start",
                      formatter: "最大值"
                    }
                  },
                  type: "max",
                  name: "最高点"
                }
              ]
            ]
          }
        }
      ]
    };
  };
  getOption2 = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: [
          "直接访问",
          "邮件营销",
          "联盟广告",
          "视频广告",
          "搜索引擎",
          "百度",
          "谷歌",
          "必应",
          "其他"
        ]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "直接访问",
          type: "bar",
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: "邮件营销",
          type: "bar",
          stack: "广告",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "联盟广告",
          type: "bar",
          stack: "广告",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: "视频广告",
          type: "bar",
          stack: "广告",
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: "搜索引擎",
          type: "bar",
          data: [862, 1018, 964, 1026, 1679, 1600, 1570],
          markLine: {
            lineStyle: {
              normal: {
                type: "dashed"
              }
            },
            data: [[{ type: "min" }, { type: "max" }]]
          }
        },
        {
          name: "百度",
          type: "bar",
          barWidth: 5,
          stack: "搜索引擎",
          data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
          name: "谷歌",
          type: "bar",
          stack: "搜索引擎",
          data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
          name: "必应",
          type: "bar",
          stack: "搜索引擎",
          data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
          name: "其他",
          type: "bar",
          stack: "搜索引擎",
          data: [62, 82, 91, 84, 109, 110, 120]
        }
      ]
    };
  };
  render() {
    const dateFormat = "YYYY/MM/DD";
    return (
      <div className="home">
        <Card
          title="商品总量"
          extra={
            <Icon style={{ color: "rgba(0,0,0,.45)" }} type="question-circle" />
          }
          style={{ width: 250 }}
          headStyle={{ color: "rgba(0,0,0,.45)" }}
        >
          <Statistic
            value={1128163}
            suffix="个"
            style={{ fontWeight: "bolder" }}
          />
          <Statistic
            value={15}
            valueStyle={{ fontSize: 15 }}
            prefix={"周同比"}
            suffix={
              <div>
                %
                <Icon
                  style={{ color: "red", marginLeft: 10 }}
                  type="arrow-down"
                />
              </div>
            }
          />
          <Statistic
            value={10}
            valueStyle={{ fontSize: 15 }}
            prefix={"日同比"}
            suffix={
              <div>
                %
                <Icon
                  style={{ color: "#3f8600", marginLeft: 10 }}
                  type="arrow-up"
                />
              </div>
            }
          />
        </Card>
        <div className="echart-wrap">
          <ReactEchart option={this.getOption()} />
        </div>
        <Card
          style={{ marginTop: "200px" }}
          title={
            <span>
              <LinkButton>xiaoshoulaing</LinkButton>
              <LinkButton>kucunlaing</LinkButton>
            </span>
          }
          extra={
            <RangePicker
              defaultValue={[
                moment("2019/01/01", dateFormat),
                moment("2019/06/01", dateFormat)
              ]}
              format={dateFormat}
            />
          }
        >
          <ReactEchart option={this.getOption2()} />
        </Card>
      </div>
    );
  }
}

export default Home;
