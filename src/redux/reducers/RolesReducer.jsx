
import { GET_ALL_ROLES, SHOW_ROLE, CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from '../type';

const initialState = {
  allRoles: [],
  roleDetails: null,
  createRole: null,
  updateRole: null,
  deleteRole: null,
  loading: true,
};

const RolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ROLES:
      return {
        ...state,
        allRoles: action.payload,
        loading: false,
      };
    case SHOW_ROLE:
      return {
        ...state,
        roleDetails: action.payload,
        loading: false,
      };
    case CREATE_ROLE:
      return {
        ...state,
        createRole: action.payload,
        loading: false,
      };
    case UPDATE_ROLE:
      return {
        ...state,
        updateRole: action.payload,
        loading: false,
      };
    case DELETE_ROLE:
      return {
        ...state,
        deleteRole: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default RolesReducer;
