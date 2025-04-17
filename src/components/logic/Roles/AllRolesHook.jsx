
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRolesAction } from '@/redux/actions/RolesAction';

const AllRolesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Function to retrieve roles with pagination and name search
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    try {
      await dispatch(getAllRolesAction(page, 15, search));
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Improved debounce for name search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Always reset to first page when search term changes
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }, 300); // Reduced debounce time for more responsive search

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, currentPage]);

  // Get data when page or debounced search term changes
  useEffect(() => {
    getData(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);

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
    console.error('Error processing roles data:', e);
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search specifically for role names
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Let the debounce effect handle resetting the page
  };

  return [allRoles, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllRolesHook;
