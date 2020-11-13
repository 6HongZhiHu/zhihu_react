import {SAVE_USER_INFO,DELECE_USER_INFO} from "../action_type"
export const createSaveUserAction = (value)=>{
  //console.log("action的val===>",value)
  localStorage.setItem("user",JSON.stringify(value.data));
  localStorage.setItem("token",value.token);
  return {type:SAVE_USER_INFO,data:value}
};

export const createDeleteUserAction = (value)=>{
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return {type:DELECE_USER_INFO}
}
