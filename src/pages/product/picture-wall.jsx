import React, { Component } from "react";
import { Upload, Icon, Modal, message } from "antd";
import PropTypes from "prop-types";

import { reqImgDelete } from "../../api/index";
import { IMG_BASE_URL } from "../../utils/constents";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  constructor(props) {
    super(props);
    let { imgs } = props;
    let fileList = imgs.map((item, index) => {
      return {
        uid: -index,
        name: item,
        status: "done",
        url: IMG_BASE_URL + item
      };
    });
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList
    };
  }
  static propTypes = {
    imgs: PropTypes.array
  };
  getImgList = () => {
    let { fileList } = this.state;
    let imgList = fileList.map((item, index) => {
      return item.name;
    });
    return imgList;
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      let result = file.response;
      if (result.status === 0) {
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      }
    } else if (file.status === "removed") {
      let result = await reqImgDelete({ name: file.name });
      if (result.status === 0) {
        message.success("删除成功");
      }
    }
    this.setState({ fileList });
  };

  componentWillMount() {
    //   {
    //     uid: "-1",
    //     name: "xxx.png",
    //     status: "done",
    //     url:
    //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //   }
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          name="image"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
