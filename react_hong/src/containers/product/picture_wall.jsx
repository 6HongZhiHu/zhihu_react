import React, { Component } from 'react'
import { Upload,Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../config';
import { reqDeletePic } from '../../api';


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}


export default class PictureWall extends Component {
  state = {
    previewVisible: false, //是否展示预览窗
    previewImage: '', //要预览的图片url地址变成base64编码
    previewTitle: '',
    fileList: [
      
    ],
  };


  //上传文件改变时的状态 关闭预览窗
  handleCancel = () => this.setState({ previewVisible: false });

  //点击文件链接或预览图标时的回调 展示预览窗
  handlePreview = async file => {
    //如果图片片段没有url也没有转换过base64 调用如下方法吧图片转换base64
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  //当图片状态发生改变的回调
  handleChange = async ({file, fileList }) => {
    if (file.status === "done"){
      fileList[fileList.length - 1].url = file.response.data.url;
      fileList[fileList.length - 1].name = file.response.data.name;
    }
    if (file.status === "removed") {

      let result = await reqDeletePic({name:file.name});
      //console.log(result,file)
      const {status,msg} = result;
      if(status === 0) message.info("图片删除成功")
      else message.warning(msg)

    }
    this.setState({ fileList })
  };

  setImgArr = (imgsArr)=>{
    let fileList = []
    imgsArr.forEach((item,index)=>{
      fileList.push({uid:-index,name:item,url:`${BASE_URL}/upload/${item}`})
    })
    this.setState({fileList})
  }
  getImgList = ()=>{
    let res = [];
    this.state.fileList.forEach((item)=>{
      res.push(item.name)
    })
    return res;
  }

  sizeHeader=(file)=>{
    //console.log(file)
  }

render(){
  const { previewVisible, previewImage, fileList, previewTitle } = this.state;
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  );
  //设置上传图片请求头加入token
  const token = localStorage.getItem('token')
  return(
  <div>
      <Upload
        //设置请求头
        headers={{token}}
        beforeUpload={this.sizeHeader}
        name="image"
        //接收图片服务器的地址
        action={`${BASE_URL}/manage/img/upload`}
        //照片墙的展示方式
        listType="picture-card"
        //读取图片列表 一个数组包含多个图片对象{uid:xx,name:xxx,url:xxx}
        fileList={fileList}
        //点击预览图的回调
        onPreview={this.handlePreview}
        //图片状态改变的回调
        onChange={this.handleChange}
      >
        {/** 控制上传图片最大数量是否隐藏上传按钮 */}
        {fileList.length >= 8 ? null : uploadButton} 
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={this.handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
  </div>
  )
};

}