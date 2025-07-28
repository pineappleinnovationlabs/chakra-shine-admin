import { useState, useEffect, useCallback } from 'react';

export interface DashboardMetrics {
  users: {
    total: number;
    active: number;
    newToday: number;
    newThisWeek: number;
    growth: number;
  };
  practitioners: {
    total: number;
    verified: number;
    pending: number;
    newThisWeek: number;
  };
  bookings: {
    total: number;
    completed: number;
    upcoming: number;
    todayCount: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    growth: number;
  };
}

interface UseDashboardDataReturn {
  data: DashboardMetrics | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Mock dashboard data that simulates real-time updates
const generateMockData = (): DashboardMetrics => {
  const baseDate = Date.now();
  const randomVariation = () => Math.floor(Math.random() * 10) - 5; // -5 to +5 variation

  return {
    users: {
      total: 24567 + randomVariation(),
      active: 18234 + randomVariation(),
      newToday: 89 + Math.floor(Math.random() * 20),
      newThisWeek: 634 + randomVariation(),
      growth: 12.3 + (Math.random() * 2 - 1) // 11.3 to 13.3
    },
    practitioners: {
      total: 1456 + randomVariation(),
      verified: 1289 + randomVariation(),
      pending: 167 + randomVariation(),
      newThisWeek: 23 + Math.floor(Math.random() * 10)
    },
    bookings: {
      total: 45789 + randomVariation(),
      completed: 42134 + randomVariation(),
      upcoming: 3655 + randomVariation(),
      todayCount: 156 + Math.floor(Math.random() * 50)
    },
    revenue: {
      total: 892456 + randomVariation() * 100,
      thisMonth: 89234 + randomVariation() * 100,
      lastMonth: 76543 + randomVariation() * 100,
      growth: 16.7 + (Math.random() * 4 - 2) // 14.7 to 18.7
    }
  };
};

export const useDashboardData = (autoRefresh: boolean = true): UseDashboardDataReturn => {
  const [data, setData] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockData = generateMockData();
      setData(mockData);
    } catch (err) {
      const errorMessage = 'Failed to fetch dashboard data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch
  };
};