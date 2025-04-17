
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesAVGAction, getStocksChartAction } from '../../../redux/actions/DashboardAction';

const InvoicesPerformanceHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Function to retrieve store data
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
  
  let performance =[];

  try {
    if (res && res.data) {
      performance=res.data;
    }
  } catch (e) {
    console.error("Error processing stock data:", e);
  }

  return [performance, loading];
};

export default InvoicesPerformanceHook;
