import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BookingData } from '@/hooks/useAnalyticsData';

interface BookingPatternsChartProps {
  data: BookingData[];
  type: 'daily' | 'hourly';
}

const chartConfig = {
  bookings: {
    label: 'Total Bookings',
    color: 'hsl(var(--chakra-sacral))'
  },
  completions: {
    label: 'Completed',
    color: 'hsl(var(--chakra-heart))'
  },
  cancellations: {
    label: 'Cancelled',
    color: 'hsl(var(--chakra-root))'
  }
};

export const BookingPatternsChart = ({ data, type }: BookingPatternsChartProps) => {
  const formatXAxis = (value: string | number) => {
    if (type === 'hourly') {
      const hour = typeof value === 'string' ? parseInt(value) : value;
      if (hour === 0) return '12 AM';
      if (hour === 12) return '12 PM';
      if (hour < 12) return `${hour} AM`;
      return `${hour - 12} PM`;
    }
    return value.toString();
  };

  const getDataKey = () => {
    return type === 'hourly' ? 'hour' : 'date';
  };

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chakra-sacral))" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="hsl(var(--chakra-sacral))" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="completionsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="cancellationsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chakra-root))" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="hsl(var(--chakra-root))" stopOpacity={0.3}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey={getDataKey()}
            tickFormatter={formatXAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            interval={type === 'hourly' ? 2 : 'preserveStartEnd'}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
          />
          <Bar
            dataKey="bookings"
            fill="url(#bookingsGradient)"
            radius={[4, 4, 0, 0]}
            name="Total Bookings"
          />
          <Bar
            dataKey="completions"
            fill="url(#completionsGradient)"
            radius={[4, 4, 0, 0]}
            name="Completed"
          />
          <Bar
            dataKey="cancellations"
            fill="url(#cancellationsGradient)"
            radius={[4, 4, 0, 0]}
            name="Cancelled"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};