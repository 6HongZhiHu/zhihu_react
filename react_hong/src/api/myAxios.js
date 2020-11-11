import axios from "axios";
import {message} from "antd"
import qs from "querystring";
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from "../redux/store"
import {createDeleteUserAction} from "../redux/action_creators/login_action"

let instance = axios.create({
  timeout : 4000
})

// http request 请求拦截器
instance.interceptors.request.use(
  config => {
   
    nprogress.start()
    const token = localStorage.getItem('token')
    if (token ) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.token = token  //请求头加上token
    };
    //console.log(config)
    const {method,data} = config
    if(method.toLowerCase() === "post"){
      //若传递过来的是对象
      if(data instanceof Object){
        config.data = qs.stringify(data)
      }
    }
    return config
  },
  err => {
    nprogress.done()
    return Promise.reject(err)
  })

  // http response 响应拦截器
instance.interceptors.response.use(
  response => {
    console.log("触发响应拦截器...")
    if(response.data.status===403){
      message.error("用户身份校验失败，请重新登录",3)
      //删除用户操作 操作redux里的删除用户Action
      store.dispatch(createDeleteUserAction());
      //localStorage.removeItem("token");
      //sessionStorage.removeItem("token");
    }else if(response.data.token){
      localStorage.setItem("token",response.data.token);
    }
    nprogress.done()
    return response.data
  },
  //接口错误状态处理，也就是说无响应时的处理 请求成功
  error => {
    nprogress.done()
    //删除用户操作 操作redux里的删除用户Action
    store.dispatch(createDeleteUserAction());
    message.error(error.data.msg,3)
    return new Promise(()=>{}) // 返回接口返回的错误信息 请求失败
  })

export default instance;