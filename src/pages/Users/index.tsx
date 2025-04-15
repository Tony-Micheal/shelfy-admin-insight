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
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useState } from 'react';

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  city: string;
  segment: string;
  store_status: number;
};

const users: User[] = [
  {
    id: 61741,
    name: "كريم",
    phone: "01121348951",
    email: "mohameda.shaker16@gmail.com",
    city: "Cairo",
    segment: "2",
    store_status: 1
  },
  // Add more sample data with the same structure
];

const ITEMS_PER_PAGE = 10;

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calculate pagination
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, endIndex);
  
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
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <UsersIcon size={20} className="mr-2" />
              Users List
            </h3>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-9" />
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
                  {currentUsers.map(user => (
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
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
