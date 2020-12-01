import React, { Component } from 'react'
import { Card ,Button,Form,Input, message,Select} from "antd"
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { reqAddporduct, reqCategory, reqUpdateporduct } from '../../api';
import PictureWall from "./picture_wall"
import RichTextEditor from "./rich_text_editor"
const {Item} = Form
const {Option} = Select

class addUpdate extends Component {
  pictureWall = React.createRef()
  formRef = React.createRef();
  RichTextEditor = React.createRef();
  state = {
    categoryList: [],
    operaType:"add",
    name:"",
    desc:"",
    price:"",
    detail:"",
    imgs:[],
    _id:""
  }
  getCategory = async ()=>{
    let reslut = await reqCategory();
    const {status,msg,data} = reslut;
    if(status === 0) this.setState({categoryList:data})
    else message.error(msg)
   
  }
  getProduct = async (id)=>{
    //没有这个接口根据id查商品
    // let result = await reqProductId(id);
    // const {status,data} = result;
    // if(status === 0 && data){
    //   this.setState({...data})
    //   //回显图片 
    //   this.pictureWall.current.setImgArr(data.imgs)
    //   //回显富文本
    //   this.RichTextEditor.current.setRichDetail(data.detail)
    // }
    // else message.error("商品请求失败")
    this.setState({
      categoryId: sessionStorage.getItem("categoryId") || "",
      desc: sessionStorage.getItem("desc") || "",
      detail: sessionStorage.getItem("detail") || "",
      imgs: JSON.parse(sessionStorage.getItem("imgs")) || [],
      name: sessionStorage.getItem("name") || "",
      price: sessionStorage.getItem("price") || "",
      _id: sessionStorage.getItem("_id") || "",
    });
    //console.log(this.state.imgs)
    // this.pictureWall.current.setImgArr(this.state.imgs)
    // this.RichTextEditor.current.setRichDetail(this.state.detail)
  }
  componentWillMount(){
    const { id } = this.props.match.params;//商品ID
    const { productList } = this.props
    //console.log(id)

    if (id) this.setState({ operaType: "update" });
    if (productList.length) {
      let result = productList.find((item) => {
        return item._id === id
      })
      //console.log(result)
      if (result) {
        this.setState({ ...result })
        
      }
     
    }
    else this.getProduct(id);
  }
  componentDidMount(){
    //console.log(this.props.categoryList);
    const {id} = this.props.match.params;//商品ID
    const { productList,categoryList } = this.props
    //console.log(id)
    
    if (categoryList.length)this.setState({ categoryList})
    else this.getCategory()
    if (id) this.setState({ operaType: "update" });
    if(productList.length){
      //console.log(productList)
      let result = productList.find((item)=>{
        return item._id === id
      })
      
      //console.log(result)
      //this.formRef.current.setFieldsValue({ ...result })
      const { categoryId, desc, detail, imgs, name, price ,_id} = result;
      sessionStorage.setItem("categoryId", categoryId);
      sessionStorage.setItem("desc", desc);
      sessionStorage.setItem("detail", detail);
      sessionStorage.setItem("imgs", JSON.stringify(imgs));
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("price", price);
      sessionStorage.setItem("_id", _id);
      if(result){
        console.log(result)
        this.setState({ ...result })
        //回显图片 
        this.pictureWall.current.setImgArr(result.imgs)
        //回显富文本
        this.RichTextEditor.current.setRichDetail(result.detail || "")
      }
      
    }
    else {
      this.pictureWall.current.setImgArr(this.state.imgs)
      this.RichTextEditor.current.setRichDetail(this.state.detail)
    }
  }
  demo = (a,b,c) => {
    
  }
  //提交表单且数据验证成功后回调事件	
  handleSubmit = async (value)=>{
    let imgs = this.pictureWall.current.getImgList();
    let detail = this.RichTextEditor.current.getDetail();
    let pCategoryId = value.categoryId;
    const {_id} = this.state
    let result,myMsg;
    if(this.state.operaType === "add"){ 
      myMsg = "商品添加成功"
      result = await reqAddporduct({ ...value, detail, imgs, pCategoryId}) 
    }else{
      myMsg = "商品修改成功"
      result = await reqUpdateporduct({ ...value, detail, imgs, pCategoryId,_id})
    }
    const {status,msg} = result;
    if(status === 0){
      message.info(myMsg);
      this.props.history.goBack()
      //this.props.history.relace("/admin/prod_about/product")
    }else{
      message.error(msg)
    }
  }
  pwdValidator = (rule, value, callback) => {

    if (!value) {
      return Promise.reject("不能为空")
    } else {
      return Promise.resolve();
    }
  }
  render() {
    const {operaType} = this.state
   // console.log(this.state.name)
    return (
      <div>
        <Card 
          title={
            <div>
              <Button type="link" onClick={() => { this.props.history.goBack() }}>
                <LeftOutlined />
              </Button>
            <span className="title_text">{operaType==="update"?"商品修改":"商品添加"}</span>
            </div>
          }
          //extra={<Button type="link">保存</Button>} 
          style={{ width: "100%" }}>
          <Form 
            ref={this.formRef} 
            labelCol={{md:2}} 
            wrapperCol={{md:8}}
            onFinish={this.handleSubmit}
            onFieldsChange={this.demo}
          >
            <Item
              style={{fontSize:"16px"}}
              label="商品名称"
              name="name"
              initialValue={this.state.name || ""}
              rules={[{ validator: this.pwdValidator,
                        required:true,message:"请输入商品名称" }]}
            >
              <Input
                //initialValue={this.state.name || ""}
                placeholder="请输入商品名称"

              />
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品描述"
              name="desc"
              initialValue ={this.state.desc || ""}
              rules={[{
                validator: this.pwdValidator,
                required: true, message: "请输入商品描述"
              }]}
            >
              <Input
                placeholder="请输入商品描述"
              />
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品价格"
              name="price"
              initialValue={this.state.price || ""}
              rules={[{
                validator: this.pwdValidator,
                required: true, message: "请输入商品价格"
              }]}
            >
              <Input
                type="number"
                placeholder="请输入商品价格"
                addonBefore="￥"
                addonAfter="元"
              />
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品分类"
              name="categoryId"
              initialValue={this.state.categoryId || ""}
              rules={[{
                validator: this.pwdValidator,
                required: true, message: "请选择商品分类"
              }]}
            >
              <Select >
                <Option value="">
                 请选择商品分类
               </Option>
               {
                 this.state.categoryList.map((item)=>{
                 return <Option value={item._id} key={item._id}>{item.name}</Option>
                 })
               }
             </Select>
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品图片"
              //name="porductImg"
              wrapperCol={{md:14}}
            >
              <PictureWall ref={this.pictureWall}/>
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品详情"
              //name="porductXq"
              wrapperCol={{ md: 20 }}
            >
              <RichTextEditor ref={this.RichTextEditor}></RichTextEditor>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" >提交</Button>
            </Item>
           
          </Form>
        </Card>
        
      </div>
    )
  }
}


export default connect(state=>({
  categoryList:state.categoryList,
  productList:state.productInfo
}))(addUpdate)