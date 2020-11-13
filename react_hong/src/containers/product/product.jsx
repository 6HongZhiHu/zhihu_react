import React, { Component } from 'react'
import { Card, Button, Select,Input ,Table} from "antd"
import { PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import {reqProductList} from "../../api/index"
import {PAGESIZE} from "../../config/index"
const { Option } = Select;

export default class Product extends Component {
  state = {
    prouctList:[],
    total:0,
    pageNum:0,
    pages:0,
  }

  getProductList = async (number)=>{
    let result = await reqProductList(number,PAGESIZE);
    const {status,data} = result;
    console.log(result)
    if(status===0){
      this.setState({
        prouctList:data.list,
        total:data.total,
        pageNum:data.pageNum
      })
    }
  }

  componentDidMount(){
    //首次加载数据分页
    this.getProductList(1)
  }
  
  // demo = (a)=>{
  //   console.log(a);
  //   this.getProductList()
  // }
  render() {
    // const dataSource = [
    //   {
    //     key: '1',
    //     name: '华为meta20手机',
    //     desc: "华为手机",
    //     price: '4299',
    //     status:"在售"
    //   },
    //   {
    //     key: '2',
    //     name: '苹果12',
    //     desc: "苹果手机",
    //     price: '8299',
    //     status: "下架"
    //   },
    // ];

    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        align: "center",
        dataIndex: 'price',
        key: 'price',
        width:"9%",
        render:(price)=>{
          return "￥"+price
        }  
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: "center",
        width: "12%",
        key: 'status',
        render : (status)=>{
          return <div>
            <Button type="primary">下架</Button ><br/>
            <span>{status}</span>
            </div>}
      },
      {
        title: '操作',
        dataIndex: 'cz',
        align: "center",
        width: "9%",
        key: 'cz',
        render:()=>{
          return <div>
            <Button type="link">详情</Button><br/>
            <Button type="link">修改</Button>
          </div>
        }
      },
    ];
    return (
      <div>
        <Card 
          title={
            <div>
              <Select defaultValue="name">
                <Option value="name">按名称搜索</Option>
                <Option value="desc">按描述搜索</Option>
              </Select>
              <Input 
                style={{margin:"0 10px",width:"20%"}}
                placeholder="请输入搜索关键字"
                allowClear
              ></Input>
              <Button type="primary" icon={<SearchOutlined />}></Button>
            </div>
          } 
          extra={<Button type="primary" icon={<PlusCircleOutlined />}>添加商品</Button>} 
          
        >
          <Table 
            dataSource={this.state.prouctList} 
            columns={columns} 
            bordered
            rowKey="_id"
            pagination={{
              total:this.state.total,
              current:this.state.pageNum,
              pageSize:PAGESIZE,
              onChange: this.getProductList
            }}
          />;
        </Card>
      </div>
    )
  }
}
