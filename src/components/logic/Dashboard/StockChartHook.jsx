
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStocksChartAction } from '../../../redux/actions/DashboardAction';

const StockChartHook = () => {
  const dispatch = useDispatch();
  const [loadingStocks, setLoadingStocks] = useState(false);

  // Function to retrieve store data
  const getData = async () => {
    setLoadingStocks(true);
    await dispatch(getStocksChartAction());
    setLoadingStocks(false);
  };

  // Initial data fetch
  useEffect(() => {
    getData();
  }, []);

  const res = useSelector(state => state.DashboardReducer.stocksCahrt);
  
  let stockData = {
    in_stock: 0,
    out_of_stock: 0
  };

  try {
    if (res && res.data) {
      stockData = {
        in_stock: res.data.in_stock || 0,
        out_of_stock: res.data.out_of_stock || 0
      };
      console.log('Formatted stock data:', stockData);
    }
  } catch (e) {
    console.error("Error processing stock data:", e);
  }

  return [stockData, loadingStocks];
};

export default StockChartHook;
