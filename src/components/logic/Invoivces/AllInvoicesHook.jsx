
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoicesAction } from '../../../redux/actions/InvoicesAction';

const AllInvoicesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading2, setloading2] = useState(false);

  // Function to retrieve invoices
  const getData = async (page = 1, search = '') => {
    setloading2(true);
    await dispatch(getAllInvoicesAction(page, 15, search));
    setloading2(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData(1);
  }, []);

  const res = useSelector(state => state.InvoicesReducer.allInvoices);
  
  let allInvoices = [];
  let totalPages = 0;

  try {
    if (res && res.data) {
      allInvoices = res.data || [];
      if (res.pagination) {
        totalPages = res.pagination.last_page || 0;
      }
    }
  } catch (e) {
    console.error('Error processing invoices data:', e);
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

  return [allInvoices, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading2];
};

export default AllInvoicesHook;
