import {SAVE_TITLE} from "../action_type"
export const createSaveTitleAction = (value)=>{
  //console.log("action的val===>",value)
  return {type:SAVE_TITLE,data:value}
};
