
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TabNavigation, Tab } from '@/components/dashboard/TabNavigation';
import OverviewTab from './OverviewTab';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function Dashboard() {
  // Define the tabs for the dashboard
  const dashboardTabs: Tab[] = [
    { label: 'DAILY CAPSULES', path: '/' },
    { label: 'ASSORTMENT', path: '/assortment' },
    { label: 'SOS', path: '/sos' },
    { label: 'NPD', path: '/npd' },
  ];
  
  return (
    <Provider store={store}>
      <MainLayout>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shelfy Intelligence Dashboard</h1>
            <div>
              <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
            </div>
          </div>
          
          <TabNavigation tabs={dashboardTabs} />
          
          <div className="py-4">
            <OverviewTab />
          </div>
        </div>
      </MainLayout>
    </Provider>
  );
}
