import React, { Component } from 'react'
import { Menu } from 'antd';
import {Link,withRouter} from "react-router-dom"
// import {
//   HomeOutlined,
// } from '@ant-design/icons';
import {connect} from "react-redux"
import logo from "../../../static/img/uugai.com-1603100862525.png"
import "./css/left_nav.less"
import menuConfig from "../../../config/menuConfig.jsx"
import {createSaveTitleAction} from "../../../redux/action_creators/title_action"

const { SubMenu } = Menu;


class LeftNav extends Component {
  state = {
    collapsed: false,
  };
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  hasAuth = (item)=>{
    //校验菜单权限
    const { menus, username} = this.props
    //console.log(username)
    if(username === "admin"){
      return true
    }else if(!item.children){
      return menus.find((item2)=>{
        return item2 === item.key
      })
    }else if(item.children){
      return item.children.some((item3)=>{return menus.indexOf(item3.key) !== -1})
    }
    
  }
  createTag = (target)=>{
    return target.map((item)=>{
      if(this.hasAuth(item)){
        if (!item.children) {
          return (
            <Menu.Item key={item.key} icon={item.icon}
              onClick={() => { this.props.saveTitle(item.title) }}>
              <Link to={item.key}>
                {item.title}
              </Link>
            </Menu.Item>
          )
        } else {
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.createTag(item.children)}
            </SubMenu>
          )
        }
      }else return false
    })
  }
  componentDidMount(){
   //获取路由地址
   // console.log([this.props.location.pathname])
  }
  render() {
    let { pathname } = this.props.location
    return (
      <div >
        <header className="nav-header">
          <img src={logo} alt=""/>
          <h1>HZH后台管理</h1>
        </header>
        <Menu
          defaultSelectedKeys={pathname.indexOf("product") !== -1 ? "/admin/prod_about/product" : pathname}
          defaultOpenKeys={[pathname]}
          mode="inline"
          theme="dark"
        >
          {
            this.createTag(menuConfig)
          }
         
        </Menu>
      </div>
    )
  }
}
 //用withRouter把普通组件的props属性中加入路由参数
export default connect(state=>({
  menus:state.userInfo.user.role.menus,
  username: state.userInfo.user.username
}),
  {saveTitle: createSaveTitleAction}
)
(withRouter(LeftNav))