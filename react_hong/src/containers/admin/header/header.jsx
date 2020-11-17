import React, { Component, } from 'react'
import { Button, Modal, message} from "antd"
import { FullscreenOutlined, FullscreenExitOutlined} from '@ant-design/icons';
import screenfull from "screenfull"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import dayjs from "dayjs"
import { createDeleteUserAction } from "../../../redux/action_creators/login_action"
import "./css/header.less"
import {reqWeather} from "../../../api/index"
import menuConfig from "../../../config/menuConfig.jsx"

class header extends Component {
  state = {
    isFull:false,
    visible:false,
    date: dayjs().format("YYYY年 MM月DD日 HH:mm:ss"),
    title: this.props.title
  }
  fullscreen = ()=>{
    //全屏按钮切换
    screenfull.toggle();
  }
  logOut = ()=>{
    //console.log(this.props);
    //console.log(e);
    message.info("已退出登录")
    this.props.deleteUser()
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  //获取天气
  getWheather = async()=>{
    //let res = await reqWeather()
    reqWeather()
    //console.log(res)
  }
  
  //生命周期组件挂载之后或者状态第二次更新
  componentDidMount(){
    //console.log(this.props)
    //监听屏幕是否全屏切换图标
    screenfull.on("change",()=>{
      let isFull = !this.state.isFull;
      this.setState({ isFull })
    });
    this.timeId = setInterval(()=>{
      this.setState({ date: dayjs().format("YYYY年 MM月DD日 HH:mm:ss")})
    });
    this.getWheather();
    //console.log(this.props)
    this.getTitle()
  }

  //生命周期函数在即将销毁的组件前调用
  componentWillUnmount(){
    //清除setInterval
    //我们不能在组件销毁后设置state，防止出现内存泄漏的情况
    //清除定时器
    clearInterval(this.timeId)
  }
  
  handleCancel = e => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };
  getTitle = ()=>{
    let key = this.props.location.pathname
    if (key.indexOf("product") !== -1) key = "/admin/prod_about/product"
    let title = "";
    menuConfig.forEach((item)=>{
      if(item.children instanceof Array){
        let tmp = item.children.find((i)=>{
          return i.key === key;
        })
        if(tmp) title = tmp.title
      }else{
        if (item.key === key) title = item.title;
      }
    });
    this.setState({ title })
  }
  render() {
    return (
      <header className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullscreen}>
            <FullscreenOutlined style={{ display: (this.state.isFull ? "none" :"block") }} />
            <FullscreenExitOutlined style={{ display: (this.state.isFull ? "block" : "none") }}/>
          </Button>
            <span className="username">欢迎，{ this.props.userInfo.user.username }</span>
          <Button type="link" onClick={this.showModal}>
            退出登录
           </Button>
            <Modal
              title="提示"
              visible={this.state.visible}
              onOk={this.logOut}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <p style={{textAlign:"center",fontSize:"18px",padding:"-5px",margin:"0"}}>是否需要退出登录</p>
            </Modal>
         
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.props.title || this.state.title}
          </div>
          <div className="header-bottom-right">
            {this.state.date}
            <img src="http://api.map.baidu.com/images/weather/night/leizhenyu.png" alt=""/>
            晴&nbsp;&nbsp;&nbsp;温度：2 ~ 3
          </div>
        </div>
      </header>
    )
  }
}


export default connect(state=>({
  userInfo: state.userInfo,
  title:state.title
}),{
  deleteUser:createDeleteUserAction
})(withRouter(header))