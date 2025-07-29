import { useState } from 'react';
import { Shield, Activity, Clock, AlertTriangle, User, Database, Lock, Eye, AlertCircle, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { LiquidPageHeader } from '@/components/liquid/LiquidPageHeader';
import { LiquidMetricGrid } from '@/components/liquid/LiquidMetricGrid';
import { PageChakraTheme } from '@/components/liquid/PageChakraTheme';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuditEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  ipAddress: string;
  userAgent: string;
  details: string;
  status: 'success' | 'failed' | 'pending';
}

const mockAuditEvents: AuditEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-27 14:30:25',
    user: 'admin@klearkarma.com',
    action: 'User Login',
    resource: 'Authentication',
    severity: 'info',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'Successful login from trusted IP',
    status: 'success'
  },
  {
    id: '2',
    timestamp: '2024-01-27 14:25:18',
    user: 'sarah.johnson@example.com',
    action: 'Content Published',
    resource: 'Blog Post',
    severity: 'info',
    ipAddress: '203.45.67.89',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    details: 'Published "7 Chakras Meditation Guide"',
    status: 'success'
  },
  {
    id: '3',
    timestamp: '2024-01-27 14:20:42',
    user: 'unknown@example.com',
    action: 'Failed Login Attempt',
    resource: 'Authentication',
    severity: 'warning',
    ipAddress: '45.67.89.123',
    userAgent: 'Mozilla/5.0 (Unknown)',
    details: 'Multiple failed login attempts detected',
    status: 'failed'
  },
  {
    id: '4',
    timestamp: '2024-01-27 14:15:33',
    user: 'admin@klearkarma.com',
    action: 'Settings Modified',
    resource: 'System Configuration',
    severity: 'info',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    details: 'Updated email notification settings',
    status: 'success'
  },
  {
    id: '5',
    timestamp: '2024-01-27 14:10:15',
    user: 'michael.chen@example.com',
    action: 'Data Export',
    resource: 'User Data',
    severity: 'warning',
    ipAddress: '98.76.54.32',
    userAgent: 'Mozilla/5.0 (Linux; Android 11)',
    details: 'Exported user analytics data',
    status: 'success'
  },
  {
    id: '6',
    timestamp: '2024-01-27 14:05:27',
    user: 'system@klearkarma.com',
    action: 'Database Backup',
    resource: 'System',
    severity: 'info',
    ipAddress: '127.0.0.1',
    userAgent: 'System/1.0',
    details: 'Automated daily backup completed',
    status: 'success'
  },
  {
    id: '7',
    timestamp: '2024-01-27 14:00:08',
    user: 'unknown@example.com',
    action: 'Suspicious Activity',
    resource: 'Security',
    severity: 'error',
    ipAddress: '185.67.43.21',
    userAgent: 'Mozilla/5.0 (Unknown)',
    details: 'Attempted access to restricted admin area',
    status: 'failed'
  }
];

