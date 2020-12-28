import React, { Component } from 'react'
import { Button, Card, List, message, } from "antd"
import { LeftOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import "./detail.less"
import Item from 'antd/lib/list/Item';
import { reqCategory } from '../../api';
//import { createSaveProductAction } from "../../redux/action_creators/product_action"

class detail extends Component {
  state={
    categoryId:"",
    categoryName:"",
    desc: "",
    detail: "",
    imgs: [],
    name: "",
    price: "",
    isLoading:true
  }
  getProductId = async (id)=>{
    //模拟异步请求 请求商品详细信息
    this.setState({
      categoryId: sessionStorage.getItem("categoryId") || "",
      desc: sessionStorage.getItem("desc") || "",
      detail: sessionStorage.getItem("detail") || "",
      imgs: JSON.parse(sessionStorage.getItem("imgs")) || [],
      name: sessionStorage.getItem("name") || "",
      price: sessionStorage.getItem("price") || "",
    });
    this.categoryId = sessionStorage.getItem("categoryId")
    this.setState({ isLoading: false })
  }
  //获取商品分类
  getCategory = async ()=>{
    let result = await reqCategory()
    const {status,data,msg} = result;
    if(status === 0){
      let result = data.find((item)=>{
        return item._id === this.categoryId
      })
      if(result) this.setState({categoryName:result.name})
      else message.error(msg)
    }
  }
  componentDidMount(){
    //console.log(this.props)
    const reduxList = this.props.productList || [];
    const reduxCategory = this.props.categoryList || [];

    const { id } = this.props.match.params
    if (reduxList.length !== 0){ 
      let result = reduxList.find((i)=>{
        return i._id === id
      });
      if(result){
        const {categoryId,desc,detail,imgs,name,price} = result;
        sessionStorage.setItem("categoryId", categoryId || "");
        sessionStorage.setItem("desc", desc || "");
        sessionStorage.setItem("detail", detail || "");
        sessionStorage.setItem("imgs", JSON.stringify(imgs) || "");
        sessionStorage.setItem("name", name || "");
        sessionStorage.setItem("price", price || "");
        //console.log(JSON.stringify(imgs))
        //this.setState({ categoryId, desc, detail, imgs, name, price})
        this.setState({...result});
        this.setState({isLoading:false})
        this.categoryId = categoryId
      }
    }
    else this.getProductId(id)
    if(reduxCategory.length !== 0){
      let category = reduxCategory.find((item)=>{
       return item._id === this.categoryId
      });
      //console.log(category)
      if(category.name || category) this.setState({categoryName:category.name || ""})
    }else this.getCategory()
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
          loading={false}
        >
          <List grid={{gutter:3}}>
            <Item className="list">
              <span className="list-left">商品分类:</span>
              <span>{this.state.categoryName}</span>
              <span></span>
            </Item>
            <Item className="list">
              <span className="list-left">商品名称:</span>
              <span>{this.state.name}</span>
              <span></span>
            </Item>
            <Item className="list">
              <span className="list-left">商品描述:</span>
              <span>{this.state.desc}</span>
              <span></span>
            </Item>
            <Item className="list">
              <span className="list-left">商品价格:</span>
              <span>{this.state.price}</span>
              <span></span>
            </Item>
            <Item className="list">
              <span className="list-left">商品图片:</span>
              {
                this.state.imgs.map((item)=>{
                  return <img width="200px" key={item} src={`/upload/`+item} alt=""/>
                })
              }
              <span></span>
            </Item>
            <Item 
              className="list"
            >
              <span className="list-left">商品信息:</span>
              <span dangerouslySetInnerHTML={{ __html: this.state.detail}}></span>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}

export default connect(
  state=>({productList:state.productInfo,categoryList:state.categoryList})
)(detail)