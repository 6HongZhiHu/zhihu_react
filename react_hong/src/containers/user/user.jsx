import React, { Component } from 'react'
import { Table, Button, Card, Modal, Form, Input, message, Select} from "antd"
import { LayoutOutlined } from '@ant-design/icons';
import { PAGESIZE } from '../../config';
import { reqUserList,reqAdduUser } from '../../api';
import dayjs from "dayjs"
const {Item} = Form
const {Option} = Select
export default class user extends Component {
  formRef = React.createRef();
  state = {
    visible: false,
    userList:[],//用户
    roles:[], //角色
    roleList:[]
  }
  pwdValidator = (rule, value, callback) => {

    if (!value) {
      return Promise.reject("不能为空")
    } else {
      return Promise.resolve();
    }
  }
  handleOk = () => {
    this.formRef.current.validateFields().then(async (value) => {
      
      let result = await reqAdduUser(value)
      //console.log(value)
      const { status, msg,  } = result
      //console.log(result)
      //let userList = [...this.state.userList]
      //userList.unshift(data)
      if (status === 0){
        this.setState({ 
          visible: false,
         // userList
        }) 
        this.getUserList()
        message.info("添加成功")
      }
      else message.error(msg)
      this.formRef.current.resetFields()
    })
    
  }
  handleCancel = () => {
    //this.formRef.current.resetFields();
    this.setState({
      //visible: false,
      visible: false
    });
    this.formRef.current.resetFields()
  }
  showAdd = () =>{
    this.setState({
      visible: true
    });
    
  }
  componentDidMount(){
    
    this.getUserList()
    
  }

  getUserList = async ()=>{
    let result = await reqUserList()
    const {status,data,msg} = result
    //console.log(data)
    //data.users = data.users.reverse
    if(status === 0){
      this.setState({ userList: data.users,roleList:data.roles})
    }
    else message.error(msg) 
  }

  render() {

    const columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },

      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: time => dayjs(time).format("YYYY年 MM月DD日 HH:mm:ss")
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (id) => {
          //console.log(id,this.state)
          let result = this.state.roleList.find((i)=>{
            return i._id === id
          })
          return result.name
        }
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <Button type="link" onClick={this.showAdd}>修改</Button>
            <Button type="link">删除</Button>
          </span>
        )
      },
    ]

    
    return (
      <div>
        <Card 
          title={
            <Button
              type="primary"
              icon={<LayoutOutlined />}
              onClick={this.showAdd}>
              创建用户
            </Button>
          }
        ></Card>
        <Table 
          bordered
          pagination={{defaultCurrent:PAGESIZE}}
          rowKey="_id"
          dataSource={this.state.userList} 
          columns={columns} 
        />
        <Modal
          title="添加角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={this.formRef}>
            <Item
              name="username"
              labelCol={{ md: 5 }}
              rules={[{ validator: this.pwdValidator,required:true }]}
              label="用户名"
            >
              <Input placeholder="请输入用户名"></Input>
            </Item>
            <Item
              labelCol={{ md: 5 }}
              name="password"
              rules={[{ validator: this.pwdValidator, required: true }]}
              label="密码"
            >
              <Input placeholder="请输入用户名"></Input>
            </Item>
            <Item
              name="phone"
              labelCol={{ md: 5 }}
              rules={[{ validator: this.pwdValidator, required: true }]}
              label="手机号"
            >
              <Input placeholder="请输入用户名"></Input>
            </Item>
            <Item
              name="email"
              labelCol={{md:5}}
              rules={[{ validator: this.pwdValidator, required: true }]}
              label="邮箱"
            >
              <Input placeholder="请输入用户名"></Input>
            </Item>
            <Item
              name="role_id"
              labelCol={{md:5}}
              rules={[{ validator: this.pwdValidator, required: true }]}
              label="用户角色名"
            >
              <Select>
                <Option value>请选择一个角色</Option>
                {
                  this.state.roleList.map((item)=>{
                    
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                  })
                }
              </Select>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
