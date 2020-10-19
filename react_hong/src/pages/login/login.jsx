import React, { Component } from 'react'
import "./css/login.less"
import logo from "./imgs/uugai.com-1603100862525.png"
import { Form, Input, Button, Icon} from 'antd';
const {Item} = Form;


export default class Login extends Component {
  //formRef = React.createRef();
  //提交表单且数据验证成功后回调事件	
  handleSubmit = (value)=>{
    console.log("提交",value);
    
  }

  pwdValidator = (rule, value,callback)=>{
   console.log(rule, value)
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


  render() {
    return (
      <div className="login">
        <header>
          <img src={logo} alt="logo"/>
          <h1>HZH后台管理系统</h1>
        </header>
        <section>
          <h1>用户登录</h1>
          <Form  className="login-form" onFinish={this.handleSubmit}>
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
                prefix={<Icon type="user" style={{color:"raba(0,0,0,.25)"}}/>}
                placeholder="请输入用户名"
              />
            </Item>

            <Item name="password"
                  rules={[{validator:this.pwdValidator}]}
                  hasFeedback
            >
              <Input.Password 
                prefix={<Icon type="look" style={{color:"raba(0,0,0,.25)"}}/>}
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
