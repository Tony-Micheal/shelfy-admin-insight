import { KpiCard } from '@/components/dashboard/KpiCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  LabelList,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { ShoppingBag, FileText, Users, BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// Dummy data for charts
const pieData = [
  { name: 'OSA Rating', value: 68 },
  { name: 'OOS Rating', value: 32 },
];

const barData = [
  { name: 'Dairy', value: 45 },
  { name: 'Beverages', value: 41 },
  { name: 'Bakery', value: 38 },
  { name: 'Snacks', value: 37 },
  { name: 'Produce', value: 28 },
];

const monthlyData = [
  { name: 'Jan', views: 30, clicks: 10 },
  { name: 'Feb', views: 65, clicks: 12 },
  { name: 'Mar', views: 45, clicks: 15 },
  { name: 'Apr', views: 75, clicks: 20 },
  { name: 'May', views: 50, clicks: 18 },
  { name: 'Jun', views: 60, clicks: 23 },
  { name: 'Jul', views: 45, clicks: 15 },
  { name: 'Aug', views: 45, clicks: 20 },
  { name: 'Sep', views: 40, clicks: 25 },
  { name: 'Oct', views: 50, clicks: 30 },
  { name: 'Nov', views: 65, clicks: 25 },
  { name: 'Dec', views: 75, clicks: 30 },
];

const COLORS = ['#EE6721', '#99A4B9'];

export default function OverviewTab() {
  return (
    <div className="space-y-8 animate-fade-in">
     
    </div>
  );
}
