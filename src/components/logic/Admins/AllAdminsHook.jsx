
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminsAction } from './../../../redux/actions/AdminsAction';

const AllAdminsHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve users with pagination
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllAdminsAction(page, 5, search));
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

  const res = useSelector(state => state.AdminsReducer.allAdmins);
  
  let allAdmins = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allAdmins = [...res.data];
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
    allAdmins, 
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

export default AllAdminsHook;
