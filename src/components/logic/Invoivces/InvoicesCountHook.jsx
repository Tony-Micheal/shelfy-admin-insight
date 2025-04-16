
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../../../redux/actions/UsersAction';
import { getInvoicesCountAction } from '../../../redux/actions/InvoicesAction';

const InvoicesCountHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Function to retrieve users with pagination
  const getData = async (page = 1, search = '') => {
    setLoading(true);
    await dispatch(getInvoicesCountAction());
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();
  }, []);

  

  const res = useSelector(state => state.InvoicesReducer.invoicesCount);
  
  let invoiceCount = [];

  try {
    if (res) {
      console.log(res);
      if (res.data) {
        invoiceCount = [...res.data];
      }

    }
  } catch (e) {
    console.error(e);
  }


 
  return [invoiceCount,  loading];
};

export default InvoicesCountHook;
