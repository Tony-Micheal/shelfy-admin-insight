
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, UsersIcon, UserPlus, MapPin, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { UserStats } from '@/components/users/UserStats';
import AllUsersHook from './../../components/logic/Users/AllUsersHook';
import { useEffect } from 'react';

export default function Users() {
  const [
    allUsers, 
    totalPages, 
    currentPage, 
    handlePageChange, 
    handlePreviousPage, 
    handleNextPage, 
    searchTerm, 
    handleSearch, 
    loading
  ] = AllUsersHook();

  const getStoreStatusBadge = (status: number) => {
    switch(status) {
      case 1:
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 0:
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800">Unknown</Badge>;
    }
  };

  const getSegmentBadge = (segment: string) => {
    const segmentColor = {
      '1': 'purple',
      '2': 'blue',
      '3': 'green',
    }[segment] || 'gray';
    
    return (
      <Badge className={`bg-${segmentColor}-100 text-${segmentColor}-800`}>
        Segment {segment}
      </Badge>
    );
  };

  // Generate an array of page numbers for pagination
  const generatePaginationItems = () => {
    const pageItems = [];
    const maxVisiblePages = 5; // Max number of page links to show
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(i);
      }
    } else {
      // Always show first page
      pageItems.push(1);
      
      // Calculate start and end of visible pages
      let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
      
      // Adjust if at the beginning or end
      if (startPage > 2) pageItems.push('ellipsis-start');
      
      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pageItems.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) pageItems.push('ellipsis-end');
      
      // Always show last page
      pageItems.push(totalPages);
    }
    
    return pageItems;
  };

  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button>
            <UserPlus size={16} className="mr-2" />
            Add New User
          </Button>
        </div>
        
        <UserStats users={allUsers} />
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <UsersIcon size={20} className="mr-2" />
              Users List
            </h3>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search users..." 
                  className="pl-9" 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Store Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">Loading...</TableCell>
                    </TableRow>
                  ) : allUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">No users found</TableCell>
                    </TableRow>
                  ) : (
                    allUsers.map(user => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-sm text-gray-500">#{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-500" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-gray-500" />
                            <span className="text-sm font-medium">{user.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-gray-500" />
                            {user.city}
                          </div>
                        </TableCell>
                        <TableCell>{getSegmentBadge(user.segment)}</TableCell>
                        <TableCell>{getStoreStatusBadge(user.store_status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={user.store_status === 1 ? "text-red-500" : "text-green-500"}
                            >
                              {user.store_status === 1 ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 0 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={handlePreviousPage}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                      />
                    </PaginationItem>
                    
                    {generatePaginationItems().map((item, index) => {
                      if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                        return (
                          <PaginationItem key={`ellipsis-${index}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return (
                        <PaginationItem key={`page-${item}`}>
                          <PaginationLink 
                            isActive={currentPage === item}
                            onClick={() => handlePageChange(item)}
                            className="cursor-pointer"
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={handleNextPage}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
