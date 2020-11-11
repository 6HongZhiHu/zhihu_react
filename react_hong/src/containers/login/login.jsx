import React, { Component } from 'react'
import "./css/login.less"
import logo from "./img/uugai.com-1603100862525.png"
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import {createSaveUserAction} from "../../redux/action_creators/login_action"
import {reqLogin} from "../../api/index"
//import axios from "axios"
const {Item} = Form;


class Login extends Component {
 
  //formRef = React.createRef();
  //提交表单且数据验证成功后回调事件	
  handleSubmit = async (value)=>{
    console.log("提交====>",value);
    const {username,password} = value;
    let result = await reqLogin(username,password)
    const {status,msg} = result;
    if(status === 0){
      //跳转admin页面
      this.props.saveUserInfo(result)
      this.props.history.replace("/admin");
      
    }else{
      message.warning(msg,3)
    }
    // .then(()=>{

    // })
    // .catch(()=>{

    // })

  }
  //提交表单验证失败后的回调事件
  errInfo = (err)=>{
    console.log(err);
    message.error("表单输入错误，请重新输入")
    return;
  }

  //点击密码后验证密码的匹配规则的回调函数
  pwdValidator = (rule, value,callback)=>{
   
   if(!value){
     return Promise.reject("密码不能为空") 
   }else if(value.length>12){
     return Promise.reject("密码必须小于12位")
     //callback("密码必须小于12位")
   }else if(value.length<4){
     return Promise.reject("密码必须大于4位")
     //callback("密码必须大于4位")
   }else if(!(/^\w+$/).test(value)){
     return Promise.reject("密码必须是英文、数字或下划线组成")
     //callback("密码必须是英文、数字或下划线组成")
   }else{
     return Promise.resolve();
   }
  }
  /*
 用户名/密码的的合法性要求
  1). 必须输入
  2). 必须大于等于4位
  3). 必须小于等于12位
  4). 必须是英文、数字或下划线组成
 */

  render() {
    const {isLogin} = this.props;

    if(isLogin){
      return <Redirect to="/admin/home"/>
    }else{
      return (
        <div className="login">
          <header>
            <img src={logo} alt="logo"/>
            <h1>HZH后台管理系统</h1>
          </header>
          <section>
            <h1>用户登录</h1>
            <Form  className="login-form" onFinish={this.handleSubmit} onFinishFailed={this.errInfo}>
              <Item name="username"  
                    rules={[{required: true,message:"用户名不能为空!",type:"string"},
                            {max:12,message:"用户名必须小于12位"},
                            {min:4,message:"用户名必须大于4位"},
                            {pattern:/^\w+$/,message:"用户名必须是英文、数字或下划线组成"}
                          ]}
                    hasFeedback
                    validateFirst
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                />
              </Item>

              <Item name="password"
                    rules={[{validator:this.pwdValidator}]}
                    hasFeedback
              >
                <Input.Password 
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="请输入密码"
                />
              </Item>

              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
                  登录
                </Button>
            </Item>
            </Form>
          </section>
        </div>
      )
    }
  }
}


export default connect(
  state => ({isLogin:state.userInfo.isLogin}),
  {
    saveUserInfo:createSaveUserAction
  }
)(Login)