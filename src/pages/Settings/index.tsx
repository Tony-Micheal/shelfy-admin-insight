
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Save, 
  AlertTriangle, 
  MapPin, 
  Database, 
  RefreshCw, 
  Lock, 
  UserCog, 
  Bell, 
  Globe, 
  Camera
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export default function Settings() {
  return (
    <MainLayout showFilters={false}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">System Settings</h1>
          <Button>
            <Save size={16} className="mr-2" />
            Save All Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-6 md:col-span-2">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <AlertTriangle size={20} className="mr-2" />
                  Fraud Detection
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fraud-detection" className="text-base font-medium">Enable Fraud Detection</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Automatically flag suspicious activities and unusual patterns
                      </p>
                    </div>
                    <Switch id="fraud-detection" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="image-verification" className="text-base font-medium">Image Verification</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Use AI to verify shelf images authenticity
                      </p>
                    </div>
                    <Switch id="image-verification" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="manual-review" className="text-base font-medium">Require Manual Review</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Flagged activities require admin approval
                      </p>
                    </div>
                    <Switch id="manual-review" />
                  </div>
                  
                  <div>
                    <Label htmlFor="sensitivity" className="text-base font-medium">Detection Sensitivity</Label>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">Low</span>
                      <Slider defaultValue={[75]} max={100} step={1} className="flex-1" />
                      <span className="text-sm">High</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <MapPin size={20} className="mr-2" />
                  Geolocation & Field Activities
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="geofencing" className="text-base font-medium">Enable Geofencing</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Restrict activities to within store boundaries
                      </p>
                    </div>
                    <Switch id="geofencing" defaultChecked />
                  </div>
                  
                  <div>
                    <Label htmlFor="radius" className="text-base font-medium">Geofencing Radius</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm">50m</span>
                      <Slider defaultValue={[100]} max={500} step={10} className="flex-1" />
                      <span className="text-sm">500m</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Current setting: 100 meters from store center
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="location-tracking" className="text-base font-medium">Field Agent Location Tracking</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Track agent locations during work hours
                      </p>
                    </div>
                    <Switch id="location-tracking" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="outside-hours" className="text-base font-medium">Allow Activities Outside Work Hours</Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Enable submissions outside 9am-5pm
                      </p>
                    </div>
                    <Switch id="outside-hours" />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Database size={20} className="mr-2" />
                  POS/ERP Integrations
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">SAP Integration</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Connected to SAP ERP v15.2
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Microsoft Dynamics Integration</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Connection failed - authentication error
                      </p>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Error</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Shopify POS</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Integration ready but not enabled
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Oracle NetSuite</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Last sync 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw size={14} className="mr-1" />
                      Sync Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Lock size={20} className="mr-2" />
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Session Timeout (minutes)</p>
                    <Input 
                      type="number" 
                      defaultValue="30" 
                      className="w-20 text-right" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Password Expiry (days)</p>
                    <Input 
                      type="number" 
                      defaultValue="90" 
                      className="w-20 text-right" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">IP Restrictions</p>
                    <Switch />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <UserCog size={20} className="mr-2" />
                  User Defaults
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Default User Role</p>
                    <Badge>Field Agent</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Auto-approve New Users</p>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Required Training</p>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Bell size={20} className="mr-2" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Email Alerts</p>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">SMS Notifications</p>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Push Notifications</p>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Daily Summary</p>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Globe size={20} className="mr-2" />
                  Regional Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Time Zone</p>
                    <Badge>UTC-05:00 (EST)</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Date Format</p>
                    <Badge>MM/DD/YYYY</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Currency</p>
                    <Badge>USD ($)</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Language</p>
                    <Badge>English (US)</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Camera size={20} className="mr-2" />
              Image Recognition Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="product-detection" className="text-base font-medium">Product Detection</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Automatically detect products on shelf
                    </p>
                  </div>
                  <Switch id="product-detection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="competitor-detection" className="text-base font-medium">Competitor Detection</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Identify competitor products and share of shelf
                    </p>
                  </div>
                  <Switch id="competitor-detection" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="price-tag-recognition" className="text-base font-medium">Price Tag Recognition</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Extract price information from shelf tags
                    </p>
                  </div>
                  <Switch id="price-tag-recognition" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recognition-accuracy" className="text-base font-medium">Recognition Accuracy</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm">Speed</span>
                    <Slider defaultValue={[70]} max={100} step={1} className="flex-1" />
                    <span className="text-sm">Accuracy</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="planogram-comparison" className="text-base font-medium">Planogram Comparison</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Compare shelf photos with ideal planogram
                    </p>
                  </div>
                  <Switch id="planogram-comparison" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="night-mode" className="text-base font-medium">Night Mode Detection</Label>
                    <p className="text-sm text-gray-500 mt-1">
                      Enhanced low-light image processing
                    </p>
                  </div>
                  <Switch id="night-mode" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
