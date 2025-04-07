
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
import { SearchIcon, Award, Plus, Minus, User, Calendar, CheckCircle, Star, Store } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const userPoints = [
  { 
    id: 1, 
    name: 'John Smith', 
    role: 'Field Agent',
    region: 'North',
    totalPoints: 1850,
    thisMonth: 320,
    lastActivity: '2023-04-05',
    status: 'Active'
  },
  { 
    id: 2, 
    name: 'Maria Garcia', 
    role: 'Store Auditor',
    region: 'South',
    totalPoints: 2240,
    thisMonth: 410,
    lastActivity: '2023-04-04',
    status: 'Active'
  },
  { 
    id: 3, 
    name: 'David Johnson', 
    role: 'Field Agent',
    region: 'East',
    totalPoints: 1560,
    thisMonth: 280,
    lastActivity: '2023-04-03',
    status: 'Active'
  },
  { 
    id: 4, 
    name: 'Sarah Lee', 
    role: 'Store Auditor',
    region: 'West',
    totalPoints: 1980,
    thisMonth: 350,
    lastActivity: '2023-04-02',
    status: 'Inactive'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    role: 'Field Agent',
    region: 'North',
    totalPoints: 1640,
    thisMonth: 290,
    lastActivity: '2023-04-01',
    status: 'Active'
  }
];

const activityHistory = [
  { date: '2023-04-05', description: 'Store visit completed', points: 50, store: 'Metro Supermarket' },
  { date: '2023-04-04', description: 'Monthly bonus awarded', points: 100, store: 'N/A' },
  { date: '2023-04-03', description: 'Planogram compliance check', points: 30, store: 'Daily Market' },
  { date: '2023-04-02', description: 'Product placement photo', points: 20, store: 'Express Store' },
  { date: '2023-04-01', description: 'OSA report submitted', points: 40, store: 'Super Grocers' },
];

export default function PointsBonuses() {
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
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Points & Bonuses</h1>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Award size={16} className="mr-2" />
              Set Monthly Goals
            </Button>
            <Button>
              <Plus size={16} className="mr-2" />
              Add Manual Bonus
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">8,245</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Total Points Earned</div>
              <Progress value={82} className="h-4 w-full" />
              <div className="text-sm text-gray-500 mt-2">82% of monthly target</div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">1,650</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Points This Month</div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 flex items-center">
                  <Plus size={12} className="mr-1" />
                  12% vs. last month
                </Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">$412.25</div>
              <div className="text-lg font-medium text-gray-500 mb-4">Bonus Value</div>
              <Button size="sm">Redeem Points</Button>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Field Agents</h3>
            <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative w-full md:w-96">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search agents..." className="pl-9" />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">All Regions</Button>
                <Button variant="outline" size="sm">All Roles</Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Total Points</TableHead>
                    <TableHead>This Month</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userPoints.map(user => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-500" />
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getRegionColor(user.region)}`}>
                          {user.region}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{user.totalPoints} pts</TableCell>
                      <TableCell>
                        <Badge className="bg-shelfy-orange bg-opacity-10 text-shelfy-orange">
                          {user.thisMonth} pts
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2 text-gray-500" />
                          {user.lastActivity}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Plus size={14} className="mr-1" />
                            Add
                          </Button>
                          <Button variant="outline" size="sm">
                            <Minus size={14} className="mr-1" />
                            Deduct
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
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activityHistory.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <CheckCircle size={16} className="text-shelfy-orange" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.description}</p>
                      <div className="flex items-center mt-1">
                        <Calendar size={14} className="mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{activity.date}</span>
                        {activity.store !== 'N/A' && (
                          <>
                            <span className="mx-2 text-gray-300">•</span>
                            <Store size={14} className="mr-1 text-gray-500" />
                            <span className="text-sm text-gray-500">{activity.store}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-shelfy-orange bg-opacity-10 text-shelfy-orange">
                    +{activity.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
