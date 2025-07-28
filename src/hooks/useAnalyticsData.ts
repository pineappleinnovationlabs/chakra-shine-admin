import { useState, useEffect, useCallback } from 'react';

export interface AnalyticsTimeframe {
  value: '7d' | '30d' | '90d' | '1y';
  label: string;
}

export interface RevenueData {
  date: string;
  revenue: number;
  transactions: number;
  avgOrderValue: number;
}

export interface UserGrowthData {
  date: string;
  newUsers: number;
  activeUsers: number;
  retentionRate: number;
}

export interface BookingData {
  date: string;
  bookings: number;
  completions: number;
  cancellations: number;
  hour?: number;
  dayOfWeek?: string;
}

export interface DemographicsData {
  ageGroups: { age: string; value: number; color: string }[];
  genders: { gender: string; value: number; color: string }[];
  locations: { name: string; count: number; percentage: number }[];
}

export interface PerformanceMetrics {
  systemHealth: number;
  apiResponse: number;
  userSatisfaction: number;
  uptime: number;
}

export interface AnalyticsData {
  summary: {
    totalRevenue: number;
    revenueGrowth: number;
    totalUsers: number;
    userGrowth: number;
    totalBookings: number;
    bookingGrowth: number;
    avgRating: number;
    ratingChange: number;
  };
  revenue: RevenueData[];
  userGrowth: UserGrowthData[];
  bookings: BookingData[];
  hourlyBookings: BookingData[];
  demographics: DemographicsData;
  performance: PerformanceMetrics;
  recentActivity: Array<{
    type: string;
    count: number;
    timestamp: string;
    description: string;
  }>;
}

export const TIMEFRAMES: AnalyticsTimeframe[] = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: '1y', label: 'Last year' }
];

