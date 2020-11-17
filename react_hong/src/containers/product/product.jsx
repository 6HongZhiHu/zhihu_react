import React, { Component } from 'react'
import { Card, Button, Select,Input ,Table, message} from "antd"
import { PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import {connect} from "react-redux"
import {createSaveProductAction} from "../../redux/action_creators/product_action"
import {reqProductList,reqUpdateProducStatus,reqSearchProduct} from "../../api/index"
import {PAGESIZE} from "../../config/index"
const { Option } = Select;

class Product extends Component {
  state = {
    prouctList:[],
    total:0,//一共有几页
    pageNum:0,//当前页
    pages:0,
    keyWord:"",
    searchType:"productName"
  }

  getProductList = async (number=1)=>{
    let result
    //console.log(searchType,keyWord);
    if (this.isSearch) { 
      const { searchType, keyWord } = this.state; 
      result = await reqSearchProduct(number, PAGESIZE, searchType, keyWord);
    }else{
      result = await reqProductList(number,PAGESIZE);
    }
   
    const {status,data,msg} = result;
    if(data.list) this.props.SaveProduct(data.list);
    
    //console.log(number)
    if(status===0){
      this.setState({
        prouctList:data.list,
        total:data.total,
        pageNum:data.pageNum
      })
    }
    else message.error(msg)
  }
  
  undateProdstatus = async ({_id,status})=>{
    let prouctList = [...this.state.prouctList]//浅克隆一个数组
    //console.log(id)
    if(status === 1) status = 2
    else status = 1
    let reslut = await reqUpdateProducStatus({categoryId:_id,status});
    console.log(reslut)
    if(reslut.status === 0){
      message.success("商品更新成功");
      prouctList.map((item)=>{
        if(item._id === _id){
          item.status = status
        }
        return item
      })
      this.setState({prouctList})
    }
    else message.error(reslut.msg)
  }

  search = async ()=>{
    // const {searchType,keyWord} = this.state;
    // //console.log(searchType,keyWord);
    // let result = await reqSearchProduct(1,PAGESIZE,searchType,keyWord);
    // //console.log(result)
    // const {data,status,msg} = result;
    // if(status === 0){
    //   this.setState({
    //     prouctList: data.list,
    //     total: data.total,
    //     pageNum: data.pageNum
    //   })
    // }
    // else message.error(msg)
    this.isSearch = true;
    this.getProductList()
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
        //dataIndex: 'status',
        align: "center",
        width: "12%",
        key: 'status',
        render : (item)=>{
          const {status} = item;
          return <div>
            <Button 
              type={status === 1 ? "danger" : "primary"}
              onClick={ ()=>{this.undateProdstatus(item)} }
            >
              {status === 1 ? "下架" : "上架"}
            </Button ><br/>
            <span>{status === 1 ? "在售" : "停售"}</span>
            </div>}
      },
      {
        title: '操作',
        //dataIndex: 'cz',
        align: "center",
        width: "9%",
        key: 'cz',
        render:(e)=>{
          return <div>
            <Button type="link" onClick={() => { this.props.history.push(`/admin/prod_about/product/detail/${e._id}`) }}>详情</Button><br/>
            <Button type="link" onClick={() => { this.props.history.push(`/admin/prod_about/product/add_update/${e._id}`) }}>修改</Button>
          </div>
        }
      },
    ];
    return (
      <div>
        <Card 
          title={
            <div>
              <Select defaultValue="productName" onChange={(v) => { this.setState({ searchType: v }) }}>
                <Option value="productName">按名称搜索</Option>
                <Option value="productDesc">按描述搜索</Option>
              </Select>
              <Input 
                style={{margin:"0 10px",width:"20%"}}
                placeholder="请输入搜索关键字"
                allowClear
                onChange={(e)=>{this.setState({keyWord:e.target.value})}}
              ></Input>
              <Button 
                type="primary" 
                onClick={this.search} 
                icon={<SearchOutlined />}
              >搜索</Button>
            </div>
          } 
          extra={<Button 
            type="primary"
            onClick={()=>{ this.props.history.push("/admin/prod_about/product/add_update")}} 
            icon={<PlusCircleOutlined 
            />
          }>添加商品</Button>} 
          
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
export default connect(state =>({}),
{ SaveProduct: createSaveProductAction})(Product)

