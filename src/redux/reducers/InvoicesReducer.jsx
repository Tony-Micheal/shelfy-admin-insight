
import { GET_ALL_INVOICES, GET_FILTER_INVOICES, GET_INVOICES_COUNT, UPDATE_INVOICE } from '../type';

const initial = {
    invoicesCount:[],
    allInvoices:[],
    updateInvoice:[]
}

const InvoicesReducer = (state=initial, action) => {
    switch(action.type){
        case GET_INVOICES_COUNT:
            return {
                ...state,
                invoicesCount:action.payload,
                loading:false
            }
        case GET_ALL_INVOICES:
            return {
                ...state,
                allInvoices:action.payload,
                loading:false
            }
        case GET_FILTER_INVOICES:
            return {
                ...state,
                invoicesCount:action.payload,
                loading:false
            }
        case UPDATE_INVOICE:
            return {
                ...state,
                updateInvoice:action.payload,
                loading:false
            }
            
        default:
            return state;
    }
}

export default InvoicesReducer;
