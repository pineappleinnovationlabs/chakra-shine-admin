import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { UserGrowthData } from '@/hooks/useAnalyticsData';
import { format } from 'date-fns';

interface UserGrowthChartProps {
  data: UserGrowthData[];
  timeframe: string;
}

const chartConfig = {
  newUsers: {
    label: 'New Users',
    color: 'hsl(var(--chakra-heart))'
  },
  activeUsers: {
    label: 'Active Users',
    color: 'hsl(var(--chakra-throat))'
  },
  retentionRate: {
    label: 'Retention Rate',
    color: 'hsl(var(--chakra-crown))'
  }
};

export const UserGrowthChart = ({ data, timeframe }: UserGrowthChartProps) => {
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === '7d') return format(date, 'EEE');
    if (timeframe === '30d') return format(date, 'MMM d');
    if (timeframe === '90d') return format(date, 'MMM d');
    return format(date, 'MMM yyyy');
  };

  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'retentionRate') {
      return [`${value}%`, 'Retention Rate'];
    }
    return [value.toLocaleString(), name === 'newUsers' ? 'New Users' : 'Active Users'];
  };

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="newUsersGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="activeUsersGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chakra-throat))" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="hsl(var(--chakra-throat))" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tickFormatter={formatXAxis}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="users"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <YAxis 
            yAxisId="retention"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip 
            content={<ChartTooltipContent 
              formatter={formatTooltipValue}
              labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
            />}
          />
          <Line
            yAxisId="users"
            type="monotone"
            dataKey="newUsers"
            stroke="hsl(var(--chakra-heart))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--chakra-heart))', strokeWidth: 0, r: 5 }}
            activeDot={{ r: 7, fill: 'hsl(var(--chakra-heart))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            filter="url(#newUsersGlow)"
          />
          <Line
            yAxisId="users"
            type="monotone"
            dataKey="activeUsers"
            stroke="hsl(var(--chakra-throat))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--chakra-throat))', strokeWidth: 0, r: 5 }}
            activeDot={{ r: 7, fill: 'hsl(var(--chakra-throat))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
            filter="url(#activeUsersGlow)"
          />
          <Line
            yAxisId="retention"
            type="monotone"
            dataKey="retentionRate"
            stroke="hsl(var(--chakra-crown))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: 'hsl(var(--chakra-crown))', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(var(--chakra-crown))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};