
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/actions/UsersAction';

const AllUsersHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve users with pagination
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllUsersAction(page, 3, search));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
  }, []);

  // Re-fetch data when page or search term changes
  useEffect(() => {
    getData(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const res = useSelector(state => state.UsersReducer.allUsers);
  
  let allUsers = [];
  let totalPages = 0;

  try {
    if (res) {
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  return [
    allUsers, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    searchTerm, 
    handleSearch, 
    loading
  ];
};

export default AllUsersHook;
