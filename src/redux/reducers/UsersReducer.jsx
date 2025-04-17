
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER_DETAILS, UPDATE_USER, UPDATE_USER_SEGMENT, UPDATE_USER_STATUS } from './../type';

const initial ={
    allUsers:[],
    userDetails:[],
    userUpdate:[],
    userStatus:[],
    userSegment:[],
    createUser:[],
    deleteUser:[]
}

const UsersReducer = (state=initial,action) => {
    switch(action.type){
        case GET_ALL_USERS:
            return{
                    ...state,
                    allUsers:action.payload,
                    loading:false
                }
        case GET_USER_DETAILS:
            return{
                ...state,
                userDetails:action.payload,
                loading:false
            }
        case UPDATE_USER:
            return{
                ...state,
                userUpdate:action.payload,
                loading:false
            }
        case UPDATE_USER_STATUS:
            return{
                ...state,
                userStatus:action.payload,
                loading:false
            }
        case UPDATE_USER_SEGMENT:
            return{
                ...state,
                userSegment:action.payload,
                loading:false
            }
        case CREATE_USER:
            return{
                ...state,
                createUser:action.payload,
                loading:false
            }

        case DELETE_USER:
            return{
                ...state,
                deleteUser:action.payload,
                loading:false
            }
        
        
        default:
            return state;
    }
}

export default UsersReducer;
