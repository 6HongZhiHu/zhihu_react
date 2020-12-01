import React from 'react'
import {
  AppstoreOutlined,
  HomeOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined

} from '@ant-design/icons';
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/admin/home', // 对应的path
    isPublic: true, // 图标名称
    icon: <HomeOutlined/>
  },
  {
    title: '商品',
    key: '/admin/prod_about',
    icon: <AppstoreOutlined />,
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/admin/prod_about/category',
        icon: <BarsOutlined></BarsOutlined>
      },
      {
        title: '商品管理',
        key: '/admin/prod_about/product',
        icon: <ToolOutlined />
      },
    ]
  },

  {
    title: '用户管理',
    key: '/admin/user',
    icon: <UserOutlined />
  },
  {
    title: '角色管理',
    key: '/admin/role',
    icon: <SafetyCertificateOutlined />
  },

  {
    title: '图形图表',
    key: '/admin/charts',
    icon:<AreaChartOutlined />,
    children: [
      {
        title: '柱形图',
        key: '/admin/charts/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: '折线图',
        key: '/admin/charts/pie',
        icon: <LineChartOutlined />,
      },
      {
        title: '饼图',
        key: '/admin/charts/line',
        icon:<PieChartOutlined />,
      },
    ]
  },
]

export default menuList