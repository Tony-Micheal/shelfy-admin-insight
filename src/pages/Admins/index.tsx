
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { AdminsTable } from '@/components/admins/AdminsTable';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import AllAdminsHook from '../../components/logic/Admins/AllAdminsHook';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateAdminForm } from '@/components/admins/CreateAdminForm';

export default function Admins() {
  const [
    allAdmins, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    searchTerm, 
    handleSearch, 
    loading
  ] = AllAdminsHook();
  
  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admins Management</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin</DialogTitle>
              </DialogHeader>
              <CreateAdminForm onClose={() => {}} />
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <div className="p-6">
            <AdminsTable 
              admins={allAdmins} 
              loading={loading} 
              currentPage={currentPage}
              totalPages={totalPages}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
            />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
