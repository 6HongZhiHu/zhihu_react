import {SAVE_CATEGORY} from "../action_type"
export const createSaveCategoryAction = (value)=>{
  //console.log("action的val===>",value)
  return {type:SAVE_CATEGORY,data:value}
};
