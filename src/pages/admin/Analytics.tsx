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
import { LiquidGrid, LiquidGridItem } from '@/components/LiquidGrid';
import { ChakraEnergyFlow } from '@/components/ChakraEnergyFlow';
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
      <GlassCard className="glass-card-surface p-6 contextual-blur-light">
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
    <GlassCard className="glass-card-elevated p-6 group liquid-hover liquid-pressure contextual-blur-medium relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${chakra} opacity-10 animate-liquid-flow`}></div>
      </div>
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-white/60 text-sm font-medium tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white mt-1 font-display">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`text-sm mt-2 flex items-center gap-1 ${
            isPositive ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            <TrendingUp className={`w-3 h-3 ${!isPositive ? 'rotate-180' : ''}`} />
            {Math.abs(change)}% {isPositive ? 'growth' : 'decline'}
          </p>
        </div>
        <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${chakra} bg-opacity-20 group-hover:scale-110 transition-all duration-500`}>
          {icon}
          <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

      {/* Key Metrics - Dynamic Grid */}
      <LiquidGrid variant="dynamic" className="animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <LiquidGridItem size="medium">
          <MetricCard
            title="Total Revenue"
            value={data?.summary.totalRevenue ? `$${(data.summary.totalRevenue / 1000).toFixed(0)}k` : '$0'}
            change={data?.summary.revenueGrowth || 0}
            icon={<DollarSign className="w-6 h-6 text-chakra-solar" />}
            chakra="from-chakra-solar to-chakra-sacral"
            isLoading={isLoading}
          />
        </LiquidGridItem>
        
        <LiquidGridItem size="wide" featured>
          <MetricCard
            title="Total Users"
            value={data?.summary.totalUsers || 0}
            change={data?.summary.userGrowth || 0}
            icon={<Users className="w-6 h-6 text-chakra-heart" />}
            chakra="from-chakra-heart to-chakra-throat"
            isLoading={isLoading}
          />
        </LiquidGridItem>
        
        <LiquidGridItem size="medium">
          <MetricCard
            title="Total Bookings"
            value={data?.summary.totalBookings || 0}
            change={data?.summary.bookingGrowth || 0}
            icon={<Calendar className="w-6 h-6 text-chakra-sacral" />}
            chakra="from-chakra-sacral to-chakra-root"
            isLoading={isLoading}
          />
        </LiquidGridItem>
        
        <LiquidGridItem size="tall">
          <MetricCard
            title="Avg Rating"
            value={data?.summary.avgRating || 0}
            change={data?.summary.ratingChange || 0}
            icon={<Star className="w-6 h-6 text-chakra-crown" />}
            chakra="from-chakra-crown to-chakra-third-eye"
            isLoading={isLoading}
          />
        </LiquidGridItem>
      </LiquidGrid>

      {/* Background Energy Flow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ChakraEnergyFlow 
          nodes={[
            { id: 'revenue', chakra: 'solar', x: 20, y: 25, active: !!data?.summary.totalRevenue },
            { id: 'users', chakra: 'heart', x: 40, y: 35, active: !!data?.summary.totalUsers },
            { id: 'bookings', chakra: 'sacral', x: 60, y: 25, active: !!data?.summary.totalBookings },
            { id: 'rating', chakra: 'crown', x: 80, y: 35, active: !!data?.summary.avgRating },
            { id: 'performance', chakra: 'third-eye', x: 30, y: 70, active: !!data?.performance },
            { id: 'activity', chakra: 'throat', x: 70, y: 70, active: !!data?.recentActivity?.length },
          ]}
          connections={true}
          animated={true}
          className="opacity-20"
        />
      </div>

      {/* Charts Grid - Liquid Layout */}
      <LiquidGrid variant="masonry" columns={3} className="animate-fade-slide-up relative z-10" style={{ animationDelay: '300ms' }}>
        <LiquidGridItem size="wide">
          <GlassCard className="glass-card-elevated p-6 contextual-blur-medium">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-chakra-solar bg-opacity-20 animate-energy-pulse">
                  <DollarSign className="w-6 h-6 text-chakra-solar" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-display">Revenue Trends</h3>
                  <p className="text-white/60 text-sm">Revenue and transaction patterns</p>
                </div>
              </div>
              <Badge variant="outline" className="text-chakra-solar border-chakra-solar bg-chakra-solar/10">
                {timeframe.toUpperCase()}
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-80 w-full rounded-xl" />
            ) : data ? (
              <RevenueChart data={data.revenue} timeframe={timeframe} />
            ) : null}
          </GlassCard>
        </LiquidGridItem>

        <LiquidGridItem size="large">
          <GlassCard className="glass-card-floating p-6 contextual-blur-heavy">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-chakra-heart bg-opacity-20 animate-energy-pulse">
                  <Users className="w-6 h-6 text-chakra-heart" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-display">User Growth</h3>
                  <p className="text-white/60 text-sm">New users and retention metrics</p>
                </div>
              </div>
              <Badge variant="outline" className="text-chakra-heart border-chakra-heart bg-chakra-heart/10">
                Active
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-80 w-full rounded-xl" />
            ) : data ? (
              <UserGrowthChart data={data.userGrowth} timeframe={timeframe} />
            ) : null}
          </GlassCard>
        </LiquidGridItem>

        <LiquidGridItem size="medium">
          <GlassCard className="glass-card-elevated p-6 contextual-blur-medium">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-chakra-sacral bg-opacity-20 animate-energy-pulse">
                  <Calendar className="w-6 h-6 text-chakra-sacral" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-display">Booking Patterns</h3>
                  <p className="text-white/60 text-sm">
                    {chartView === 'daily' ? 'Daily booking trends' : 'Hourly distribution'}
                  </p>
                </div>
              </div>
              <Select value={chartView} onValueChange={(value: 'daily' | 'hourly') => setChartView(value)}>
                <SelectTrigger className="w-28 glass-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card-floating">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <Skeleton className="h-80 w-full rounded-xl" />
            ) : data ? (
              <BookingPatternsChart 
                data={chartView === 'daily' ? data.bookings : data.hourlyBookings} 
                type={chartView}
              />
            ) : null}
          </GlassCard>
        </LiquidGridItem>

        <LiquidGridItem size="medium">
          <GlassCard className="glass-card-modal p-6 contextual-blur-heavy">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-chakra-third-eye bg-opacity-20 animate-energy-pulse">
                  <Activity className="w-6 h-6 text-chakra-third-eye" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white font-display">System Performance</h3>
                  <p className="text-white/60 text-sm">Health and performance metrics</p>
                </div>
              </div>
              <Badge variant="outline" className="text-emerald-400 border-emerald-400 bg-emerald-400/10">
                Healthy
              </Badge>
            </div>
            {isLoading ? (
              <Skeleton className="h-80 w-full rounded-xl" />
            ) : data ? (
              <PerformanceChart data={data.performance} />
            ) : null}
          </GlassCard>
        </LiquidGridItem>
      </LiquidGrid>

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