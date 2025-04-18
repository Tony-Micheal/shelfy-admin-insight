
import { useGetDataWithToken } from "../../hooks/useGetData";
import { usePatchData } from "../../hooks/usePatchData";
import { GET_ALL_INVOICES, GET_FILTER_INVOICES, GET_INVOICES_COUNT, UPDATE_INVOICE } from "../type";

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
        const response = await useGetDataWithToken(`/invoices?status=${statusId}&page=${page}&paginate=${limit}${searchTerm ? `&search=${searchTerm}` : ''}`);
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

const updateInvoiceAction = (data) => async (dispatch) => {
    try {
        const response = await usePatchData(`/invoices/status/update`);
        dispatch({
            type: UPDATE_INVOICE,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: UPDATE_INVOICE,
            payload: e.response
        })
    }
}



export {getInvoicesCountAction, getAllInvoicesAction, getInvoicesByFilterAction,updateInvoiceAction}
