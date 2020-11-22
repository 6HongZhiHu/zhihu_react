import React, { Component } from 'react'
import { Card ,Button,Form,Input, message,Select} from "antd"
import { LeftOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { reqCategory } from '../../api';
import PictureWall from "./picture_wall"
const {Item} = Form
const {Option} = Select

class addUpdate extends Component {
  pictureWall = React.createRef()
  formRef = React.createRef();
  state = {
    categoryList: []
  }
  getCategory = async ()=>{
    let reslut = await reqCategory();
    const {status,msg,data} = reslut;
    if(status === 0) this.setState({categoryList:data})
    else message.error(msg)
  }
  componentDidMount(){
    //console.log(this.props.categoryList);
    const {categoryList} = this.props
    if (categoryList.length)this.setState({ categoryList})
    else this.getCategory()
  }
  //提交表单且数据验证成功后回调事件	
  handleSubmit = (value)=>{
    let imgs = this.pictureWall.current.getImgList();

    console.log(value,imgs)
  }
  pwdValidator = (rule, value, callback) => {

    if (!value) {
      return Promise.reject("不能为空")
    } else {
      return Promise.resolve();
    }
  }
  render() {
    return (
      <div>
        <Card 
          title={
            <div>
              <Button type="link" onClick={() => { this.props.history.goBack() }}>
                <LeftOutlined />
              </Button>
              <span className="title_text">商品详情</span>
            </div>
          }
          extra={<Button type="link">保存</Button>} 
          style={{ width: "100%" }}>
          <Form 
            ref={this.formRef} 
            labelCol={{md:2}} 
            wrapperCol={{md:8}}
            onFinish={this.handleSubmit}
          >
            <Item
              style={{fontSize:"16px"}}
              label="商品名称"
              name="name"
              rules={[{ validator: this.pwdValidator,
                        required:true,message:"请输入商品名称" }]}
            >
              <Input
                placeholder="请输入商品名称"

              />
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品描述"
              name="desc"
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
              rules={[{
                validator: this.pwdValidator,
                required: true, message: "请选择商品分类"
              }]}
            >
             <Select>
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
              name="porductImg"
              wrapperCol={{md:14}}
            >
              <PictureWall ref={this.pictureWall}/>
            </Item>
            <Item
              style={{ fontSize: "16px" }}
              label="商品详情"
              name="porductXq"
            >
              <div>商品富文本编辑器</div>
            </Item>
            <Button type="primary" htmlType="submit" >提交</Button>
          </Form>
        </Card>
        
      </div>
    )
  }
}


export default connect(state=>({categoryList:state.categoryList}))(addUpdate)