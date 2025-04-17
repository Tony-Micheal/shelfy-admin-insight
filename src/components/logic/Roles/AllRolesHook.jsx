
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRolesAction } from '@/redux/actions/RolesAction';

const AllRolesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to retrieve products from page 1
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getAllRolesAction(page, 15, search));
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
  }, []);

  const res = useSelector(state => state.RolesReducer.allRoles);
  
  let allRoles = [];
  let totalPages = 0;

  try {
    if (res) {
      if (res.data) {
        allRoles = res.data;
        console.log(allRoles);
        console.log(res);
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

  return [allRoles, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading];
};

export default AllRolesHook;
