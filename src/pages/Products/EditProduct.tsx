
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useParams, useNavigate } from 'react-router-dom';
import EditProductHook from './../../components/logic/Products/EditProductHook';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product,loading]=EditProductHook(id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    navigate('/products');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Product #{id}</h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nameEn">Name (English)</Label>
                <Input
                  id="nameEn"
                  defaultValue={product.name}
                  placeholder="Enter product name in English"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="nameAr">Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  defaultValue={product.name_ar}
                  placeholder="Enter product name in Arabic"
                  className="font-arabic"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  defaultValue={product.barcode}
                  placeholder="Enter product barcode"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  defaultValue={product.brand}
                  placeholder="Enter product brand"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/products')}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
