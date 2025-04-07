
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
import { SearchIcon, MapPin, Store, ShoppingBag, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const stores = [
  { 
    id: 1, 
    name: 'Metro Supermarket', 
    region: 'North', 
    channel: 'Supermarket',
    address: '123 Main St, Brooklyn, NY',
    visitFrequency: 'Weekly',
    rating: 4.5,
    lastVisit: '2023-04-05'
  },
  { 
    id: 2, 
    name: 'Daily Market', 
    region: 'South', 
    channel: 'Grocery',
    address: '456 Oak Ave, Queens, NY',
    visitFrequency: 'Bi-weekly',
    rating: 3.8,
    lastVisit: '2023-04-02'
  },
  { 
    id: 3, 
    name: 'Express Store', 
    region: 'East', 
    channel: 'Convenience',
    address: '789 Pine St, Manhattan, NY',
    visitFrequency: 'Monthly',
    rating: 4.2,
    lastVisit: '2023-03-28'
  },
  { 
    id: 4, 
    name: 'Super Grocers', 
    region: 'West', 
    channel: 'Hypermarket',
    address: '321 Elm Rd, Bronx, NY',
    visitFrequency: 'Weekly',
    rating: 4.7,
    lastVisit: '2023-04-04'
  },
  { 
    id: 5, 
    name: 'Quick Mart', 
    region: 'North', 
    channel: 'Convenience',
    address: '654 Birch Blvd, Staten Island, NY',
    visitFrequency: 'Monthly',
    rating: 3.5,
    lastVisit: '2023-03-25'
  },
  { 
    id: 6, 
    name: 'Family Grocer', 
    region: 'South', 
    channel: 'Grocery',
    address: '987 Maple Dr, Brooklyn, NY',
    visitFrequency: 'Bi-weekly',
    rating: 4.0,
    lastVisit: '2023-03-30'
  },
  { 
    id: 7, 
    name: 'Urban Market', 
    region: 'East', 
    channel: 'Supermarket',
    address: '159 Cedar St, Manhattan, NY',
    visitFrequency: 'Weekly',
    rating: 4.3,
    lastVisit: '2023-04-03'
  }
];

export default function Stores() {
  const getChannelColor = (channel: string) => {
    switch(channel) {
      case 'Supermarket':
        return 'bg-blue-100 text-blue-800';
      case 'Grocery':
        return 'bg-green-100 text-green-800';
      case 'Convenience':
        return 'bg-purple-100 text-purple-800';
      case 'Hypermarket':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRegionColor = (region: string) => {
    switch(region) {
      case 'North':
        return 'bg-red-100 text-red-800';
      case 'South':
        return 'bg-yellow-100 text-yellow-800';
      case 'East':
        return 'bg-green-100 text-green-800';
      case 'West':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getRatingBadge = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-100 text-green-800';
    if (rating >= 4.0) return 'bg-blue-100 text-blue-800';
    if (rating >= 3.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Stores</h1>
          <Button>
            <Store size={16} className="mr-2" />
            Add New Store
          </Button>
        </div>
        
        <Card>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search stores..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  All Regions
                </Button>
                <Button variant="outline" size="sm">
                  All Channels
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Visit Frequency</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stores.map(store => (
                    <TableRow key={store.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <ShoppingBag size={16} className="mr-2 text-gray-500" />
                          {store.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getRegionColor(store.region)}`}>
                          {store.region}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getChannelColor(store.channel)}`}>
                          {store.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2 text-gray-500" />
                          <span className="text-sm">{store.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{store.visitFrequency}</TableCell>
                      <TableCell>
                        <Badge className={`${getRatingBadge(store.rating)}`}>
                          {store.rating.toFixed(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {store.lastVisit}
                        </div>
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
