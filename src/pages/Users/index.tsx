
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
import { SearchIcon, Users, UserPlus, Shield, Lock, Mail, Phone, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const users = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-04-05 09:30 AM',
    permissions: {
      dashboard: true,
      stores: true,
      invoices: true,
      products: true,
      reports: true,
      users: true,
      settings: true
    }
  },
  { 
    id: 2, 
    name: 'Maria Garcia', 
    email: 'maria.garcia@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-04-04 11:15 AM',
    permissions: {
      dashboard: true,
      stores: true,
      invoices: true,
      products: true,
      reports: true,
      users: false,
      settings: false
    }
  },
  { 
    id: 3, 
    name: 'David Johnson', 
    email: 'david.johnson@example.com',
    phone: '+1 (555) 345-6789',
    role: 'Field Agent',
    status: 'Active',
    lastLogin: '2023-04-03 02:45 PM',
    permissions: {
      dashboard: true,
      stores: true,
      invoices: false,
      products: false,
      reports: true,
      users: false,
      settings: false
    }
  },
  { 
    id: 4, 
    name: 'Sarah Lee', 
    email: 'sarah.lee@example.com',
    phone: '+1 (555) 456-7890',
    role: 'Store Auditor',
    status: 'Inactive',
    lastLogin: '2023-04-02 10:00 AM',
    permissions: {
      dashboard: true,
      stores: true,
      invoices: false,
      products: true,
      reports: true,
      users: false,
      settings: false
    }
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    email: 'michael.brown@example.com',
    phone: '+1 (555) 567-8901',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-04-01 03:30 PM',
    permissions: {
      dashboard: true,
      stores: true,
      invoices: true,
      products: true,
      reports: true,
      users: false,
      settings: false
    }
  }
];

export default function Users() {
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'Manager':
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>;
      case 'Field Agent':
        return <Badge className="bg-green-100 text-green-800">Field Agent</Badge>;
      case 'Store Auditor':
        return <Badge className="bg-yellow-100 text-yellow-800">Store Auditor</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{users.length}</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Total Users</div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800">
                  {users.filter(u => u.status === 'Active').length} Active
                </Badge>
                <Badge className="bg-gray-100 text-gray-800">
                  {users.filter(u => u.status === 'Inactive').length} Inactive
                </Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{users.filter(u => u.role === 'Admin').length}</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Administrators</div>
              <Badge className="bg-purple-100 text-purple-800">Full Access</Badge>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-lg font-medium text-gray-500 mb-4">New Users This Month</div>
              <Badge className="bg-blue-100 text-blue-800">April 2023</Badge>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Users size={20} className="mr-2" />
              Users List
            </h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search users..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">All Roles</Button>
                <Button variant="outline" size="sm">All Statuses</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail size={16} className="mr-2 text-gray-500" />
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-gray-500" />
                          {user.phone}
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {user.lastLogin}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            Deactivate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Shield size={20} className="mr-2" />
              Permission Matrix
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Dashboard</TableHead>
                    <TableHead>Stores</TableHead>
                    <TableHead>Invoices</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Reports</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Settings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span>{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.dashboard} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.stores} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.invoices} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.products} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.reports} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.users} />
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox checked={user.permissions.settings} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
