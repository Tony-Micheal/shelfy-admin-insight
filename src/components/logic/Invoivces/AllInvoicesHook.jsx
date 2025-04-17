
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoicesAction, getInvoicesByFilterAction } from '../../../redux/actions/InvoicesAction';
import { useLocation } from 'react-router-dom';

const AllInvoicesHook = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading2, setloading2] = useState(false);
  const [invoiceStatus, setInvoiceStatus] = useState(null);

  useEffect(() => {
    // Check URL for status parameter first
    const queryParams = new URLSearchParams(location.search);
    const statusParam = queryParams.get('status');
    
    if (statusParam !== null) {
      // Parse the status parameter, including handling '0'
      const parsedStatus = parseInt(statusParam, 10);
      setInvoiceStatus(parsedStatus);
      getData(1, searchTerm, parsedStatus);
    } else {
      setInvoiceStatus(null);
      getData(1, searchTerm, null);
    }
  }, [location.search]);

  const handleFilter = (id) => {
    setInvoiceStatus(id);
    setCurrentPage(1);
    getData(1, searchTerm, id);
  };

  const getData = async (page = 1, search = '', status = invoiceStatus) => {
    setloading2(true);
    try {
      // Check if status is not null (0 is a valid status)
      if (status != null) {
        await dispatch(getInvoicesByFilterAction(status, page, 10, search));
      } else {
        await dispatch(getAllInvoicesAction(page, 10, search));
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
    setloading2(false);
  };

  useEffect(() => {
    // Initial data load is now handled by the URL params effect
    console.log('Current invoice status from localStorage:', localStorage.getItem('invoiceStatus'));
  }, []);

  const res = useSelector(state => state.InvoicesReducer.allInvoices);
  
  let allInvoices = [];
  let totalPages = 0;

  try {
    if (res?.data) {
      allInvoices = res.data;
      if (res.pagination) {
        totalPages = res.pagination.last_page || 0;
      }
    }
  } catch (e) {
    console.error('Error processing invoices data:', e);
  }

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await getData(page, searchTerm);
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    await getData(1, term);
  };

  return [allInvoices, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading2, invoiceStatus, handleFilter];
};

export default AllInvoicesHook;
