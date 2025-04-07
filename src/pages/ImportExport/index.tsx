
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileUp, 
  FileDown, 
  Upload, 
  FileSpreadsheet, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Calendar,
  FileText,
  BarChart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const recentImports = [
  { 
    id: 1,
    fileName: 'stores_2023_q1.csv',
    type: 'Stores Data',
    date: '2023-04-05 09:30 AM',
    records: 152,
    status: 'Success',
    user: 'John Smith'
  },
  { 
    id: 2,
    fileName: 'products_update.xlsx',
    type: 'Products',
    date: '2023-04-04 11:15 AM',
    records: 348,
    status: 'Partial',
    errors: 15,
    user: 'Maria Garcia'
  },
  { 
    id: 3,
    fileName: 'customers_q1.csv',
    type: 'Customers',
    date: '2023-04-03 02:45 PM',
    records: 214,
    status: 'Failed',
    errors: 214,
    user: 'David Johnson'
  },
];

const recentExports = [
  { 
    id: 1,
    fileName: 'shelfy_analytics_q1.xlsx',
    type: 'Analytics Report',
    date: '2023-04-05 10:45 AM',
    size: '2.4 MB',
    user: 'John Smith'
  },
  { 
    id: 2,
    fileName: 'visits_march_2023.csv',
    type: 'Store Visits',
    date: '2023-04-03 03:30 PM',
    size: '1.8 MB',
    user: 'Maria Garcia'
  },
  { 
    id: 3,
    fileName: 'product_performance.xlsx',
    type: 'Product Performance',
    date: '2023-04-02 11:20 AM',
    size: '3.2 MB',
    user: 'David Johnson'
  },
];

export default function ImportExport() {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Success':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle size={12} />
            Success
          </Badge>
        );
      case 'Partial':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <AlertCircle size={12} />
            Partial
          </Badge>
        );
      case 'Failed':
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <AlertCircle size={12} />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Import / Export</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center">
                <FileUp size={20} className="mr-2" />
                Import Data
              </h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center">
                <FileSpreadsheet size={48} className="mx-auto text-gray-400 mb-4" />
                <h4 className="text-lg font-medium mb-2">Drag files here or click to browse</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Supported formats: CSV, XLSX, JSON
                </p>
                <Button>
                  <Upload size={16} className="mr-2" />
                  Upload Files
                </Button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileSpreadsheet size={16} className="mr-2 text-shelfy-orange" />
                      <span className="font-medium">product_data.csv</span>
                    </div>
                    <span className="text-sm text-gray-500">2.8 MB</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">65% uploaded</span>
                    <span className="text-xs text-gray-500">1.8 MB / 2.8 MB</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Data Mapping Templates</h4>
                  <Button variant="link" size="sm" className="p-0">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet size={16} className="mr-2" />
                    Product Template
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet size={16} className="mr-2" />
                    Store Template
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet size={16} className="mr-2" />
                    Customer Template
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileSpreadsheet size={16} className="mr-2" />
                    Invoice Template
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center">
                <FileDown size={20} className="mr-2" />
                Export Data
              </h3>
              
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Generate Reports</h4>
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="justify-start">
                    <BarChart size={16} className="mr-2" />
                    OSA Compliance Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart size={16} className="mr-2" />
                    SOS Analytics Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart size={16} className="mr-2" />
                    Store Visits Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart size={16} className="mr-2" />
                    Product Performance Report
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Export Raw Data</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Database size={16} className="mr-2" />
                    Products Database
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database size={16} className="mr-2" />
                    Stores Database
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database size={16} className="mr-2" />
                    Invoices Database
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Database size={16} className="mr-2" />
                    Users Database
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Imports</h3>
            <div className="space-y-4">
              {recentImports.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FileText size={16} className="text-shelfy-orange" />
                    </div>
                    <div>
                      <p className="font-medium">{item.fileName}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{item.type}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.records} records</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      {(item.status === 'Partial' || item.status === 'Failed') && (
                        <Button variant="outline" size="sm" className="h-6 px-2 py-0">
                          <RefreshCw size={12} className="mr-1" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Exports</h3>
            <div className="space-y-4">
              {recentExports.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <FileDown size={16} className="text-shelfy-orange" />
                    </div>
                    <div>
                      <p className="font-medium">{item.fileName}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500">{item.type}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{item.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1 text-gray-500" />
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileDown size={14} className="mr-1" />
                      Download
                    </Button>
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
