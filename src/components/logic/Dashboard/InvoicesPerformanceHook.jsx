
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesAVGAction } from '../../../redux/actions/DashboardAction';

const InvoicesPerformanceHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Function to retrieve invoice performance data
  const getData = async () => {
    setLoading(true);
    await dispatch(getInvoicesAVGAction());
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();
  }, []);

  const res = useSelector(state => state.DashboardReducer.invoicesAvg);
  
  let performance = [];

  try {
    if (res && res.data) {
      performance = res.data.map(item => ({
        name: item.month,
        customers: item.customers_count,
        invoices: item.total_invoices,
        avgPerCustomer: item.average_invoices_per_customer,
        percentage: parseFloat(item.average_invoices_percentage)
      }));
    }
  } catch (e) {
    console.error("Error processing invoice performance data:", e);
  }

  return [performance, loading];
};

export default InvoicesPerformanceHook;
