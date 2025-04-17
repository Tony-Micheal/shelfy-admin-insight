
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoriesAction } from '@/redux/actions/CategoriesAction';

const AllCategoriesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Function to retrieve categories with pagination and search
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    try {
      await dispatch(getAllCategoriesAction(page, 15, search));
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to first page when search term changes
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, currentPage]);

  // Get data when page or debounced search term changes
  useEffect(() => {
    getData(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm]);

  const res = useSelector(state => state.CategoriesReducer.allCates);
  
  let allCategories = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allCategories = res.data;
      }
      if (res.pagination) {
        totalPages = res.pagination.last_page;
      }
    }
  } catch (e) {
    console.error('Error processing categories data:', e);
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return [allCategories, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllCategoriesHook;
