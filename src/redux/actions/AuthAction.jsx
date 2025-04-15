import { usePostData } from "../../hooks/usePostData";
import { LOGIN_USER, LOGOUT_USER } from './../type';



const loginUserAction =  (data)=> async (dispatch)=>{
    try{
        const response=await usePostData(`/auth/login`,data);
        dispatch({
            type:LOGIN_USER,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:LOGIN_USER,
            payload:e.response
        })
    }


}

const logoutAction =  ()=> async (dispatch)=>{
    try{
        const response=await usePostData(`/auth/logout`);
        dispatch({
            type:LOGOUT_USER,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:LOGOUT_USER,
            payload:e.response
        })
    }


}



// const getUserDataAction =  ()=> async (dispatch)=>{
//     try{
//         const response=await useGetDataWithToken(`/auth/user`);
//         dispatch({
//             type:GET_USER_DATA,
//             payload:response,
//             loading:true

//         })
//     }
//     catch(e){
//         dispatch({
//             type:GET_USER_DATA,
//             payload:e.response
//         })
//     }


// }
export {loginUserAction,logoutAction}