function SeverityBadge({ severity }: { severity: AuditEvent['severity'] }) {
  const config = {
    info: { 
      label: 'Info', 
      className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: <Activity className="w-3 h-3" />
    },
    warning: { 
      label: 'Warning', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
      icon: <AlertTriangle className="w-3 h-3" />
    },
    error: { 
      label: 'Error', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <XCircle className="w-3 h-3" />
    },
    critical: { 
      label: 'Critical', 
      className: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: <AlertCircle className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[severity];
  return (
    <Badge variant="outline" className={cn("text-xs flex items-center gap-1", className)}>
      {icon}
      {label}
    </Badge>
  );
}

function StatusBadge({ status }: { status: AuditEvent['status'] }) {
  const config = {
    success: { 
      label: 'Success', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    failed: { 
      label: 'Failed', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <XCircle className="w-3 h-3" />
    },
    pending: { 
      label: 'Pending', 
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      icon: <Clock className="w-3 h-3" />
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

export default function AuditLogs() {
  const [isLoading] = useState(false);

  const columns: TableColumn<AuditEvent>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      render: (timestamp) => (
        <div className="text-sm">
          <div className="text-white">{new Date(timestamp).toLocaleDateString()}</div>
          <div className="text-white/60">{new Date(timestamp).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'user',
      label: 'User',
      sortable: true,
      render: (user) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-chakra-throat/20 flex items-center justify-center">
            <User className="w-3 h-3 text-chakra-throat" />
          </div>
          <span className="text-white text-sm">{user}</span>
        </div>
      )
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (action) => <span className="text-white font-medium">{action}</span>
    },
    {
      key: 'resource',
      label: 'Resource',
      sortable: true,
      render: (resource) => <span className="text-white/80">{resource}</span>
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (severity) => <SeverityBadge severity={severity} />
    },
    {
      key: 'ipAddress',
      label: 'IP Address',
      sortable: true,
      render: (ip) => <span className="text-white/60 font-mono text-sm">{ip}</span>
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
    }
  ];

  const actions: TableAction<AuditEvent>[] = [
    {
      id: 'view',
      label: 'View Details',
      icon: <Eye className="w-4 h-4" />,
      onClick: (event) => console.log('View event details:', event.id),
    },
    {
      id: 'investigate',
      label: 'Investigate',
      icon: <Shield className="w-4 h-4" />,
      onClick: (event) => console.log('Investigate event:', event.id),
      show: (event) => event.severity === 'error' || event.severity === 'critical'
    }
  ];

  const filters = [
    {
      key: 'severity',
      label: 'Filter by Severity',
      options: [
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'critical', label: 'Critical' }
      ]
    },
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'success', label: 'Success' },
        { value: 'failed', label: 'Failed' },
        { value: 'pending', label: 'Pending' }
      ]
    }
  ];

  const metrics = [
    {
      id: 'total-events',
      title: 'Total Events',
      value: 1247,
      subtitle: 'Audit events today',
      icon: <Activity className="w-6 h-6" />,
      chakra: 'third-eye' as const,
      size: 'featured' as const,
      trend: { value: 12.3, isPositive: true, label: 'this hour' },
      delay: 0
    },
    {
      id: 'security-alerts',
      title: 'Security Alerts',
      value: 3,
      subtitle: 'Requires attention',
      icon: <AlertTriangle className="w-6 h-6" />,
      chakra: 'solar' as const,
      size: 'medium' as const,
      trend: { value: -25, isPositive: true, label: 'reduction' },
      delay: 150
    },
    {
      id: 'failed-attempts',
      title: 'Failed Attempts',
      value: 8,
      subtitle: 'Blocked login attempts',
      icon: <Lock className="w-6 h-6" />,
      chakra: 'root' as const,
      size: 'medium' as const,
      trend: { value: -15, isPositive: true, label: 'decrease' },
      delay: 300
    },
    {
      id: 'active-sessions',
      title: 'Active Sessions',
      value: 45,
      subtitle: 'Current user sessions',
      icon: <User className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'wide' as const,
      trend: { value: 8.5, isPositive: true, label: 'increase' },
      delay: 450
    }
  ];

  const securitySummary = [
    {
      title: 'High Severity Events',
      value: 2,
      icon: <AlertCircle className="w-5 h-5 text-chakra-root" />,
      color: 'chakra-root'
    },
    {
      title: 'Suspicious IPs',
      value: 5,
      icon: <Shield className="w-5 h-5 text-chakra-third-eye" />,
      color: 'chakra-third-eye'
    },
    {
      title: 'Failed Logins',
      value: 12,
      icon: <Lock className="w-5 h-5 text-chakra-solar" />,
      color: 'chakra-solar'
    },
    {
      title: 'Data Exports',
      value: 3,
      icon: <Database className="w-5 h-5 text-chakra-throat" />,
      color: 'chakra-throat'
    }
  ];

  return (
    <PageChakraTheme chakra="third-eye">
      <div className="space-y-8">
        {/* Liquid Header */}
        <LiquidPageHeader
          title="Audit Logs"
          subtitle="Monitor security events, user activities, and system access with detailed audit trails"
          icon={<Shield className="w-8 h-8" />}
          chakra="third-eye"
        />

        {/* Liquid Metrics Grid */}
        <LiquidMetricGrid 
          metrics={metrics}
          columns={2}
          variant="dynamic"
        />

        {/* Security Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securitySummary.map((item) => (
            <Card key={item.title} className="liquid-glass-elevated border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    `bg-${item.color}/20 text-${item.color}`
                  )}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-sm text-white/60">{item.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audit Events Table */}
        <div className="liquid-glass-elevated rounded-2xl p-6 animate-liquid-morph" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Audit Events</h3>
            <Button className="liquid-glass-surface hover:liquid-glass-elevated">
              <Shield className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
          
          <AdminDataTable
            data={mockAuditEvents}
            columns={columns}
            actions={actions}
            filters={filters}
            searchPlaceholder="Search events by user, action, IP..."
            isLoading={isLoading}
            onExport={() => console.log('Export audit logs')}
          />
        </div>

        {/* Security Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Dashboard
              </CardTitle>
              <CardDescription className="text-white/60">
                Real-time security monitoring and threat detection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                View Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Access Control
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage user permissions and access policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Manage Access
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Protection
              </CardTitle>
              <CardDescription className="text-white/60">
                Configure data encryption and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Configure Protection
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageChakraTheme>
  );
}