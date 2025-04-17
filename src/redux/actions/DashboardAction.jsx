
import { useGetDataWithToken } from "../../hooks/useGetData";
import { GET_INVOICES_AVG, GET_INVOICES_MAP, GET_STORES_CHARTS } from "../type";
import { GET_STOCK_CHARTS } from './../type';

const getStoresChartAction =  ()=> async (dispatch)=>{
    try{
        const response=await useGetDataWithToken(`/reports/precentage/stores/type`);
        dispatch({
            type:GET_STORES_CHARTS,
            payload:response,
            loading:true

        })
    }
    catch(e){
        dispatch({
            type:GET_STORES_CHARTS,
            payload:e.response
        })
    }


}

const getStocksChartAction = () => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/reports/stock/product`);
        dispatch({
            type: GET_STOCK_CHARTS,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_STOCK_CHARTS,
            payload: e.response
        })
    }
}

const getInvoicesAVGAction = () => async (dispatch) => {
    try {
        const response = await useGetDataWithToken(`/reports/invoices/aveg`);
        dispatch({
            type: GET_INVOICES_AVG,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_INVOICES_AVG,
            payload: e.response
        })
    }
}

const getInvoicesMapAction = (lat, lng) => async (dispatch) => {
    try {
        // Update API endpoint to include both lat and lng parameters
        const response = await useGetDataWithToken(`/reports/invoices/region?lat=${lat}&lng=${lng}`);
        
        // If the API doesn't return total_invoices, we can simulate it for demonstration
        // In a real scenario, the backend would provide this data
        if (response && response.data && Array.isArray(response.data)) {
            // Calculate total invoices across all regions if not provided by API
            if (response.total_invoices === undefined) {
                const totalInvoices = response.data.reduce((sum, region) => sum + (region.invoices || 0), 0);
                response.total_invoices = totalInvoices;
            }
        }
        
        dispatch({
            type: GET_INVOICES_MAP,
            payload: response,
            loading: true
        })
    }
    catch(e) {
        dispatch({
            type: GET_INVOICES_MAP,
            payload: e.response
        })
    }
}

export {getStoresChartAction, getStocksChartAction, getInvoicesAVGAction, getInvoicesMapAction}
