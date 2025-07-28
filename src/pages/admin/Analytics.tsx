import { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Star,
  RefreshCw,
  Download,
  Filter,
  Activity,
  Globe,
  Target
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalyticsData, TIMEFRAMES } from '@/hooks/useAnalyticsData';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { UserGrowthChart } from '@/components/charts/UserGrowthChart';
import { BookingPatternsChart } from '@/components/charts/BookingPatternsChart';
import { DemographicsChart } from '@/components/charts/DemographicsChart';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { toast } from 'sonner';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  chakra: string;
  isLoading?: boolean;
}

const MetricCard = ({ title, value, change, icon, chakra, isLoading }: MetricCardProps) => {
  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="w-12 h-12 rounded-full" />
        </div>
      </GlassCard>
    );
  }

  const isPositive = change >= 0;
  
  return (
    <GlassCard className="p-6 group hover:scale-105 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`text-sm mt-1 flex items-center gap-1 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${!isPositive ? 'rotate-180' : ''}`} />
            {Math.abs(change)}% {isPositive ? 'growth' : 'decline'}
          </p>
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-br ${chakra} bg-opacity-20 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
    </GlassCard>
  );
};

export default function Analytics() {
  const { data, isLoading, error, timeframe, setTimeframe, refetch, exportData } = useAnalyticsData();
  const [isExporting, setIsExporting] = useState(false);
  const [chartView, setChartView] = useState<'daily' | 'hourly'>('daily');

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    try {
      await exportData(format);
      toast.success(`Analytics data exported as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to export data`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = () => {
    refetch();
    toast.success('Analytics data refreshed');
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <ChakraOrb chakra="third-eye" size="md" className="opacity-80" />
              <BarChart3 className="w-8 h-8 text-white absolute inset-0 m-auto" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-display">Analytics Dashboard</h1>
              <p className="text-white/60">Deep insights and reporting for your platform</p>
            </div>
          </div>
        </div>
        
        <GlassCard className="p-12 text-center">
          <div className="text-red-400 mb-4">
            <BarChart3 className="w-16 h-16 mx-auto opacity-50" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Error Loading Analytics</h2>
          <p className="text-white/60 mb-6">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="third-eye" size="md" className="opacity-80" />
            <BarChart3 className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Analytics Dashboard</h1>
            <p className="text-white/60">Deep insights and reporting for your platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIMEFRAMES.map((tf) => (
                <SelectItem key={tf.value} value={tf.value}>
                  {tf.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleExport('csv')}
            disabled={isExporting || isLoading}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <MetricCard
          title="Total Revenue"
          value={data?.summary.totalRevenue ? `$${(data.summary.totalRevenue / 1000).toFixed(0)}k` : '$0'}
          change={data?.summary.revenueGrowth || 0}
          icon={<DollarSign className="w-6 h-6 text-chakra-solar" />}
          chakra="from-chakra-solar to-chakra-sacral"
          isLoading={isLoading}
        />
        <MetricCard
          title="Total Users"
          value={data?.summary.totalUsers || 0}
          change={data?.summary.userGrowth || 0}
          icon={<Users className="w-6 h-6 text-chakra-heart" />}
          chakra="from-chakra-heart to-chakra-throat"
          isLoading={isLoading}
        />
        <MetricCard
          title="Total Bookings"
          value={data?.summary.totalBookings || 0}
          change={data?.summary.bookingGrowth || 0}
          icon={<Calendar className="w-6 h-6 text-chakra-sacral" />}
          chakra="from-chakra-sacral to-chakra-root"
          isLoading={isLoading}
        />
        <MetricCard
          title="Avg Rating"
          value={data?.summary.avgRating || 0}
          change={data?.summary.ratingChange || 0}
          icon={<Star className="w-6 h-6 text-chakra-crown" />}
          chakra="from-chakra-crown to-chakra-third-eye"
          isLoading={isLoading}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
        {/* Revenue Chart */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chakra-solar bg-opacity-20">
                <DollarSign className="w-5 h-5 text-chakra-solar" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Revenue Trends</h3>
                <p className="text-white/60 text-sm">Revenue and transaction patterns</p>
              </div>
            </div>
            <Badge variant="outline" className="text-chakra-solar border-chakra-solar">
              {timeframe.toUpperCase()}
            </Badge>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <RevenueChart data={data.revenue} timeframe={timeframe} />
          ) : null}
        </GlassCard>

        {/* User Growth Chart */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chakra-heart bg-opacity-20">
                <Users className="w-5 h-5 text-chakra-heart" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">User Growth</h3>
                <p className="text-white/60 text-sm">New users and retention metrics</p>
              </div>
            </div>
            <Badge variant="outline" className="text-chakra-heart border-chakra-heart">
              Active
            </Badge>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <UserGrowthChart data={data.userGrowth} timeframe={timeframe} />
          ) : null}
        </GlassCard>

        {/* Booking Patterns Chart */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chakra-sacral bg-opacity-20">
                <Calendar className="w-5 h-5 text-chakra-sacral" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Booking Patterns</h3>
                <p className="text-white/60 text-sm">
                  {chartView === 'daily' ? 'Daily booking trends' : 'Hourly distribution'}
                </p>
              </div>
            </div>
            <Select value={chartView} onValueChange={(value: 'daily' | 'hourly') => setChartView(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <BookingPatternsChart 
              data={chartView === 'daily' ? data.bookings : data.hourlyBookings} 
              type={chartView}
            />
          ) : null}
        </GlassCard>

        {/* Performance Metrics */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chakra-third-eye bg-opacity-20">
                <Activity className="w-5 h-5 text-chakra-third-eye" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">System Performance</h3>
                <p className="text-white/60 text-sm">Health and performance metrics</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              Healthy
            </Badge>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <PerformanceChart data={data.performance} />
          ) : null}
        </GlassCard>
      </div>

      {/* Demographics and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-slide-up" style={{ animationDelay: '450ms' }}>
        {/* Age Demographics */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-chakra-crown bg-opacity-20">
              <Target className="w-5 h-5 text-chakra-crown" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Age Groups</h3>
              <p className="text-white/60 text-sm">User demographics by age</p>
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <DemographicsChart data={data.demographics} type="age" />
          ) : null}
        </GlassCard>

        {/* Gender Demographics */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-chakra-throat bg-opacity-20">
              <Users className="w-5 h-5 text-chakra-throat" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Gender Split</h3>
              <p className="text-white/60 text-sm">User demographics by gender</p>
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-80 w-full" />
          ) : data ? (
            <DemographicsChart data={data.demographics} type="gender" />
          ) : null}
        </GlassCard>

        {/* Real-time Activity */}
        <GlassCard className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-chakra-root bg-opacity-20">
              <Activity className="w-5 h-5 text-chakra-root" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Activity</h3>
              <p className="text-white/60 text-sm">Real-time platform events</p>
            </div>
          </div>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))
            ) : data ? (
              data.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-chakra-root to-chakra-crown flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{activity.count}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{activity.description}</p>
                    <p className="text-white/60 text-xs">Just now</p>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </GlassCard>
      </div>

      {/* Top Locations */}
      {data && (
        <GlassCard className="p-6 animate-fade-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-chakra-heart bg-opacity-20">
              <Globe className="w-5 h-5 text-chakra-heart" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Top Locations</h3>
              <p className="text-white/60 text-sm">Geographic distribution of users</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.demographics.locations.map((location, index) => (
              <div key={location.name} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{location.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-white">{location.count}</p>
                <p className="text-white/60 text-sm">{location.percentage}% of users</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}