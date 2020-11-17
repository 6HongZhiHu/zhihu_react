import React, { Component } from 'react'
import { Button, Card, List, } from "antd"
import { LeftOutlined } from '@ant-design/icons';
import {connect} from "react-redux"
import "./detail.less"
import Item from 'antd/lib/list/Item';
//import { createSaveProductAction } from "../../redux/action_creators/product_action"

class detail extends Component {
  state={
    categoryId:"",
    desc: "",
    detail: "",
    imgs: [],
    name: "",
    price: "",
  }
  getProductId = async (id)=>{
    this.setState({
      categoryId: sessionStorage.getItem("categoryId"),
      desc: sessionStorage.getItem("desc"),
      detail: sessionStorage.getItem("detail"),
      imgs: JSON.parse(sessionStorage.getItem("imgs")) || [],
      name: sessionStorage.getItem("name"),
      price: sessionStorage.getItem("price"),
    }) ;
    console.log( )
  }
  componentDidMount(){
    const reduxList = this.props.productList || [];
    const { id } = this.props.match.params
    if (reduxList.length !== 0){ 
      let result = reduxList.find((i)=>{
        return i._id === id
      });
      if(result){
        const {categoryId,desc,detail,imgs,name,price} = result;
        sessionStorage.setItem("categoryId", categoryId);
        sessionStorage.setItem("desc", desc);
        sessionStorage.setItem("detail", detail);
        sessionStorage.setItem("imgs", JSON.stringify(imgs));
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("price", price);
        //console.log(JSON.stringify(imgs))
        this.setState({ categoryId, desc, detail, imgs, name, price})
      }
    }
    else this.getProductId(id)
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
        >
          <List grid={{gutter:3}}>
            <Item className="list">
              <span className="list-left">商品ID:</span>
              <span>{this.state.categoryId}</span>
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
                  return <img key={item} src={`/upload/`+item} alt=""/>
                })
              }
              <span></span>
            </Item>
            <Item className="list">
              <span className="list-left">商品信息:</span>
              <span dangerouslySetInnerHTML={{ __html: this.state.detail}}>
                {}
              </span>
              <span></span>
            </Item>
          </List>
        </Card>
      </div>
    )
  }
}

export default connect(
  state=>({productList:state.productInfo})
)(detail)