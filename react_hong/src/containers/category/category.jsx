import React, { Component } from 'react'
import {Card,Button,Table,message,Modal,Input,Form} from "antd"
import { LayoutOutlined } from '@ant-design/icons';
import {reqCategory,reqAddCategory,reqUpdateCategory} from "../../api/index"
import {PAGESIZE} from "../../config/index"
const {Item} = Form;

export default class Category extends Component {
  formRef = React.createRef();


  state = {
    list:[],   //商品分类列表
    visible: false,
    operType:"",
    isLoading:true,
    modVal:"",
    modId:""
  }

  demo = (a) => {
    // console.log("定位")
    // console.log(a.name,a);
    //console.log(a.name,this.input)
    this.showUpdate(a);
  }

  getList = async ()=>{
    //let res = await reqCategory()
    let res = await reqCategory();
    let { status, data, msg } = res;

    if (status === 0) this.setState({ list: data, isLoading: false })
    else message.error(msg, 1);
  }

  componentDidMount(){
    this.getList();  
  }

  

  showAdd = () => {
    //console.log("???")
    this.setState({
      operType:"新增",
      visible: true,
    });
    if (this.formRef.current) {
      //console.log(this.formRef)
      this.formRef.current.resetFields()
    }
  }

  showUpdate = (a) => {
    //console.log(a)
    this.setState({
      operType: "修改",
      visible: true,
      modVal:a.name,
      modId:a._id
    });
    if (this.formRef.current){
      //console.log(this.formRef)
      this.formRef.current.setFieldsValue({categoryName:a.name})
    }
    
  }

  handleOk = async () => {
    //const [form] = Form.useForm();
    const {operType} = this.state
    
    // if(operType === "新增")  
    // if(operType === "修改")
    this.formRef.current.validateFields().then((value) => {
      // 验证通过后进入
      if (operType === "新增")  this.todoAdd(value)
      if (operType === "修改"){
        const categoryId = this.state.modId;
        const {categoryName} = value;
        let obj = { categoryId, categoryName }
        this.todoUpdate(obj)
      }
    }).catch(err => {
      // 验证不通过时进入
      message.warning("输入有误",1)
     
    });
  }

  //调用add API的
  todoAdd = async (value)=>{
    let reslut = await reqAddCategory(value);
    this.formRef.current.resetFields();
    this.setState({isLoading:false})
    //console.log(reslut)
    const {status,data,msg} = reslut;
    
    if(status === 0){
      message.success("新增成功");
      this.formRef.current.resetFields();
      let list = [...this.state.list];
      list.unshift(data);
      this.setState({list})
      this.setState({
        visible: false,
      });
    } 
    if(status === 1) message.error(msg,1);
  }

  //调用Update API的
  todoUpdate = async (obj) => {
    //console.log(obj)
    let result = await reqUpdateCategory(obj);
    //console.log(result)
    this.getList();
    const {status} = result;
    if(status === 0){
      message.success("修改成功",1)
      this.setState({visible:false,modId:"",modVal:""})
    }
  }

  handleCancel = e => {
    //console.log(e);
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
      modVal:"",
      modId:""
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
    //const [form] = Form.useForm();
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
    const {operType} = this.state
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
            pagination={{ pageSize: PAGESIZE,showQuickJumper:true}}
            loading={this.state.isLoading}
          />
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
              name="categoryName"
              rules={[{ validator: this.pwdValidator }]}
              initialValue={operType==="修改"?this.state.modVal:""}
            >
              <Input 
                placeholder="请输入分类名" 
                
              />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
