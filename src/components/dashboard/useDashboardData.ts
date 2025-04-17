
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InvoicesCountHook from '@/components/logic/Invoivces/InvoicesCountHook';
import StoresChartHook from '@/components/logic/Dashboard/StoresChartHook';
import StockChartHook from '@/components/logic/Dashboard/StockChartHook';
import { getInvoicesMapAction } from '@/redux/actions/DashboardAction';

export function useDashboardData() {
  const [invoiceCount, loading] = InvoicesCountHook();
  const [stores, loadingStores] = StoresChartHook();
  const [stockData, loadingStocks] = StockChartHook();
  const dispatch = useDispatch();
  
  // Initial fetch of map data with default coordinates
  useEffect(() => {
    dispatch(getInvoicesMapAction(0, 0));
  }, [dispatch]);

  const getCount = (data: any, field: string) => {
    if (!data || !data[field]) return 0;
    return data[field].count || 0;
  };
  
  const getTotalInvoices = () => {
    if (!invoiceCount) return 0;
    
    const fields = [
      'acceepted_invices', 
      'rejected_invices', 
      'partially_rejected_invices', 
      'pending_invices'
    ];
    
    return fields.reduce((total, field) => {
      return total + getCount(invoiceCount, field);
    }, 0);
  };

  const monthlyInvoiceData = [
    { name: 'Jan', invoices: 30 },
    { name: 'Feb', invoices: 65 },
    { name: 'Mar', invoices: 45 },
    { name: 'Apr', invoices: 75 },
    { name: 'May', invoices: 50 },
    { name: 'Jun', invoices: 60 },
    { name: 'Jul', invoices: 45 },
    { name: 'Aug', invoices: 45 },
    { name: 'Sep', invoices: 40 },
    { name: 'Oct', invoices: 50 },
    { name: 'Nov', invoices: 65 },
    { name: 'Dec', invoices: 75 },
  ];

  // Enhanced region data with colors
  const regionData = [
    { region: 'North', invoices: 245, color: '#4F46E5' },
    { region: 'South', invoices: 187, color: '#06B6D4' },
    { region: 'East', invoices: 156, color: '#059669' },
    { region: 'West', invoices: 203, color: '#D97706' },
    { region: 'Central', invoices: 178, color: '#DC2626' },
  ];

  return {
    invoiceCount,
    loading,
    stores,
    loadingStores,
    stockData,
    loadingStocks,
    getCount,
    getTotalInvoices,
    monthlyInvoiceData,
    regionData
  };
}
