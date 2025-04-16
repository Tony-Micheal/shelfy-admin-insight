import { useGetDataWithToken } from "../../hooks/useGetData";
import { GET_ALL_INVOICES, GET_INVOICES_COUNT } from "../type";




const getInvoicesCountAction =  ()=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/invoices/count`);
        dispatch({
            type:GET_INVOICES_COUNT,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_INVOICES_COUNT,
            payload:e.response
        })
    }


}

const  getAllInvoicesAction=  ()=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/invoices`);
        dispatch({
            type:GET_ALL_INVOICES,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_ALL_INVOICES,
            payload:e.response
        })
    }


}




export {getInvoicesCountAction,getAllInvoicesAction}