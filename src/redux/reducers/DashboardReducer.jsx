import { GET_INVOICES_AVG, GET_STORES_CHARTS } from "../type"
import { GET_STOCK_CHARTS, GET_INVOICES_MAP } from './../type';

const initial ={
    storesChart:[],
    stocksCahrt:[],
    invoicesAvg:[],
    invoicesMap:[]
}

export const DashboardReducer=(state=initial,action)=>{
    switch(action.type){
        case GET_STORES_CHARTS:
            return{
                    ...state,
                    storesChart:action.payload,
                    loading:false
                }
        case GET_STOCK_CHARTS:
            return{
                ...state,
                stocksCahrt:action.payload,
                loading:false
            }
        case GET_INVOICES_AVG:
            return{
                ...state,
                invoicesAvg:action.payload,
                loading:false
            }

        case GET_INVOICES_MAP:
            return{
                ...state,
                invoicesMap:action.payload,
                loading:false
            }
            
        default:
            return state;
    }
}
