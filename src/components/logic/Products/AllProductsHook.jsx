
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';

const AllProductsHook = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    // Initial data load
    const getData = async () => {
        await dispatch(getAllProductsAction(1, 15))
    }
    
    useEffect(() => {
        getData();
    }, [])
    
    const res = useSelector(state => state.ProductsReducer.allProducts);
    
    let allProducts = [];
    let totalPages = 0;
    
    try {
        if(res) {
            if(res.data) {
                allProducts = [...res.data];
            }
            if(res.pagination) {
                totalPages = res.pagination.last_page;
            }
        }
    } catch (e) {
        console.log(e);
    }
    
    // Handle page change
    const handlePageChange = async (page) => {
        setCurrentPage(page);
        // This is the key fix - we need to dispatch the action with the new page number
        await dispatch(getAllProductsAction(page, 15));
        console.log("Changed to page:", page);
    };
    
    return [allProducts, totalPages, currentPage, handlePageChange]
}

export default AllProductsHook
