
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { AdminsTable } from '@/components/admins/AdminsTable';
import AllAdminsHook from '@/components/logic/Admins/AllAdminsHook';

export default function Admins() {
  const [allAdmins, totalPages, currentPage, handlePreviousPage, handleNextPage, loading] = AllAdminsHook();

  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admins Management</h1>
        </div>
        
        <Card>
          <div className="p-6">
            <AdminsTable admins={allAdmins} loading={loading} />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
