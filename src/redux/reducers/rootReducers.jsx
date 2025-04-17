
import { combineReducers } from "redux";
import AuthReducer from './Auth/AuthReducer';
import ProductsReducer from './Products/ProductsReducer';
import UsersReducer from './UsersReducer';
import AdminsReducer from './AdminsReducer';
import InvoicesReducer from './InvoicesReducer';
import SegmentsReducer from './SegmentsReducer';
import DashboardReducer from './DashboardReducer';
import RolesReducer from './RolesReducer';

const rootReducer = combineReducers({
    AuthReducer,
    ProductsReducer,
    UsersReducer,
    AdminsReducer,
    InvoicesReducer,
    SegmentsReducer,
    DashboardReducer,
    RolesReducer
});

export default rootReducer;
