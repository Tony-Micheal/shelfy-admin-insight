import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';

const AllProductsHook = () => {
    const dispatch=useDispatch();

    //authReducer
    const getData=async()=>{
        await dispatch(getAllProductsAction())
    
    }
    useEffect(()=>{
        getData();
    },[])
    const res=useSelector(state=> state.ProductsReducer.allProducts);
    
    let allProducts=[];
    try {
        if(res){
            console.log("prod",res);
            if(res.data){
                allProducts=[...res.data];
            }
        }
    } catch (e) {
        console.log(e);
    }
    
    
    return [allProducts]
}
    
    
    

export default AllProductsHook
