
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRolesAction } from '@/redux/actions/RolesAction';

const AllRolesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Function to retrieve roles with pagination and search
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllRolesAction(page, 1, search));
    setLoading(false);
  };

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Get data when page or debounced search term changes
  useEffect(() => {
    getData(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);

  // Initial data fetch handled by above effect

  const res = useSelector(state => state.RolesReducer.allRoles);
  
  let allRoles = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allRoles = res.data;
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

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  return [allRoles, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllRolesHook;
