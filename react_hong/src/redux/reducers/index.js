import {combineReducers} from "redux"
import loginRecuder from "./login_recuder"
import title_recuder from "./title_recuder"
import productRecuder from "./product_recuder"

export default combineReducers({
  userInfo:loginRecuder,
  title:title_recuder,
  productInfo:productRecuder
})