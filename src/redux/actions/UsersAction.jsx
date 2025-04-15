import { useGetData, useGetDataWithToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/usePatchData";
import { usePostData } from "../../hooks/usePostData";
import { CREATE_USER, GET_ALL_USERS, GET_USER_DETAILS, UPDATE_USER, UPDATE_USER_SEGMENT, UPDATE_USER_STATUS } from './../type';
import useDeleteData from './../../hooks/useDeleteData';



const getAllUsersAction =  (page,limit,searchTerm = '')=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/customers?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type:GET_ALL_USERS,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_ALL_USERS,
            payload:e.response
        })
    }


}

const getUserDetailsAction =  (id)=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/customers/show?id=${id}`);
        dispatch({
            type:GET_USER_DETAILS,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_USER_DETAILS,
            payload:e.response
        })
    }


}

const updateUserAction =  (data)=> async (dispatch)=>{
    try{
        const response=await usePatchData(`/customers/update`,data);
        dispatch({
            type:UPDATE_USER,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:UPDATE_USER,
            payload:e.response
        })
    }


}

const upateUserStatusAction =  (data)=> async (dispatch)=>{
    try{
        const response=await usePatchData(`/customers/update/store/status`,data);
        dispatch({
            type:UPDATE_USER_STATUS,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:UPDATE_USER_STATUS,
            payload:e.response
        })
    }


}

const upateUserSegmentAction =  (data)=> async (dispatch)=>{
    try{
        const response=await usePatchData(`/customers/update/segment`,data);
        dispatch({
            type:UPDATE_USER_SEGMENT,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:UPDATE_USER_SEGMENT,
            payload:e.response
        })
    }


}

const createUserAction =  (data)=> async (dispatch)=>{
    try{
        const response=await usePostData(`/customers/create`,data);
        dispatch({
            type:CREATE_USER,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:CREATE_USER,
            payload:e.response
        })
    }


}

const deleteUserAction =  (data)=> async (dispatch)=>{
    try{
        const response=await useDeleteData(`/customers/delete`,data);
        dispatch({
            type:DELETE_USER,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:DELETE_USER,
            payload:e.response
        })
    }


}


export {getAllUsersAction,getUserDetailsAction,updateUserAction,upateUserStatusAction,upateUserSegmentAction,createUserAction,deleteUserAction}