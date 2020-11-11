import {SAVE_USER_INFO,DELECE_USER_INFO} from "../action_type"

let user = JSON.parse(localStorage.getItem("user"));
let token = localStorage.getItem("token");
let isLogin = user && token ? true : false;

let initState = {
  user: user || "",
  token: token || "",
  isLogin
};
export default function test(preState = initState,action){
  const {type,data} = action;
  //console.log(action)
  let newState = ""
  switch (type){
    case SAVE_USER_INFO:
      newState = {user:data.data,token:data.token,isLogin:true}
      return newState
    case DELECE_USER_INFO:
      newState = {user:"",token:"",isLogin:false}
      return newState
      default:
        return preState
  }
}