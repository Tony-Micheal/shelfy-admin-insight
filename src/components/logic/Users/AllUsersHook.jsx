
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/actions/products/ProductsAction';
import { getAllUsersAction } from '../../../redux/actions/UsersAction';

const AllUsersHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve products from page 1
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllUsersAction(page, 15, search));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
  }, []);

  const res = useSelector(state => state.UsersReducer.allUsers);
  
  let allUsers = [];
  let totalPages = 0;

  try {
    if (res) {
        console.log(res);
      if (res.data) {
        allUsers = [...res.data];
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

  return [allUsers, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllUsersHook;
