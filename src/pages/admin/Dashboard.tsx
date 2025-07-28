import { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  Calendar, 
  DollarSign, 
  Package, 
  Shield, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Clock,
  Star,
  AlertTriangle
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { useDashboardData } from '@/hooks/useDashboardData';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  chakra: 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  delay?: number;
}

function MetricCard({ title, value, subtitle, icon, chakra, trend, delay = 0 }: MetricCardProps) {
  return (
    <GlassCard 
      className={cn(
        "p-6 hover:scale-105 transition-all duration-300 animate-fade-slide-up relative overflow-hidden"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Chakra Orb */}
      <ChakraOrb 
        chakra={chakra} 
        size="lg" 
        className="absolute -top-4 -right-4 opacity-10" 
      />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <p className="text-white/70 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-white font-display">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
          </div>
          <div className={cn(
            "p-3 rounded-xl",
            `bg-gradient-to-br from-chakra-${chakra}/20 to-chakra-${chakra}/10`,
            "border border-white/10"
          )}>
            {icon}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white/60 text-sm">{subtitle}</p>
          {trend && (
            <div className={cn(
              "flex items-center gap-2 text-sm font-medium",
              trend.isPositive ? "text-chakra-heart" : "text-chakra-root"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}% {trend.label}
              </span>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

interface ActivityItem {
  id: string;
  type: 'user' | 'practitioner' | 'booking' | 'payment' | 'system';
  title: string;
  description: string;
  timestamp: string;
  severity?: 'info' | 'warning' | 'error';
}

function ActivityFeed() {
  const [activities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'user',
      title: 'New User Registration',
      description: 'Sarah Johnson joined as a new user',
      timestamp: '2 minutes ago',
      severity: 'info'
    },
    {
      id: '2',
      type: 'practitioner',
      title: 'Practitioner Verified',
      description: 'Dr. Michael Chen completed verification process',
      timestamp: '5 minutes ago',
      severity: 'info'
    },
    {
      id: '3',
      type: 'booking',
      title: 'Session Completed',
      description: 'Meditation session with Lisa Parker completed',
      timestamp: '12 minutes ago',
      severity: 'info'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Payment Processed',
      description: '$89 payment successfully processed',
      timestamp: '18 minutes ago',
      severity: 'info'
    },
    {
      id: '5',
      type: 'system',
      title: 'Security Alert',
      description: 'Unusual login activity detected',
      timestamp: '25 minutes ago',
      severity: 'warning'
    },
    {
      id: '6',
      type: 'booking',
      title: 'Session Cancelled',
      description: 'User cancelled upcoming meditation session',
      timestamp: '32 minutes ago',
      severity: 'warning'
    }
  ]);

  const getActivityIcon = (type: string, severity?: string) => {
    if (severity === 'warning') return <AlertTriangle className="w-4 h-4 text-chakra-solar" />;
    if (severity === 'error') return <AlertTriangle className="w-4 h-4 text-chakra-root" />;
    
    switch (type) {
      case 'user': return <Users className="w-4 h-4 text-chakra-heart" />;
      case 'practitioner': return <Heart className="w-4 h-4 text-chakra-throat" />;
      case 'booking': return <Calendar className="w-4 h-4 text-chakra-solar" />;
      case 'payment': return <DollarSign className="w-4 h-4 text-chakra-sacral" />;
      case 'system': return <Shield className="w-4 h-4 text-chakra-third-eye" />;
      default: return <Activity className="w-4 h-4 text-white/60" />;
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white font-display">Recent Activity</h3>
        <button className="text-chakra-crown hover:text-chakra-third-eye transition-colors text-sm">
          View All
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors animate-fade-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type, activity.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-white font-medium text-sm">{activity.title}</p>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-white/60 text-sm mt-1">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function QuickActions() {
  const actions = [
    {
      title: 'Verify Practitioner',
      description: '3 pending verifications',
      icon: <Heart className="w-5 h-5 text-chakra-throat" />,
      href: '/admin/practitioners',
      urgent: true
    },
    {
      title: 'Review Reports',
      description: '7 content reports',
      icon: <Shield className="w-5 h-5 text-chakra-third-eye" />,
      href: '/admin/moderation',
      urgent: false
    },
    {
      title: 'User Support',
      description: '12 open tickets',
      icon: <Users className="w-5 h-5 text-chakra-heart" />,
      href: '/admin/support',
      urgent: false
    },
    {
      title: 'System Health',
      description: 'All systems operational',
      icon: <Activity className="w-5 h-5 text-chakra-root" />,
      href: '/admin/system',
      urgent: false
    }
  ];

  return (
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold text-white font-display mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={action.title}
            className={cn(
              "p-4 rounded-lg text-left transition-all duration-300 hover:scale-105 animate-fade-slide-up",
              "bg-white/5 hover:bg-white/10 border border-white/10",
              action.urgent && "border-chakra-solar/50 bg-chakra-solar/10"
            )}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-center gap-3 mb-2">
              {action.icon}
              <span className="font-medium text-white">{action.title}</span>
              {action.urgent && (
                <span className="w-2 h-2 bg-chakra-solar rounded-full animate-pulse"></span>
              )}
            </div>
            <p className="text-white/60 text-sm">{action.description}</p>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData(true);

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <GlassCard key={i} className="p-6 animate-pulse">
              <div className="space-y-4">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-8 bg-white/10 rounded w-1/2"></div>
                <div className="h-4 bg-white/10 rounded w-full"></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <GlassCard className="p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-chakra-root mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Failed to load dashboard</h3>
        <p className="text-white/60">{error}</p>
      </GlassCard>
    );
  }

  const metrics = data ? [
    {
      title: "Total Users",
      value: data.users.total,
      subtitle: `${data.users.newToday} new today, ${data.users.active} active`,
      icon: <Users className="w-6 h-6 text-chakra-heart" />,
      chakra: 'heart' as const,
      trend: {
        value: data.users.growth,
        isPositive: data.users.growth > 0,
        label: 'this week'
      },
      delay: 0
    },
    {
      title: "Practitioners",
      value: data.practitioners.total,
      subtitle: `${data.practitioners.verified} verified, ${data.practitioners.pending} pending`,
      icon: <Heart className="w-6 h-6 text-chakra-throat" />,
      chakra: 'throat' as const,
      trend: {
        value: ((data.practitioners.verified / data.practitioners.total) * 100),
        isPositive: true,
        label: 'verified'
      },
      delay: 150
    },
    {
      title: "Bookings Today",
      value: data.bookings.todayCount,
      subtitle: `${data.bookings.completed} completed, ${data.bookings.upcoming} upcoming`,
      icon: <Calendar className="w-6 h-6 text-chakra-solar" />,
      chakra: 'solar' as const,
      delay: 300
    },
    {
      title: "Revenue",
      value: `$${(data.revenue.thisMonth / 1000).toFixed(0)}K`,
      subtitle: `$${data.revenue.total.toLocaleString()} total revenue`,
      icon: <DollarSign className="w-6 h-6 text-chakra-sacral" />,
      chakra: 'sacral' as const,
      trend: {
        value: data.revenue.growth,
        isPositive: data.revenue.growth > 0,
        label: 'this month'
      },
      delay: 450
    },
    {
      title: "Products",
      value: 234,
      subtitle: "12 new this week, 89% verified",
      icon: <Package className="w-6 h-6 text-chakra-root" />,
      chakra: 'root' as const,
      trend: {
        value: 5.2,
        isPositive: true,
        label: 'this week'
      },
      delay: 600
    },
    {
      title: "Security Events",
      value: 3,
      subtitle: "2 resolved, 1 pending review",
      icon: <Shield className="w-6 h-6 text-chakra-third-eye" />,
      chakra: 'third-eye' as const,
      delay: 750
    },
    {
      title: "User Satisfaction",
      value: "4.8",
      subtitle: "Based on 1,234 reviews this month",
      icon: <Star className="w-6 h-6 text-chakra-crown" />,
      chakra: 'crown' as const,
      trend: {
        value: 0.3,
        isPositive: true,
        label: 'improvement'
      },
      delay: 900
    },
    {
      title: "System Health",
      value: "99.9%",
      subtitle: "Uptime this month, all systems operational",
      icon: <Activity className="w-6 h-6 text-chakra-heart" />,
      chakra: 'heart' as const,
      delay: 1050
    }
  ] : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-fade-slide-up">
        <h1 className="text-3xl font-bold text-white font-display mb-2">
          Welcome to your Admin Dashboard
        </h1>
        <p className="text-white/60">
          Monitor and manage your Klear Karma platform with real-time insights and powerful tools.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Activity Feed - Takes 2 columns */}
        <div className="xl:col-span-2">
          <ActivityFeed />
        </div>
        
        {/* Quick Actions - Takes 1 column */}
        <div>
          <QuickActions />
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-white/40 text-sm animate-fade-slide-up" style={{ animationDelay: '1200ms' }}>
        <p>Last updated: {new Date().toLocaleString()} • Auto-refresh every 30 seconds</p>
      </div>
    </div>
  );
}