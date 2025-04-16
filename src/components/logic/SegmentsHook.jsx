
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSegmentsAction } from '../../redux/actions/SegmentsAction';

const SegmentsHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to retrieve users with pagination
  const getData = async (page = 1) => {
    setLoading(true);
    await dispatch(getAllSegmentsAction(page, 5));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
  }, []);

  // Re-fetch data when page or search term changes
  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const res = useSelector(state => state.SegmentsReducer.allSegments);
  
  let allSegments = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allSegments = [...res.data.data];
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



  return [
    allSegments, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    loading
  ];
};

export default SegmentsHook;
