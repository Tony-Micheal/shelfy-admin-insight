
import { DELETE_INSTRUCTION, GET_ALL_PRODUCTS, GET_PRODUCTS_DETAILS, UPDATE_PRODUCT } from './../../type';
const initial ={
    allProducts:[],
    productDetails:[],
    updateProduct:[],
    deleteInstruction:[]
}

const ProductsReducer = (state=initial,action) => {
    switch(action.type){
        case GET_ALL_PRODUCTS:
            return{
                    ...state,
                    allProducts:action.payload,
                    loading:false
                }
        case GET_PRODUCTS_DETAILS:
            return{
                ...state,
                productDetails:action.payload,
                loading:false
            }
        case UPDATE_PRODUCT:
            return{
                ...state,
                updateProduct:action.payload,
                loading:false
            }
        case DELETE_INSTRUCTION:
            return{
                ...state,
                deleteInstruction:action.payload,
                loading:false
            }
        
        default:
            return state;
    }
}

export default ProductsReducer;
