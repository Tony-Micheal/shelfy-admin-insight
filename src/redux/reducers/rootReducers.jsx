import { combineReducers } from 'redux';
import { ProductsReducer } from './Products/ProductsReducer';
import { UsersReducer } from './UsersReducer';
import { AuthReducer } from './Auth/AuthReducer';
import { AdminsReducer } from './AdminsReducer';
import { InvoicesReducer } from './InvoicesReducer';
import { SegmentsReducer } from './SegmentsReducer';
import { DashboardReducer } from './DashboardReducer';

export default combineReducers({
  AuthReducer: AuthReducer,
  ProductsReducer: ProductsReducer,
  UsersReducer: UsersReducer,
  AdminsReducer: AdminsReducer,
  InvoicesReducer:InvoicesReducer,
  SegmentsReducer:SegmentsReducer,
  DashboardReducer:DashboardReducer
});