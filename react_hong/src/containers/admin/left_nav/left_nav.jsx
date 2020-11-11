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
  createTag = (target)=>{
    return target.map((item)=>{
      if(!item.children){
        return( 
          <Menu.Item key={item.key} icon={item.icon} 
          onClick={()=>{this.props.saveTitle(item.title)}}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        )
      }else{
        return(
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.createTag(item.children)}
            </SubMenu>
        )
      }
    })
  }
  componentDidMount(){
   //获取路由地址
    console.log([this.props.location.pathname])
  }
  render() {
    return (
      <div >
        <header className="nav-header">
          <img src={logo} alt=""/>
          <h1>HZH后台管理</h1>
        </header>
        <Menu
          defaultSelectedKeys={[this.props.location.pathname]}
          defaultOpenKeys={this.props.location.pathname.split("/").splice(2)}
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
export default connect(state=>({}),
  {saveTitle: createSaveTitleAction}
)
(withRouter(LeftNav))