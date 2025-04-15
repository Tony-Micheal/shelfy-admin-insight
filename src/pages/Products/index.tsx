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
import { SearchIcon, Box, PenSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AllProductsHook from './../../components/logic/Products/AllProductsHook';

const products = [
  { 
    id: 1, 
    nameEn: 'Fresh Milk', 
    nameAr: 'حليب طازج',
    barcode: '8901234567890',
    brand: 'Daily Fresh',
  },
  { 
    id: 2, 
    nameEn: 'White Bread', 
    nameAr: 'خبز أبيض',
    barcode: '8901234567891',
    brand: 'Bakeland',
  },
  { 
    id: 3, 
    nameEn: 'Cola Drink', 
    nameAr: 'مشروب كولا',
    barcode: '8901234567892',
    brand: 'SuperFizz',
  },
  { 
    id: 4, 
    nameEn: 'Potato Chips', 
    nameAr: 'رقائق البطاطس',
    barcode: '8901234567893',
    brand: 'Crunchies',
  },
  { 
    id: 5, 
    nameEn: 'Chocolate Bar', 
    nameAr: 'لوح شوكولاتة',
    barcode: '8901234567894',
    brand: 'SweetDelight',
  }
];

export default function Products() {
  const navigate = useNavigate();
  const [allProducts]=AllProductsHook();
  
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
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name (En)</TableHead>
                    <TableHead>Name (Ar)</TableHead>
                    <TableHead>Barcode</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">#{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="font-arabic">{product.name_ar}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Box size={16} className="mr-2 text-gray-500" />
                          {product.barcode}
                        </div>
                      </TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => navigate(`/products/${product.id}/edit`)}
                        >
                          <PenSquare size={16} />
                        </Button>
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
