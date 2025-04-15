import { combineReducers } from "redux";
import { AuthReducer } from "./Auth/AuthReducer";
import { ProductsReducer } from "./Products/ProductsReducer";
import { UsersReducer } from "./UsersReducer";



export default combineReducers({
  AuthReducer:AuthReducer,
  ProductsReducer:ProductsReducer,
  UsersReducer:UsersReducer


})