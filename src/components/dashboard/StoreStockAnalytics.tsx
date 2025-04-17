
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type StoreStockAnalyticsProps = {
  stores: any[];
  stockData: {
    in_stock: number;
    out_of_stock: number;
  };
  loadingStores: boolean;
  loadingStocks: boolean;
};

const STORE_COLORS = ['#9b87f5', '#33C3F0', '#8B5CF6', '#10B981', '#F59E0B'];
const STOCK_COLORS = ['#2196F3', '#F44336'];

export function StoreStockAnalytics({ stores, stockData, loadingStores, loadingStocks }: StoreStockAnalyticsProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Store & Stock Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Store Type Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {loadingStores ? (
                <div className="flex h-full items-center justify-center">
                  <p>Loading store data...</p>
                </div>
              ) : stores.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stores}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="type"
                      label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {stores.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={STORE_COLORS[index % STORE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, type, props) => [`${value} stores (${props.payload.percentage}%)`, type]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p>No store data available</p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-3 gap-4">
                {stores.map((store, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: STORE_COLORS[index % STORE_COLORS.length] }}></div>
                    <span className="text-sm">{store.type}: {store.value} ({store.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Stock Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {loadingStocks ? (
                <div className="flex h-full items-center justify-center">
                  <p>Loading stock data...</p>
                </div>
              ) : (stockData.in_stock > 0 || stockData.out_of_stock > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'In Stock', value: stockData.in_stock },
                        { name: 'Out of Stock', value: stockData.out_of_stock }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="cell-0" fill={STOCK_COLORS[0]} />
                      <Cell key="cell-1" fill={STOCK_COLORS[1]} />
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p>No stock data available</p>
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span>In Stock: {stockData.in_stock}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span>Out of Stock: {stockData.out_of_stock}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
