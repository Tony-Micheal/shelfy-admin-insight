
import { combineReducers } from 'redux';
import AuthReducer from './Auth/AuthReducer';
import ProductsReducer from './Products/ProductsReducer';
import UsersReducer from './UsersReducer';
import AdminsReducer from './AdminsReducer';

export default combineReducers({
    AuthReducer,
    ProductsReducer,
    UsersReducer,
    AdminsReducer,
});
