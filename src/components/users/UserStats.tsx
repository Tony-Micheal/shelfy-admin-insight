
import { UserRoundCog, Users, Calendar } from 'lucide-react';
import { KpiCard } from '@/components/dashboard/KpiCard';

type UserStatsProps = {
  users: Array<{
    id: number;
    segment: string;
  }>;
};

export const UserStats = ({ users }: UserStatsProps) => {
  const totalUsers = users.length;
  const administrators = users.filter(user => user.segment === "1").length;
  // For demo purposes, we'll consider users from this month as "new"
  const newUsers = Math.floor(totalUsers * 0.2); // 20% of total users for demo

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      <KpiCard
        title="Total Users"
        value={totalUsers}
        icon={<Users className="h-4 w-4" />}
        className="bg-white"
      />
      <KpiCard
        title="Administrators"
        value={administrators}
        icon={<UserRoundCog className="h-4 w-4" />}
        className="bg-white"
      />
      <KpiCard
        title="New Users This Month"
        value={newUsers}
        icon={<Calendar className="h-4 w-4" />}
        className="bg-white"
      />
    </div>
  );
};
