import { useState } from 'react';
import { UserCog, Crown, Shield, Users, Plus, Edit, Trash2, Eye, Lock, Unlock, Key, Activity, CheckCircle, XCircle } from 'lucide-react';
import { LiquidPageHeader } from '@/components/liquid/LiquidPageHeader';
import { LiquidMetricGrid } from '@/components/liquid/LiquidMetricGrid';
import { PageChakraTheme } from '@/components/liquid/PageChakraTheme';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'admin' | 'moderator' | 'support';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  permissions: string[];
  twoFactorEnabled: boolean;
  sessionCount: number;
  loginAttempts: number;
  avatar: string;
}

const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@klearkarma.com',
    role: 'super-admin',
    status: 'active',
    lastLogin: '2024-01-27 14:30:25',
    permissions: ['all'],
    twoFactorEnabled: true,
    sessionCount: 2,
    loginAttempts: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@klearkarma.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-27 13:45:12',
    permissions: ['users', 'content', 'analytics'],
    twoFactorEnabled: true,
    sessionCount: 1,
    loginAttempts: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma.davis@klearkarma.com',
    role: 'moderator',
    status: 'active',
    lastLogin: '2024-01-27 12:20:08',
    permissions: ['content', 'users'],
    twoFactorEnabled: false,
    sessionCount: 1,
    loginAttempts: 2,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@klearkarma.com',
    role: 'support',
    status: 'inactive',
    lastLogin: '2024-01-26 18:15:33',
    permissions: ['users'],
    twoFactorEnabled: false,
    sessionCount: 0,
    loginAttempts: 0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
  },
  {
    id: '5',
    name: 'Lisa Parker',
    email: 'lisa.parker@klearkarma.com',
    role: 'admin',
    status: 'suspended',
    lastLogin: '2024-01-25 09:30:45',
    permissions: ['content', 'analytics'],
    twoFactorEnabled: true,
    sessionCount: 0,
    loginAttempts: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
  }
];

