
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import InvoicesCountHook from '../../components/logic/Invoivces/InvoicesCountHook';
import AllInvoicesHook from '../../components/logic/Invoivces/AllInvoicesHook';
import { StatusCards } from '@/components/invoices/StatusCards';
import { SearchBar } from '@/components/invoices/SearchBar';
import { InvoiceTable } from '@/components/invoices/InvoiceTable';

export default function Invoices() {
  const [invoiceCount, loading] = InvoicesCountHook();
  const [allInvoices, totalPages, currentPage, handlePageChange, searchTerm, handleSearch, loading2, invoiceStatus, handleFilter] = AllInvoicesHook();
  
  const getCount = (data: any, field: string) => {
    if (!data || !data[field]) return 0;
    return data[field].count || 0;
  };

  const getTotalCount = (data: any) => {
    if (!data) return 0;
    return getCount(data, 'acceepted_invices') + 
           getCount(data, 'rejected_invices') + 
           getCount(data, 'partially_rejected_invices') + 
           getCount(data, 'pending_invices');
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <div className="text-sm text-gray-500">
            Total Invoices: <span className="font-bold text-gray-900">{getTotalCount(invoiceCount)}</span>
          </div>
        </div>
        
        <Card>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6">
            <StatusCards 
              invoiceCount={invoiceCount}
              invoiceStatus={invoiceStatus}
              handleFilter={()=>handleFilter(invoiceCount)}
              getCount={getCount}
            />
          </div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <SearchBar 
                searchTerm={searchTerm}
                handleSearch={handleSearch}
              />
            </div>
            
            <InvoiceTable 
              allInvoices={allInvoices}
              loading2={loading2}
            />
            
            {totalPages > 0 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
