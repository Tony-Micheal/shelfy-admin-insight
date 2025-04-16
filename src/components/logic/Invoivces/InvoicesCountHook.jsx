import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesCountAction } from '../../../redux/actions/InvoicesAction';

const InvoicesCountHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Function to retrieve invoices count
  const getData = async () => {
    setLoading(true);
    await dispatch(getInvoicesCountAction());
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();
    console.log("res");

  }, []);

  const res = useSelector(state => state.InvoicesReducer.invoicesCount);
  
  let invoiceCount = [];

  try {
    if (res && res.data) {
      invoiceCount = res.data
    }
  } catch (e) {
    console.error("Error processing invoice count:", e);
  }

  return [invoiceCount, loading];
};

export default InvoicesCountHook;
