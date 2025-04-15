import { combineReducers } from 'redux';
import { ProductsReducer } from './Products/ProductsReducer';
import { UsersReducer } from './UsersReducer';
import { AuthReducer } from './Auth/AuthReducer';
import { AdminsReducer } from './AdminsReducer';

export default combineReducers({
  AuthReducer: AuthReducer,
  ProductsReducer: ProductsReducer,
  UsersReducer: UsersReducer,
  AdminsReducer: AdminsReducer,
});