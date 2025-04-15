
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
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Products() {
  const navigate = useNavigate();
  const  [allProducts,totalPages,currentPage,handlePageChange] = AllProductsHook();
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 15;

  // Filter products based on search term
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.name_ar.includes(searchTerm) ||
    product.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);



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
                <Input 
                  placeholder="Search products..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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

            {/* Pagination */}
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index + 1}>
                      <PaginationLink
                        onClick={() => handlePageChange(index + 1)}
                        isActive={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
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
