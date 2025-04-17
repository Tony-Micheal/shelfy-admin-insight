
import { ServerErrorBanner } from '@/components/dashboard/ServerErrorBanner';
import { InvoiceStatistics } from '@/components/dashboard/InvoiceStatistics';
import { StoreStockAnalytics } from '@/components/dashboard/StoreStockAnalytics';
import { MonthlyInvoicePerformance } from '@/components/dashboard/MonthlyInvoicePerformance';
import { DashboardHiddenContent } from '@/components/dashboard/DashboardHiddenContent';
import { useDashboardData } from '@/components/dashboard/useDashboardData';
import MapComponent from '@/components/dashboard/MapComponent';

export default function OverviewTab() {
  const {
    invoiceCount,
    stores,
    stockData,
    loadingStores,
    loadingStocks,
    getCount,
    getTotalInvoices,
    monthlyInvoiceData,
    regionData
  } = useDashboardData();

  return (
    <div className="space-y-8 animate-fade-in">
      <ServerErrorBanner />

      <InvoiceStatistics 
        invoiceCount={invoiceCount} 
        getCount={getCount} 
        getTotalInvoices={getTotalInvoices}
      />
      
      <StoreStockAnalytics 
        stores={stores} 
        stockData={stockData}
        loadingStores={loadingStores}
        loadingStocks={loadingStocks}
      />
      
      <MonthlyInvoicePerformance data={monthlyInvoiceData} />
      
      <MapComponent regionData={regionData} />

      <DashboardHiddenContent />
    </div>
  );
}
