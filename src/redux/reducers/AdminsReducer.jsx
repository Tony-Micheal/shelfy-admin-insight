
import { CREATE_ADMIN, GET_ADMIN_DETAILS, GET_ALL_ADMINS, UPDATE_ADMIN } from '../type';

const initial = {
    allAdmins: [],
    adminDetails:[],
    updateAdmin:[],
    createAdmin:[],
    deleteAdmin:[],
    loading: true,
};

const AdminsReducer = (state = initial, action) => {
    switch (action.type) {
        case GET_ALL_ADMINS:
            return {
                ...state,
                allAdmins: action.payload,
                loading: false
            }
        case GET_ADMIN_DETAILS:
            return {
                ...state,
                adminDetails: action.payload,
                loading: false
            }
        case UPDATE_ADMIN:
            return {
                ...state,
                updateAdmin: action.payload,
                loading: false
            }
        case CREATE_ADMIN:
            return {
                ...state,
                createAdmin: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default AdminsReducer;
