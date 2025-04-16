import { useGetDataWithToken } from "../../hooks/useGetData";
import { GET_ALL_INVOICES, GET_FILTER_INVOICES, GET_INVOICES_COUNT } from "../type";

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

const getAllInvoicesAction = (page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/invoices?page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_ALL_INVOICES,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_ALL_INVOICES,
            payload: e.response
        })
    }
}

const getInvoicesByFilterAction = (statusId, page, limit, searchTerm = '') => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/invoices?status_id=${statusId}&page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
        dispatch({
            type: GET_FILTER_INVOICES,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_FILTER_INVOICES,
            payload: e.response
        })
    }
}

export {getInvoicesCountAction,getAllInvoicesAction,getInvoicesByFilterAction}
