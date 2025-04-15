import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';

const AllProductsHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // Function to retrieve products from page 1
  const getData = async () => {
    await dispatch(getAllProductsAction(1, 15));
  };

  // Initial data fetch
  useEffect(() => {
    getData();
  }, []);

  const res = useSelector(state => state.ProductsReducer.allProducts);
  
  let allProducts = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allProducts = [...res.data];
        console.log(allProducts);
      }
      if (res.pagination) {
        totalPages = res.pagination.last_page;
      }
    }
  } catch (e) {
    console.error(e);
  }

  // Handle page change by dispatching the action with the new page number
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await dispatch(getAllProductsAction(page, 15));
  };

  return [allProducts, totalPages, currentPage, handlePageChange];
};

export default AllProductsHook;

