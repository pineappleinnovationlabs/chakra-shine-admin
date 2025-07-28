import { Users, Heart, Calendar, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { DashboardMetrics } from '@/hooks/useDashboardData';
import { cn } from '@/lib/utils';

interface DashboardPreviewProps {
  data: DashboardMetrics;
  className?: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const MetricCard = ({ title, value, subtitle, icon, trend, delay = 0 }: MetricCardProps) => {
  return (
    <GlassCard 
      className={cn(
        "p-6 animate-fade-slide-up hover:scale-105 transition-transform duration-300",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-white/70 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white font-display">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className="text-white/60 text-sm">{subtitle}</p>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.isPositive ? "text-chakra-heart" : "text-chakra-root"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          "bg-gradient-to-br from-chakra-crown/20 to-chakra-third-eye/20",
          "border border-white/10"
        )}>
          {icon}
        </div>
      </div>
    </GlassCard>
  );
};

export const DashboardPreview = ({ data, className }: DashboardPreviewProps) => {
  const metrics = [
    {
      title: "Total Users",
      value: data.users.total,
      subtitle: `${data.users.newToday} new today`,
      icon: <Users className="w-6 h-6 text-chakra-crown" />,
      trend: {
        value: data.users.growth,
        isPositive: data.users.growth > 0
      },
      delay: 0
    },
    {
      title: "Practitioners",
      value: data.practitioners.total,
      subtitle: `${data.practitioners.verified} verified`,
      icon: <Heart className="w-6 h-6 text-chakra-heart" />,
      trend: {
        value: ((data.practitioners.verified / data.practitioners.total) * 100),
        isPositive: true
      },
      delay: 150
    },
    {
      title: "Bookings Today",
      value: data.bookings.todayCount,
      subtitle: `${data.bookings.total.toLocaleString()} total`,
      icon: <Calendar className="w-6 h-6 text-chakra-solar" />,
      delay: 300
    },
    {
      title: "Revenue",
      value: `$${(data.revenue.thisMonth / 1000).toFixed(0)}K`,
      subtitle: "This month",
      icon: <DollarSign className="w-6 h-6 text-chakra-sacral" />,
      trend: {
        value: data.revenue.growth,
        isPositive: data.revenue.growth > 0
      },
      delay: 450
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-white font-display">Live Dashboard Preview</h3>
        <p className="text-white/60 text-sm">Real-time metrics from your admin portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-white/50 text-xs">
          Data updates every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};