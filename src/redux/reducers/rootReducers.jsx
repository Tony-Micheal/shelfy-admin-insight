import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/AuthReducer";
import { ProductsReducer } from "./Products/ProductsReducer";



export default combineReducers({
  ProductsReducer:ProductsReducer,
  AuthReducer:AuthReducer,

})