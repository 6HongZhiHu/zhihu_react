import React, { Component } from 'react'
import {Card,Button,Table,message,Modal,Input,Form} from "antd"
import { LayoutOutlined } from '@ant-design/icons';
import {reqCategory} from "../../api/index"
import {PAGESIZE} from "../../config/index"
const {Item} = Form;
//const [form] = Form.useForm();


export default class Category extends Component {
  
  formRef = React.createRef();
  
  state = {
    list:[],   //商品分类列表
    visible: false,
    operType:""
  }

  demo = (a) => {
    // console.log("定位")
    // console.log(a.name,a);
    //console.log(a.name,this.input)
    this.showUpdate();
  }

  getList = async ()=>{
    //let res = await reqCategory()
  }

  async componentDidMount(){
    //this.getList()
    let res = await reqCategory();
    console.log(res)
    let {status,data,msg} = res;

    // data.map((i)=>{
    //   return i.key = i._id;
    // })
  
    if(status === 0 ) this.setState({list:data})
    else message.error(msg,1);
  }

  showAdd = () => {
    //console.log("???")
    this.setState({
      operType:"新增",
      visible: true,
    });
  }

  showUpdate = () => {
    //console.log("???")
    this.setState({
      operType: "修改",
      visible: true,
    });
  }

  handleOk = async e => {
    //const {operType} = this.state
    // if(operType === "新增")  
    // if(operType === "修改")
    try {
      //const values = await form.validateFields();
      this.formRef.current.resetFields();
      this.setState({
        visible: false,
      });
    }catch(err){
      message.warning("表单输入有误",1)
    }
   
  }

  handleCancel = e => {
    //console.log(e);
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  }

  pwdValidator = (rule, value, callback) => {

    if (!value) {
      return Promise.reject("不能为空")
    } else {
      return Promise.resolve();
    }
  }
  render() {
    
    const columns = [
      {
        title: '分类名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        //dataIndex: 'piston',
        key: 'piston',
        width:"25%",
        align:"center",
        render: (a) => {
          return <Button type="link" onClick={()=>{this.demo(a)}}>修改分类</Button>
        }
      },

    ];
    
    return (
      <div>
        <Card 
          title="文字" 
          style={{ width: "100%" }}
          extra={<Button 
                   type="primary" 
                   icon={<LayoutOutlined/>} 
                   onClick={this.showAdd} 
                >
                  新增
                </Button>}
        >
          <Table 
            bordered 
            dataSource={this.state.list} 
            columns={columns} rowKey="_id" 
            pagination={{ pageSize: PAGESIZE}}/>
        </Card>
        <Modal
          title={`${this.state.operType}分类`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form ref={this.formRef}>
            <Item 
              name="listName"
              rules={[{ validator: this.pwdValidator }]}
              
            >
              <Input placeholder="请输入分类名" />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
