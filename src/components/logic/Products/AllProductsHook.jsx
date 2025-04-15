
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';

const AllProductsHook = () => {
    const dispatch=useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    //authReducer
    const getData=async()=>{
        await dispatch(getAllProductsAction(1,15))
    
    }
    useEffect(()=>{
        getData();
    },[])
    const res=useSelector(state=> state.ProductsReducer.allProducts);
    
    let allProducts=[];
    let totalPages=0;;
    
    try {
        if(res){
            if(res.data){
                allProducts=[...res.data];
            }
            if(res.pagination){
                totalPages=res.pagination.last_page;
            }
        }
    } catch (e) {
        console.log(e);
    }
    
      // Handle page change
  const handlePageChange = (page) => {
    getAllProductsAction(page,15);
    setCurrentPage(page)
  };
    return [allProducts,totalPages,currentPage,handlePageChange]
}
    
    
    

export default AllProductsHook
