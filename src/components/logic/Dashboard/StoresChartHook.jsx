
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoresChartAction } from '../../../redux/actions/DashboardAction';

const StoresChartHook = () => {
  const dispatch = useDispatch();
  const [loadingStores, setLoadingStores] = useState(false);

  // Function to retrieve store data
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
      // Format the stores data
      stores = res.data.map(store => {
        // Format the store type for display
        const displayType = store.type
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        return {
          type: displayType,
          value: store.total,
          percentage: store.percentage,
          invoices: store.total * 3 // Placeholder for invoices count if not provided in API
        };
      });
    }
  } catch (e) {
    console.error("Error processing store data:", e);
  }

  return [stores, loadingStores];
};

export default StoresChartHook;
