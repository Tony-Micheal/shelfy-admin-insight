
import { MainLayout } from '@/components/layout/MainLayout';
import { TabNavigation, Tab } from '@/components/dashboard/TabNavigation';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, FileBarChart, Grid } from 'lucide-react';

const products = [
  { id: 1, name: 'Milk 1L', brand: 'Dairy Best', category: 'Dairy', sku: 'DB-MK-001', inStock: true },
  { id: 2, name: 'White Bread 500g', brand: 'Baker\'s', category: 'Bakery', sku: 'BK-BR-001', inStock: true },
  { id: 3, name: 'Cola 2L', brand: 'Fizzy', category: 'Beverages', sku: 'FZ-CL-001', inStock: false },
  { id: 4, name: 'Potato Chips 150g', brand: 'Crunchy', category: 'Snacks', sku: 'CR-PC-001', inStock: true },
  { id: 5, name: 'Chocolate Bar 100g', brand: 'Sweet Delights', category: 'Snacks', sku: 'SD-CB-001', inStock: true },
  { id: 6, name: 'Bottled Water 500ml', brand: 'Pure', category: 'Beverages', sku: 'PR-BW-001', inStock: true },
];

export default function Assortment() {
  // Define the tabs for the dashboard
  const dashboardTabs: Tab[] = [
    { label: 'OVERVIEW', path: '/' },
    { label: 'ASSORTMENT', path: '/assortment' },
    { label: 'SOS', path: '/sos' },
    { label: 'NPD', path: '/npd' },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Shelfy Intelligence Dashboard</h1>
          <div>
            <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
          </div>
        </div>
        
        <TabNavigation tabs={dashboardTabs} />
        
        <div className="py-4 space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Assortment</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Grid size={16} className="mr-2" /> Planogram View
              </Button>
              <Button variant="outline" size="sm">
                <FileBarChart size={16} className="mr-2" /> Export Data
              </Button>
            </div>
          </div>
          
          <Card>
            <div className="p-4">
              <div className="flex items-center w-full max-w-sm space-x-2 mb-4">
                <Input
                  placeholder="Search products..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Search size={16} />
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Shelf Layout Compliance</h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                <div className="min-w-[250px] border rounded-md p-3">
                  <h4 className="font-medium mb-2">Dairy Section</h4>
                  <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Planogram Image</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Compliance:</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-shelfy-orange h-2.5 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="min-w-[250px] border rounded-md p-3">
                  <h4 className="font-medium mb-2">Beverage Section</h4>
                  <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Planogram Image</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Compliance:</span>
                      <span className="font-medium">72%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-shelfy-orange h-2.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="min-w-[250px] border rounded-md p-3">
                  <h4 className="font-medium mb-2">Snack Section</h4>
                  <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Planogram Image</p>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Compliance:</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div className="bg-shelfy-orange h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
