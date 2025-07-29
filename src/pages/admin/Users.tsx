import { useState } from 'react';
import { Users as UsersIcon, Eye, Edit, Ban, CheckCircle, XCircle, Calendar, DollarSign } from 'lucide-react';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { LiquidPageHeader } from '@/components/liquid/LiquidPageHeader';
import { LiquidMetricGrid } from '@/components/liquid/LiquidMetricGrid';
import { PageChakraTheme } from '@/components/liquid/PageChakraTheme';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  role: 'user' | 'premium' | 'practitioner';
  registrationDate: string;
  lastLogin: string;
  bookingsCount: number;
  totalSpent: number;
  verified: boolean;
}

const mockUsers: User[] = [
  {
    id: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    status: 'active',
    role: 'premium',
    registrationDate: '2024-01-15',
    lastLogin: '2024-01-27 14:30',
    bookingsCount: 12,
    totalSpent: 890,
    verified: true
  },
  {
    id: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    status: 'active',
    role: 'user',
    registrationDate: '2024-01-10',
    lastLogin: '2024-01-26 09:15',
    bookingsCount: 5,
    totalSpent: 245,
    verified: true
  },
  {
    id: '3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    name: 'Emma Davis',
    email: 'emma.davis@example.com',
    status: 'inactive',
    role: 'user',
    registrationDate: '2023-12-20',
    lastLogin: '2024-01-20 16:45',
    bookingsCount: 3,
    totalSpent: 120,
    verified: false
  },
  {
    id: '4',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    status: 'suspended',
    role: 'user',
    registrationDate: '2023-11-05',
    lastLogin: '2024-01-18 11:20',
    bookingsCount: 1,
    totalSpent: 45,
    verified: true
  },
  {
    id: '5',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    name: 'Lisa Parker',
    email: 'lisa.parker@example.com',
    status: 'active',
    role: 'premium',
    registrationDate: '2023-10-30',
    lastLogin: '2024-01-27 18:00',
    bookingsCount: 24,
    totalSpent: 1450,
    verified: true
  }
];

function StatusBadge({ status }: { status: User['status'] }) {
  const config = {
    active: { 
      label: 'Active', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    inactive: { 
      label: 'Inactive', 
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      icon: <XCircle className="w-3 h-3" />
    },
    suspended: { 
      label: 'Suspended', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <Ban className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[status];

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border",
      className
    )}>
      {icon}
      {label}
    </span>
  );
}

function RoleBadge({ role }: { role: User['role'] }) {
  const config = {
    user: { 
      label: 'User', 
      className: 'bg-white/10 text-white/80',
    },
    premium: { 
      label: 'Premium', 
      className: 'bg-chakra-crown/20 text-chakra-crown',
    },
    practitioner: { 
      label: 'Practitioner', 
      className: 'bg-chakra-throat/20 text-chakra-throat',
    }
  };

  const { label, className } = config[role];

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium",
      className
    )}>
      {label}
    </span>
  );
}

export default function Users() {
  const [isLoading] = useState(false);

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (_, user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="font-medium text-white">{user.name}</div>
            <div className="text-sm text-white/60">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (role) => <RoleBadge role={role} />
    },
    {
      key: 'registrationDate',
      label: 'Registered',
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      sortable: true,
      render: (login) => (
        <div className="text-sm">
          <div className="text-white">{new Date(login).toLocaleDateString()}</div>
          <div className="text-white/60">{new Date(login).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'bookingsCount',
      label: 'Bookings',
      sortable: true,
      render: (count) => (
        <span className="text-chakra-solar font-medium">{count}</span>
      )
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      sortable: true,
      render: (amount) => (
        <span className="text-chakra-sacral font-medium">${amount}</span>
      )
    }
  ];

  const actions: TableAction<User>[] = [
    {
      id: 'view',
      label: 'View Profile',
      icon: <Eye className="w-4 h-4" />,
      onClick: (user) => console.log('View user:', user.id),
    },
    {
      id: 'edit',
      label: 'Edit User',
      icon: <Edit className="w-4 h-4" />,
      onClick: (user) => console.log('Edit user:', user.id),
    },
    {
      id: 'suspend',
      label: 'Suspend User',
      icon: <Ban className="w-4 h-4" />,
      onClick: (user) => console.log('Suspend user:', user.id),
      variant: 'danger',
      show: (user) => user.status !== 'suspended'
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' }
      ]
    },
    {
      key: 'role',
      label: 'Filter by Role',
      options: [
        { value: 'user', label: 'User' },
        { value: 'premium', label: 'Premium' },
        { value: 'practitioner', label: 'Practitioner' }
      ]
    }
  ];

  const metrics = [
    {
      id: 'total-users',
      title: 'Total Users',
      value: 24567,
      subtitle: 'Registered platform users',
      icon: <UsersIcon className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'medium' as const,
      trend: { value: 12.3, isPositive: true, label: 'this week' },
      delay: 0
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: 18234,
      subtitle: '74.2% of total users',
      icon: <CheckCircle className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'featured' as const,
      trend: { value: 8.7, isPositive: true, label: 'engagement' },
      delay: 150
    },
    {
      id: 'new-today',
      title: 'New Today',
      value: 89,
      subtitle: '+23 vs yesterday',
      icon: <Calendar className="w-6 h-6" />,
      chakra: 'solar' as const,
      size: 'medium' as const,
      trend: { value: 34.8, isPositive: true, label: 'growth' },
      delay: 300
    },
    {
      id: 'total-revenue',
      title: 'Total Revenue',
      value: '$89.2K',
      subtitle: 'This month from users',
      icon: <DollarSign className="w-6 h-6" />,
      chakra: 'sacral' as const,
      size: 'wide' as const,
      trend: { value: 15.2, isPositive: true, label: 'revenue' },
      delay: 450
    }
  ];

  return (
    <PageChakraTheme chakra="heart">
      <div className="space-y-8">
        {/* Liquid Header */}
        <LiquidPageHeader
          title="User Management"
          subtitle="Manage and monitor all platform users with advanced insights"
          icon={<UsersIcon className="w-8 h-8" />}
          chakra="heart"
        />

        {/* Liquid Metrics Grid */}
        <LiquidMetricGrid 
          metrics={metrics}
          columns={4}
          variant="dynamic"
        />

        {/* Users Table */}
        <div className="liquid-glass-elevated rounded-2xl p-6 animate-liquid-morph" style={{ animationDelay: '600ms' }}>
          <AdminDataTable
            data={mockUsers}
            columns={columns}
            actions={actions}
            filters={filters}
            searchPlaceholder="Search users by name, email..."
            isLoading={isLoading}
            onExport={() => console.log('Export users')}
          />
        </div>
      </div>
    </PageChakraTheme>
  );
}