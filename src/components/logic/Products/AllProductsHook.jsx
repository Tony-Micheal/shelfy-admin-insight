
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';

const AllProductsHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve products from page 1
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllProductsAction(page, 15, search));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
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
    await getData(page, searchTerm);
  };

  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
    await getData(1, term);
  };

  return [allProducts, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllProductsHook;
