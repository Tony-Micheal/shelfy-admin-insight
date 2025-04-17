
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
  
  let stocks = [];

  try {
    if (res && res.data) {
        console.log(res);
        stocks=res.data
        console.log(stocks);
    }
  } catch (e) {
    console.error("Error processing store data:", e);
  }

  return [stocks, loadingStocks];
};

export default StockChartHook;
