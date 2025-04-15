
import { GET_ALL_ADMINS } from '../type';

const initial = {
    allAdmins: [],
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
        default:
            return state;
    }
}

export default AdminsReducer;
