import {SAVE_PROD_LIST} from "../action_type"
export const createSaveProductAction = (value)=>{
  //console.log("action的val===>",value)
  return {type:SAVE_PROD_LIST,data:value}
};
