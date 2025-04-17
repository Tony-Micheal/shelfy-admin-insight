import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoicesCountAction } from '../../../redux/actions/InvoicesAction';
import { getStoresChartAction } from '../../../redux/actions/DashboardAction';

const StoresChartHook = () => {
  const dispatch = useDispatch();
  const [loadingStores, setLoadingStores] = useState(false);

  // Function to retrieve invoices count
  const getData = async () => {
    setLoadingStores(true);
    await dispatch(getStoresChartAction());
    setLoadingStores(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();

  }, []);

  const res = useSelector(state => state.DashboardReducer.storesChart);
  
  let stores = [];

  try {
    if (res && res.data) {
        stores = res.data
    }
  } catch (e) {
    console.error("Error processing invoice count:", e);
  }

  return [stores, loadingStores];
};

export default StoresChartHook;
