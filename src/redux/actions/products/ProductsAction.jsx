import React from 'react'
import { GET_ALL_PRODUCTS } from './../../type';
import { useGetData, useGetDataWithToken } from "../../../hooks/useGetData";

const getAllProductsAction =  (data)=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/products`,data);
        dispatch({
            type:GET_ALL_PRODUCTS,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_ALL_PRODUCTS,
            payload:e.response
        })
    }


}

export {getAllProductsAction}