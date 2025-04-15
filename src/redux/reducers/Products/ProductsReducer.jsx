
import { GET_ALL_PRODUCTS } from './../../type';
const initial ={
    allProducts:[],
}

export const ProductsReducer=(state=initial,action)=>{
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return{
                    ...state,
                    allProducts:action.payload,
                    loading:false
                }
        case GET_ALL_PRODUCTS:
            return{
                ...state,
                allProducts:action.payload,
                loading:false
            }
        
        
        default:
            return state;
    }
}
