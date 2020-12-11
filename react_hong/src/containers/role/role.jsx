import React, { Component, } from 'react'
import { Card, Button, Table, Modal, Input, Form, message,Tree} from "antd"
import { LayoutOutlined } from '@ant-design/icons';
import { reqGetRole, reqAddRole, reqUpdateRole } from '../../api';
import dayjs from "dayjs"
import {connect} from "react-redux"
import meunList1 from "../../config/menuConfig"
const {Item} = Form
//const {TreeNode} = Tree
const meunList = [
  {
    key:"top",
    title:"最高权限",
    children:[
      ...meunList1
    ]
  }
]
console.log(meunList)
class role extends Component {

  formRef = React.createRef();
  state = {
    roleList: [],   //商品分类列表
    visible: false,
    Qxvisible:false,
    //autoExpandParent:true,
   // expandedKeys:["0-0-0","0-0-1"],//默认打开的节点
    checkedKeys:[],
    meunList,
    _id:"",
    menus:[],
  }
  pwdValidator = (rule, value, callback) => {

    if (!value) {
      return Promise.reject("不能为空")
    } else {
      return Promise.resolve();
    }
  }
  //点击新增按钮
  showAdd = ()=>{
    this.setState({
      visible: true,
    });
  }
  //点击赋权按钮
  showFq = (a) => {
    const { _id,menus } = a;
    // const {roleList} = this.state
    // let result = roleList.find((item)=>{
    //   return item._id === a.id
    // })
    // if(result) this.setState({checkedKeys:result})
    this.setState({
      Qxvisible: true,
      _id,
      checkedKeys:menus
    });
  }
  //点击确认的回调
  handleOk = () =>{
    this.formRef.current.validateFields().then(async (value) => {
      // 验证通过后进入
      console.log(value)
      let result = await reqAddRole(value)
      const {status,msg} = result
      if(status === 0){
        message.info("添加成功")
        this.getRoleLIst();
        this.setState({visible:false})
      }
      else message.error(msg)
      
    }).catch(err => {
      // 验证不通过时进入
      message.warning("输入有误", 1)
    });
  }
  //点击设置权限确认的回调
  handleQxOk = async () => {
    const {_id,checkedKeys} = this.state
    const {username} = this.props
    let result = await reqUpdateRole({_id,menus:checkedKeys,auth_name:username})
    const {status , msg} = result;
    if(status === 0){
      message.info("授权成功")
      this.setState({Qxvisible:false})
      this.getRoleLIst()
    }
    else message.error(msg)
  }
  //点击取消的回调
  handleCancel =()=>{
    //this.formRef.current.resetFields();
    this.setState({
      //visible: false,
      visible:false
    });
  }
  //点击设置权限取消的回调
  handleQxCancel = () => {
    //this.formRef.current.resetFields();
    this.setState({
      //visible: false,
      Qxvisible: false
    });
  }
  demo = (a)=>{
    //console.log(a)
    this.showFq(a)
  }
  getRoleLIst = async ()=>{
    let result = await reqGetRole();
    const {status,data,msg} = result
    if(status === 0 ) this.setState({roleList:data})
    else message.error(msg)
  }
  componentDidMount(){
    this.getRoleLIst()
  }
  //--------------------------terr-------------------
  

  onCheck = (checkedKeys) => {
    //console.log('onCheck', checkedKeys);
    this.setState({checkedKeys})
  };

  //-------------------------tree-----------------

  render() {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(time)=>dayjs(time).format("YYYY年 MM月DD日 HH:mm:ss")
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render: (time) => time?dayjs(time).format("YYYY年 MM月DD日 HH:mm:ss"):""
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      },
      {
        title: '操作',
        //dataIndex: 'piston',
        key: 'piston',
        width: "25%",
        align: "center",
        render: (a) => {
          return <Button type="link" onClick={() => { this.demo(a) }}>角色授权</Button>
        }
      }
    ];
    return (
      <div>
        
        <Card
          title="角色管理"
          style={{ width: "100%" }}
          extra={
            <Button
              type="primary"
              icon={<LayoutOutlined />}
              onClick={this.showAdd}>
              新增
            </Button>
          }>
          <Table
            bordered
            dataSource={this.state.roleList}
            columns={columns} rowKey="_id"
          />
        </Card>
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
              name="roleName"
              rules={[{ validator: this.pwdValidator }]}
            >
              <Input
                placeholder="请输入角色名"
              />
            </Item>
          </Form>
        </Modal>
        <Modal
          title="角色赋权"
          visible={this.state.Qxvisible}
          onOk={this.handleQxOk}
          onCancel={this.handleQxCancel}
          okText="确定"
          cancelText="取消"
        >
          {/* <Tree
            checkable
            defaultExpandAll={true}
            checkedKeys={checkedKeys}
            onCheck={this.onCheck}
          > */}
            <Tree
              defaultExpandAll
              checkable //允许选中
              //onExpand={this.onExpand} //收缩展开的回调
              //expandedKeys={this.state.expandedKeys} //（受控）默认展开指定的树节点
              //autoExpandParent={this.state.autoExpandParent} //是否自动展开父节点
              onCheck={this.onCheck}
              checkedKeys={this.state.checkedKeys} //（受控）选中复选框的树节点
              treeData={this.state.meunList}
            >
            
            </Tree>
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({username:state.userInfo.user.username}),{}
)(role)