const generateMockAnalyticsData = (timeframe: string): AnalyticsData => {
  const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : timeframe === '90d' ? 90 : 365;
  const now = new Date();
  
  // Generate revenue data
  const revenue: RevenueData[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const baseRevenue = 1000 + Math.random() * 2000;
    const transactions = Math.floor(15 + Math.random() * 35);
    
    revenue.push({
      date: date.toISOString().split('T')[0],
      revenue: Math.round(baseRevenue),
      transactions,
      avgOrderValue: Math.round(baseRevenue / transactions)
    });
  }

  // Generate user growth data
  const userGrowth: UserGrowthData[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    userGrowth.push({
      date: date.toISOString().split('T')[0],
      newUsers: Math.floor(5 + Math.random() * 25),
      activeUsers: Math.floor(800 + Math.random() * 400),
      retentionRate: Math.round((75 + Math.random() * 20) * 10) / 10
    });
  }

  // Generate booking data
  const bookings: BookingData[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const totalBookings = Math.floor(30 + Math.random() * 50);
    const completions = Math.floor(totalBookings * (0.85 + Math.random() * 0.1));
    
    bookings.push({
      date: date.toISOString().split('T')[0],
      bookings: totalBookings,
      completions,
      cancellations: totalBookings - completions
    });
  }

  // Generate hourly booking patterns
  const hourlyBookings: BookingData[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const peakHours = [9, 10, 11, 14, 15, 16, 19, 20];
    const isPeak = peakHours.includes(hour);
    const baseBookings = isPeak ? 25 + Math.random() * 20 : 5 + Math.random() * 15;
    
    hourlyBookings.push({
      date: `${hour}:00`,
      hour,
      bookings: Math.floor(baseBookings),
      completions: Math.floor(baseBookings * 0.9),
      cancellations: Math.floor(baseBookings * 0.1)
    });
  }

  // Calculate summary metrics
  const totalRevenue = revenue.reduce((sum, day) => sum + day.revenue, 0);
  const totalUsers = userGrowth.reduce((sum, day) => sum + day.newUsers, 0);
  const totalBookings = bookings.reduce((sum, day) => sum + day.bookings, 0);
  
  const prevPeriodRevenue = totalRevenue * (0.85 + Math.random() * 0.3);
  const prevPeriodUsers = totalUsers * (0.8 + Math.random() * 0.4);
  const prevPeriodBookings = totalBookings * (0.9 + Math.random() * 0.2);

  return {
    summary: {
      totalRevenue,
      revenueGrowth: Math.round(((totalRevenue - prevPeriodRevenue) / prevPeriodRevenue) * 1000) / 10,
      totalUsers,
      userGrowth: Math.round(((totalUsers - prevPeriodUsers) / prevPeriodUsers) * 1000) / 10,
      totalBookings,
      bookingGrowth: Math.round(((totalBookings - prevPeriodBookings) / prevPeriodBookings) * 1000) / 10,
      avgRating: Math.round((4.2 + Math.random() * 0.6) * 10) / 10,
      ratingChange: Math.round((Math.random() - 0.5) * 10) / 10
    },
    revenue,
    userGrowth,
    bookings,
    hourlyBookings,
    demographics: {
      ageGroups: [
        { age: '18-24', value: 15, color: 'hsl(var(--chakra-root))' },
        { age: '25-34', value: 35, color: 'hsl(var(--chakra-sacral))' },
        { age: '35-44', value: 25, color: 'hsl(var(--chakra-solar))' },
        { age: '45-54', value: 15, color: 'hsl(var(--chakra-heart))' },
        { age: '55+', value: 10, color: 'hsl(var(--chakra-throat))' }
      ],
      genders: [
        { gender: 'Female', value: 55, color: 'hsl(var(--chakra-heart))' },
        { gender: 'Male', value: 40, color: 'hsl(var(--chakra-throat))' },
        { gender: 'Other', value: 5, color: 'hsl(var(--chakra-crown))' }
      ],
      locations: [
        { name: 'New York', count: 150, percentage: 12.0 },
        { name: 'Los Angeles', count: 120, percentage: 9.6 },
        { name: 'Chicago', count: 90, percentage: 7.2 },
        { name: 'Miami', count: 75, percentage: 6.0 },
        { name: 'San Francisco', count: 70, percentage: 5.6 }
      ]
    },
    performance: {
      systemHealth: Math.round((92 + Math.random() * 6) * 10) / 10,
      apiResponse: Math.round((150 + Math.random() * 100) * 10) / 10,
      userSatisfaction: Math.round((4.5 + Math.random() * 0.4) * 10) / 10,
      uptime: Math.round((99.5 + Math.random() * 0.4) * 100) / 100
    },
    recentActivity: [
      {
        type: 'user_registration',
        count: Math.floor(10 + Math.random() * 20),
        timestamp: new Date().toISOString(),
        description: 'New user registrations'
      },
      {
        type: 'booking_created',
        count: Math.floor(25 + Math.random() * 30),
        timestamp: new Date().toISOString(),
        description: 'New bookings created'
      },
      {
        type: 'practitioner_verified',
        count: Math.floor(2 + Math.random() * 5),
        timestamp: new Date().toISOString(),
        description: 'Practitioners verified'
      },
      {
        type: 'payment_processed',
        count: Math.floor(40 + Math.random() * 25),
        timestamp: new Date().toISOString(),
        description: 'Payments processed'
      }
    ]
  };
};

interface UseAnalyticsDataReturn {
  data: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
  timeframe: string;
  setTimeframe: (timeframe: string) => void;
  refetch: () => void;
  exportData: (format: 'pdf' | 'csv') => Promise<void>;
}

export const useAnalyticsData = (): UseAnalyticsDataReturn => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState('30d');

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const analyticsData = generateMockAnalyticsData(timeframe);
      setData(analyticsData);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Analytics data fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [timeframe]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const exportData = useCallback(async (format: 'pdf' | 'csv') => {
    if (!data) return;
    
    try {
      // Simulate export delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would generate and download the file
      const filename = `analytics-${timeframe}-${new Date().toISOString().split('T')[0]}.${format}`;
      console.log(`Exporting analytics data as ${filename}`);
      
      // Mock successful export
      return Promise.resolve();
    } catch (err) {
      console.error('Export error:', err);
      throw new Error(`Failed to export data as ${format.toUpperCase()}`);
    }
  }, [data, timeframe]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refetch, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  return {
    data,
    isLoading,
    error,
    timeframe,
    setTimeframe,
    refetch,
    exportData
  };
};