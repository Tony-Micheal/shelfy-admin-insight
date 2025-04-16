
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoicesAction, getInvoicesByFilterAction } from '../../../redux/actions/InvoicesAction';

const AllInvoicesHook = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading2, setloading2] = useState(false);
  const [invoiceStatus,setInvoiceStatus]=useState();

  const handleFilter=(id)=>{
    setInvoiceStatus(id)
  }
  const getData = async (page = 1, search = '') => {
    setloading2(true);
    if(invoiceStatus){
        await dispatch(getInvoicesByFilterAction(invoiceStatus,page, 10, search)); // Changed to 10 items per page

    }else{
        await dispatch(getAllInvoicesAction(page, 10, search)); // Changed to 10 items per page

    }
    setloading2(false);
  };

  useEffect(() => {
    getData(1);
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

  return [allInvoices, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading2,invoiceStatus,handleFilter];
};

export default AllInvoicesHook;