function RoleBadge({ role }: { role: AdminUser['role'] }) {
  const config = {
    'super-admin': { 
      label: 'Super Admin', 
      className: 'bg-chakra-crown/20 text-chakra-crown border-chakra-crown/30',
      icon: <Crown className="w-3 h-3" />
    },
    'admin': { 
      label: 'Admin', 
      className: 'bg-chakra-third-eye/20 text-chakra-third-eye border-chakra-third-eye/30',
      icon: <Shield className="w-3 h-3" />
    },
    'moderator': { 
      label: 'Moderator', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <Users className="w-3 h-3" />
    },
    'support': { 
      label: 'Support', 
      className: 'bg-chakra-throat/20 text-chakra-throat border-chakra-throat/30',
      icon: <UserCog className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[role];
  return (
    <Badge variant="outline" className={cn("text-xs flex items-center gap-1", className)}>
      {icon}
      {label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: AdminUser['status'] }) {
  const config = {
    active: { 
      label: 'Active', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    inactive: { 
      label: 'Inactive', 
      className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
      icon: <XCircle className="w-3 h-3" />
    },
    suspended: { 
      label: 'Suspended', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <Lock className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs flex items-center gap-1", className)}>
      {icon}
      {label}
    </Badge>
  );
}

export default function AdminUsers() {
  const [isLoading] = useState(false);

  const columns: TableColumn<AdminUser>[] = [
    {
      key: 'name',
      label: 'Admin User',
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
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (role) => <RoleBadge role={role} />
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
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
      key: 'sessionCount',
      label: 'Sessions',
      sortable: true,
      render: (count) => (
        <span className="text-chakra-throat font-medium">{count}</span>
      )
    },
    {
      key: 'twoFactorEnabled',
      label: '2FA',
      sortable: true,
      render: (enabled) => (
        <div className="flex items-center gap-2">
          {enabled ? (
            <CheckCircle className="w-4 h-4 text-chakra-heart" />
          ) : (
            <XCircle className="w-4 h-4 text-chakra-root" />
          )}
          <span className="text-white/60 text-sm">
            {enabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      )
    }
  ];

  const actions: TableAction<AdminUser>[] = [
    {
      id: 'view',
      label: 'View Profile',
      icon: <Eye className="w-4 h-4" />,
      onClick: (user) => console.log('View admin user:', user.id),
    },
    {
      id: 'edit',
      label: 'Edit User',
      icon: <Edit className="w-4 h-4" />,
      onClick: (user) => console.log('Edit admin user:', user.id),
    },
    {
      id: 'suspend',
      label: 'Suspend User',
      icon: <Lock className="w-4 h-4" />,
      onClick: (user) => console.log('Suspend admin user:', user.id),
      variant: 'danger',
      show: (user) => user.status !== 'suspended'
    },
    {
      id: 'activate',
      label: 'Activate User',
      icon: <Unlock className="w-4 h-4" />,
      onClick: (user) => console.log('Activate admin user:', user.id),
      show: (user) => user.status === 'suspended'
    }
  ];

  const filters = [
    {
      key: 'role',
      label: 'Filter by Role',
      options: [
        { value: 'super-admin', label: 'Super Admin' },
        { value: 'admin', label: 'Admin' },
        { value: 'moderator', label: 'Moderator' },
        { value: 'support', label: 'Support' }
      ]
    },
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' }
      ]
    }
  ];

  const metrics = [
    {
      id: 'total-admins',
      title: 'Total Admins',
      value: 12,
      subtitle: 'Administrative users',
      icon: <Users className="w-6 h-6" />,
      chakra: 'crown' as const,
      size: 'featured' as const,
      trend: { value: 2, isPositive: true, label: 'this month' },
      delay: 0
    },
    {
      id: 'active-sessions',
      title: 'Active Sessions',
      value: 8,
      subtitle: 'Currently logged in',
      icon: <Activity className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'medium' as const,
      trend: { value: 12.5, isPositive: true, label: 'increase' },
      delay: 150
    },
    {
      id: '2fa-enabled',
      title: '2FA Enabled',
      value: '75%',
      subtitle: 'Two-factor authentication',
      icon: <Key className="w-6 h-6" />,
      chakra: 'third-eye' as const,
      size: 'medium' as const,
      trend: { value: 8.3, isPositive: true, label: 'adoption' },
      delay: 300
    },
    {
      id: 'security-score',
      title: 'Security Score',
      value: 'A+',
      subtitle: 'Admin security rating',
      icon: <Shield className="w-6 h-6" />,
      chakra: 'root' as const,
      size: 'wide' as const,
      trend: { value: 5.2, isPositive: true, label: 'improvement' },
      delay: 450
    }
  ];

  const rolePermissions = [
    {
      role: 'Super Admin',
      permissions: ['All Permissions'],
      color: 'chakra-crown',
      icon: <Crown className="w-5 h-5" />
    },
    {
      role: 'Admin',
      permissions: ['Users', 'Content', 'Analytics', 'Settings'],
      color: 'chakra-third-eye',
      icon: <Shield className="w-5 h-5" />
    },
    {
      role: 'Moderator',
      permissions: ['Content', 'Users', 'Reports'],
      color: 'chakra-heart',
      icon: <Users className="w-5 h-5" />
    },
    {
      role: 'Support',
      permissions: ['Users', 'Tickets', 'Basic Reports'],
      color: 'chakra-throat',
      icon: <UserCog className="w-5 h-5" />
    }
  ];

  return (
    <PageChakraTheme chakra="crown">
      <div className="space-y-8">
        {/* Liquid Header */}
        <LiquidPageHeader
          title="Admin User Management"
          subtitle="Manage administrator accounts, roles, permissions, and security settings"
          icon={<UserCog className="w-8 h-8" />}
          chakra="crown"
        />

        {/* Liquid Metrics Grid */}
        <LiquidMetricGrid 
          metrics={metrics}
          columns={2}
          variant="dynamic"
        />

        {/* Role Permissions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rolePermissions.map((role) => (
            <Card key={role.role} className="liquid-glass-elevated border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    `bg-${role.color}/20 text-${role.color}`
                  )}>
                    {role.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{role.role}</CardTitle>
                    <CardDescription className="text-white/60">
                      {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {role.permissions.map((permission) => (
                    <div key={permission} className="text-sm text-white/80">
                      • {permission}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Admin Users Table */}
        <div className="liquid-glass-elevated rounded-2xl p-6 animate-liquid-morph" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Administrative Users</h3>
            <Button className="liquid-glass-surface hover:liquid-glass-elevated">
              <Plus className="w-4 h-4 mr-2" />
              Add Admin User
            </Button>
          </div>
          
          <AdminDataTable
            data={mockAdminUsers}
            columns={columns}
            actions={actions}
            filters={filters}
            searchPlaceholder="Search admin users by name, email..."
            isLoading={isLoading}
            onExport={() => console.log('Export admin users')}
          />
        </div>

        {/* Security Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5" />
                Two-Factor Auth
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage 2FA settings for all admin accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Configure 2FA
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Role Permissions
              </CardTitle>
              <CardDescription className="text-white/60">
                Define and manage role-based access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Manage Roles
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Session Management
              </CardTitle>
              <CardDescription className="text-white/60">
                Monitor and manage active admin sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                View Sessions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageChakraTheme>
  );
}