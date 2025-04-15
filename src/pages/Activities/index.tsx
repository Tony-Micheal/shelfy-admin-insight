
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
import { Button } from '@/components/ui/button';
import { FileBarChart, ImageIcon, Star, Clock, CheckCircle, XCircle } from 'lucide-react';

const activities = [
  { 
    id: 1, 
    store: 'Metro Supermarket', 
    visitTime: '2023-04-05 09:30 AM', 
    actions: ['Shelf arrangement', 'Product replenishment', 'Pricing check'],
    cleanliness: 4,
    billCaptured: true,
    pointsEarned: 120
  },
  { 
    id: 2, 
    store: 'Daily Market', 
    visitTime: '2023-04-04 11:15 AM', 
    actions: ['Inventory check', 'Expired product removal'],
    cleanliness: 3,
    billCaptured: true,
    pointsEarned: 85
  },
  { 
    id: 3, 
    store: 'Express Store', 
    visitTime: '2023-04-03 02:45 PM', 
    actions: ['New product placement', 'Promotional setup'],
    cleanliness: 5,
    billCaptured: false,
    pointsEarned: 95
  },
  { 
    id: 4, 
    store: 'Super Grocers', 
    visitTime: '2023-04-02 10:00 AM', 
    actions: ['Planogram check', 'Shelf arrangement'],
    cleanliness: 4,
    billCaptured: true,
    pointsEarned: 110
  },
  { 
    id: 5, 
    store: 'Quick Mart', 
    visitTime: '2023-04-01 03:30 PM', 
    actions: ['OSA check', 'Competitor analysis'],
    cleanliness: 2,
    billCaptured: false,
    pointsEarned: 70
  }
];

export default function Activities() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? "text-shelfy-orange fill-shelfy-orange" : "text-gray-300"} 
      />
    ));
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Activities</h1>
          <div>
            <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Visits History</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock size={16} className="mr-2" /> Latest First
            </Button>
            <Button variant="outline" size="sm">
              <FileBarChart size={16} className="mr-2" /> Export Data
            </Button>
          </div>
        </div>
        
        <Card>
          <div className="p-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Store</TableHead>
                    <TableHead>Visit Time</TableHead>
                    <TableHead>Actions Performed</TableHead>
                    <TableHead>Cleanliness</TableHead>
                    <TableHead>Bill Captured</TableHead>
                    <TableHead>Points Earned</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map(activity => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.store}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-gray-500" />
                          {activity.visitTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {activity.actions.map((action, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              <div className="w-2 h-2 rounded-full bg-shelfy-orange mr-2"></div>
                              {action}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {renderStars(activity.cleanliness)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {activity.billCaptured ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle size={16} className="mr-1" />
                            Yes
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <XCircle size={16} className="mr-1" />
                            No
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-shelfy-orange">
                          {activity.pointsEarned} pts
                        </div>
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
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <ImageIcon size={20} className="mr-2" />
              Action Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((img) => (
                <div key={img} className="border rounded-md p-2">
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Action: Shelf arrangement
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
