import { DELETE_BARCODE, GET_ALL_BARCODES, GET_BARCODE_DETAILS, UPDATE_BARCODE } from "../type"

const initial ={
    allBarcodes:[],
    bardoceDetails:[],
    updateBarcode:[],
    deleteBarcode:[]
}

const BarcodesReducer = (state=initial,action) => {
    switch(action.type){
        case GET_ALL_BARCODES:
            return{
                    ...state,
                    allBarcodes:action.payload,
                    loading:false
                }
        case GET_BARCODE_DETAILS:
            return{
                ...state,
                bardoceDetails:action.payload,
                loading:false
            }
        case UPDATE_BARCODE:
            return{
                ...state,
                updateProduct:action.payload,
                loading:false
            }
        case DELETE_BARCODE:
            return{
                ...state,
                deleteBarcode:action.payload,
                loading:false
            }
        
        default:
            return state;
    }
}

export default BarcodesReducer;
