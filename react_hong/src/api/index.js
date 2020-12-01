import myAxios from "./myAxios";
import {BASE_URL}  from "../config/index"
import {message} from "antd"
import jsonp from "jsonp"
//登录请求
export const reqLogin = (username,password)=> myAxios.post(`${BASE_URL}/login`,{username,password})

//获取商品列表
export const reqCategory = ()=> myAxios.get(`${BASE_URL}/manage/category/list`)


//天气接口
// export const reqWeather = ()=> myAxios
// .get(`http://www.tianqiapi.com/api?version=v1&appid=23035354&appsecret=8YvlPNrz`,)
//此接口不可用天气功能作废
export const reqWeather = ()=> {
  jsonp(`http://www.tianqiapi.com/api?version=v1&appid=23035354&appsecret=8YvlPNrz`,
  (err,data)=>{
    console.log(err,data)
    if(err){
      message.error("获取天气信息失败")
      return;
    }else{
      return data
    }
  })
}

//添加商品列表
export const reqAddCategory = ({categoryName})=> myAxios.post(`${BASE_URL}/manage/category/add`,{categoryName})

//更新商品分类列表
export const reqUpdateCategory = ({categoryId,categoryName})=> myAxios.post(`${BASE_URL}/manage/category/update`,{categoryName,categoryId})

//更新商品列表
export const reqProductList = (pageNum,pageSize)=> myAxios.get(`${BASE_URL}/manage/product/list`,{params:{pageNum,pageSize}})

//更新商品状态
export const reqUpdateProducStatus = ({categoryId,status})=> myAxios.post(`${BASE_URL}/manage/product/updateStatus`,{categoryId,status})

//搜索商品
export const reqSearchProduct = (pageNum,pageSize,searchType,keyWord)=> myAxios.get(`${BASE_URL}/manage/product/search`,
{params:{pageNum,pageSize,[searchType]:keyWord}})

//根据商品ID获取商品信息
//接口作废没有这个接口 绝望！！！
export const reqProductId = (productId)=> myAxios.get(`${BASE_URL}/manage/category/info`,{params:{categoryId:productId}})

//根据图片名删除图片
export const reqDeletePic = ({name})=> myAxios.post(`${BASE_URL}/manage/img/delete`,{name})

//添加商品
export const reqAddporduct = (addObj)=> myAxios.post(`${BASE_URL}/manage/product/add`,{...addObj})

//修改商品
export const reqUpdateporduct = (addObj)=> myAxios.post(`${BASE_URL}/manage/product/update`,{...addObj})

//获取角色列表
export const reqGetRole = ()=> myAxios.get(`${BASE_URL}/manage/role/list`)

//添加角色
export const reqAddRole = (roleName)=> myAxios.post(`${BASE_URL}/manage/role/add`,roleName)

//更新角色
export const reqUpdateRole = (roleName)=> myAxios.post(`${BASE_URL}/manage/role/update`,{...roleName})

//获取用户列表
export const reqUserList = ()=> myAxios.get(`${BASE_URL}/manage/user/list`)

//添加用户
export const reqAdduUser = (user)=> myAxios.post(`${BASE_URL}/manage/user/add`,{...user})
