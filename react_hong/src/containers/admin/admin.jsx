import React, { Component } from 'react'
import {connect} from "react-redux"
import { Layout } from "antd"
import {createDeleteUserAction} from "../../redux/action_creators/login_action"
import {reqCategory} from "../../api/index"
import {Route,Switch,Redirect} from "react-router-dom"
import  Header from "./header/header"
import LeftNav from "./left_nav/left_nav"
import Home from "../../components/home/home"
import Category from "../category/category"
import Product from "../product/product"
import User from "../user/user"
import Role from "../role/role"
import Bar from "../bar/bar"
import Pie from "../pie/pie"
import Line from "../line/line"
import "./css/admin.less"
const { Footer, Sider, Content } = Layout;


class Admin extends Component {
  componentDidMount(){
    //console.log(this.props)
  };
  logOut = ()=>{
    this.props.delete()
  }
  demo = async()=>{
    let res = await reqCategory();
    console.log(res);
    
  }
  render() {
    const {isLogin} = this.props.userInfo
    if(!isLogin){
      //this.props.history.replace("/login");
      return <Redirect to="/login"/>
    }else{
      return (
        <Layout className="admin">
          <Sider className="sider">
            <LeftNav></LeftNav>
          </Sider>
          <Layout>
            <Header></Header>
            <Content className="content">
              <Switch>
                <Route path="/admin/home" component={Home} />
                <Route path="/admin/prod_about/category" component={Category} />
                <Route path="/admin/prod_about/product" component={Product} />
                <Route path="/admin/user" component={User} />
                <Route path="/admin/role" component={Role} />
                <Route path="/admin/charts/bar" component={Bar} />
                <Route path="/admin/charts/pie" component={Pie} />
                <Route path="/admin/charts/line" component={Line} />
                <Redirect to="admin/home"/>
              </Switch>
            </Content>
            <Footer className="footer"> 推荐使用谷歌浏览器，可以获得最佳体验</Footer>
          </Layout>
        </Layout>
      )
    }
  }
}

export default connect(state=>({userInfo:state.userInfo}),
  {
    delete:createDeleteUserAction
  }
)(Admin)