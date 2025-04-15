import { LOGIN_USER, LOGOUT_USER } from "../../type";

const initial ={
    loginUser:[],
    logoutUser:[],
}

export const AuthReducer=(state=initial,action)=>{
    switch(action.type){
        case LOGIN_USER:
            return{
                    ...state,
                    loginUser:action.payload,
                    loading:false
                }
        case LOGOUT_USER:
            return{
                ...state,
                logoutUser:action.payload,
                loading:false
            }
        
        
        default:
            return state;
    }
}
