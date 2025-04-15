
import { useState } from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import LogoutHook from '../logic/LogoutHook';
import LoginHook from './../logic/LoginHook';
import { Navigate } from 'react-router-dom';

export function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New store added in East region", read: false },
    { id: 2, message: "5 invoices pending approval", read: false },
    { id: 3, message: "OSA compliance improved by 5%", read: true },
  ]);

  const [onSubmitLogout]=LogoutHook();

  return (
    <div className="flex items-center justify-between py-3 px-6">
      <div>
        {/* Removed the duplicate heading */}
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-shelfy-red rounded-full"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className={`${!notification.read ? 'font-medium' : ''}`}>
                <div className="flex items-start">
                  {!notification.read && (
                    <span className="mr-2 mt-1.5 w-2 h-2 bg-shelfy-teal rounded-full" />
                  )}
                  <span>{notification.message}</span>
                </div>
              </DropdownMenuItem>
            ))}
            {notifications.length === 0 && (
              <div className="py-2 px-4 text-center text-gray-500">
                No new notifications
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        {
              localStorage.getItem("user")?
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
              
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-8 h-8 rounded-full bg-shelfy-teal/10 flex items-center justify-center">
                    <User size={16} className="text-shelfy-teal" />
                  </div>
                  <span className="hidden md:inline">Admin User</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2" size={16} />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-shelfy-red" onClick={(e)=>onSubmitLogout(e)}>
                  <LogOut className="mr-2" size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
              :

              <Navigate to="/login" replace />
            }

      </div>
    </div>
  );
}
