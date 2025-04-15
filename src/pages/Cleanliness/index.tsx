
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
import { SearchIcon, Upload, ImageIcon, Calendar, Star, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const cleanlinessReports = [
  { 
    id: 1, 
    store: 'Metro Supermarket', 
    date: '2023-04-05', 
    rating: 4,
    inspector: 'John Smith',
    imageUrl: '/placeholder.svg',
    comments: 'Very clean, all areas well maintained'
  },
  { 
    id: 2, 
    store: 'Daily Market', 
    date: '2023-04-04', 
    rating: 3,
    inspector: 'Maria Garcia',
    imageUrl: '/placeholder.svg',
    comments: 'Floor needs better cleaning, shelves are dusty'
  },
  { 
    id: 3, 
    store: 'Express Store', 
    date: '2023-04-03', 
    rating: 5,
    inspector: 'David Johnson',
    imageUrl: '/placeholder.svg',
    comments: 'Excellent condition, very well maintained'
  },
  { 
    id: 4, 
    store: 'Super Grocers', 
    date: '2023-04-02', 
    rating: 4,
    inspector: 'Sarah Lee',
    imageUrl: '/placeholder.svg',
    comments: 'Good overall, some areas need attention'
  },
  { 
    id: 5, 
    store: 'Quick Mart', 
    date: '2023-04-01', 
    rating: 2,
    inspector: 'Michael Brown',
    imageUrl: '/placeholder.svg',
    comments: 'Poor condition, immediate cleaning required'
  }
];

export default function Cleanliness() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-shelfy-orange fill-shelfy-orange" : "text-gray-300"} 
      />
    ));
  };
  
  const getAverageRating = () => {
    const sum = cleanlinessReports.reduce((acc, report) => acc + report.rating, 0);
    return (sum / cleanlinessReports.length).toFixed(1);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cleanliness Ratings</h1>
          <Button>
            <Upload size={16} className="mr-2" />
            Submit New Rating
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{getAverageRating()}</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Average Rating</div>
              <div className="flex">
                {renderStars(Math.round(parseFloat(getAverageRating())))}
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">
                {cleanlinessReports.filter(r => r.rating >= 4).length}
              </div>
              <div className="text-lg font-medium text-gray-500 mb-4">High Quality Stores</div>
              <Badge className="bg-green-100 text-green-800">4+ Stars</Badge>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">
                {cleanlinessReports.filter(r => r.rating <= 2).length}
              </div>
              <div className="text-lg font-medium text-gray-500 mb-4">Stores Needing Attention</div>
              <Badge className="bg-red-100 text-red-800">2 Stars or Less</Badge>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Cleanliness Reports</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search reports..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">All Ratings</Button>
                <Button variant="outline" size="sm">Date Range</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Images</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cleanlinessReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Store size={16} className="mr-2 text-gray-500" />
                          {report.store}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {report.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {renderStars(report.rating)}
                        </div>
                      </TableCell>
                      <TableCell>{report.inspector}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ImageIcon size={14} />
                          View Photo
                        </Button>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{report.comments}</TableCell>
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
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <ImageIcon size={20} className="mr-2" />
              Recent Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {cleanlinessReports.map(report => (
                <div key={report.id} className="border rounded-md p-4">
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">{report.store}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {renderStars(report.rating)}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">{report.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
