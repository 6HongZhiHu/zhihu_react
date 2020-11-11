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
