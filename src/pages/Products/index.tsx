
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
import { SearchIcon, Box, Barcode, Tag, DollarSign, FileBarChart, Grid } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const products = [
  { 
    id: 1, 
    name: 'Milk 1L', 
    barcode: '8901234567890',
    category: 'Dairy',
    price: '$1.99',
    margin: '22%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 2, 
    name: 'White Bread 500g', 
    barcode: '8901234567891',
    category: 'Bakery',
    price: '$2.49',
    margin: '18%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 3, 
    name: 'Cola 2L', 
    barcode: '8901234567892',
    category: 'Beverages',
    price: '$1.89',
    margin: '35%',
    stock: 'Out of Stock',
    planogramLink: '#'
  },
  { 
    id: 4, 
    name: 'Potato Chips 150g', 
    barcode: '8901234567893',
    category: 'Snacks',
    price: '$2.99',
    margin: '40%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 5, 
    name: 'Chocolate Bar 100g', 
    barcode: '8901234567894',
    category: 'Snacks',
    price: '$1.59',
    margin: '45%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 6, 
    name: 'Bottled Water 500ml', 
    barcode: '8901234567895',
    category: 'Beverages',
    price: '$0.99',
    margin: '50%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 7, 
    name: 'Yogurt 250g', 
    barcode: '8901234567896',
    category: 'Dairy',
    price: '$1.79',
    margin: '25%',
    stock: 'In Stock',
    planogramLink: '#'
  },
  { 
    id: 8, 
    name: 'Orange Juice 1L', 
    barcode: '8901234567897',
    category: 'Beverages',
    price: '$2.99',
    margin: '30%',
    stock: 'Low Stock',
    planogramLink: '#'
  }
];

export default function Products() {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Dairy':
        return 'bg-blue-100 text-blue-800';
      case 'Bakery':
        return 'bg-yellow-100 text-yellow-800';
      case 'Beverages':
        return 'bg-green-100 text-green-800';
      case 'Snacks':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStockBadge = (stock: string) => {
    switch(stock) {
      case 'In Stock':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case 'Out of Stock':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      case 'Low Stock':
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      default:
        return <Badge>{stock}</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button>
            <Box size={16} className="mr-2" />
            Add New Product
          </Button>
        </div>
        
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search products..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Grid size={16} className="mr-2" />
                  Planogram View
                </Button>
                <Button variant="outline" size="sm">
                  <FileBarChart size={16} className="mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Planogram</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Box size={16} className="mr-2 text-gray-500" />
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Barcode size={16} className="mr-2 text-gray-500" />
                          {product.barcode}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getCategoryColor(product.category)}`}>
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Tag size={16} className="mr-2 text-gray-500" />
                          {product.price}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-2 text-gray-500" />
                          {product.margin}
                        </div>
                      </TableCell>
                      <TableCell>{getStockBadge(product.stock)}</TableCell>
                      <TableCell>
                        <Button variant="link" size="sm">
                          <Grid size={14} className="mr-1" />
                          View Plan
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
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
