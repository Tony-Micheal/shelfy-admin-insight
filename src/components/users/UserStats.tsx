
import { UserRoundCog, Users, Calendar } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { Badge } from '@/components/ui/badge';

type UserStatsProps = {
  users: Array<{
    id: number;
    segment: string;
    store_status: number;
  }>;
};

export const UserStats = ({ users }: UserStatsProps) => {
  const totalUsers = users.length;
  const administrators = users.filter(user => user.segment === "1").length;
  const activeUsers = users.filter(user => user.store_status === 1).length;
  const inactiveUsers = totalUsers - activeUsers;
  // For demo purposes, we'll consider users from this month as "new"
  const newUsers = Math.floor(totalUsers * 0.2); // 20% of total users for demo

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <KpiCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="h-4 w-4" />}
        className="bg-white"
        footer={
          <div className="flex gap-2 mt-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              {activeUsers} Active
            </Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
              {inactiveUsers} Inactive
            </Badge>
          </div>
        }
      />
      <KpiCard
        title="Administrators"
        value={administrators}
        icon={<UserRoundCog className="h-4 w-4" />}
        className="bg-white"
        footer={
          <div className="flex gap-2 mt-2">
            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
              Full Access
            </Badge>
          </div>
        }
      />
      <KpiCard
        title="New Users This Month"
        value={newUsers}
        icon={<Calendar className="h-4 w-4" />}
        className="bg-white"
        footer={
          <div className="flex gap-2 mt-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              April 2025
            </Badge>
          </div>
        }
      />
    </div>
  );
};
