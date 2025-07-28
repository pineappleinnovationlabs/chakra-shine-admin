import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { RevenueData } from '@/hooks/useAnalyticsData';
import { format } from 'date-fns';

interface RevenueChartProps {
  data: RevenueData[];
  timeframe: string;
}

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chakra-solar))'
  },
  transactions: {
    label: 'Transactions',
    color: 'hsl(var(--chakra-heart))'
  }
};

export const RevenueChart = ({ data, timeframe }: RevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === '7d') return format(date, 'EEE');
    if (timeframe === '30d') return format(date, 'MMM d');
    if (timeframe === '90d') return format(date, 'MMM d');
    return format(date, 'MMM yyyy');
  };

  const formatTooltipValue = (value: number, name: string) => {
    if (name === 'revenue') {
      return [`$${value.toLocaleString()}`, 'Revenue'];
    }
    return [value.toLocaleString(), 'Transactions'];
  };

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chakra-solar))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chakra-solar))" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--chakra-heart))" stopOpacity={0.1}/>
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
            yAxisId="revenue"
            orientation="left"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <YAxis 
            yAxisId="transactions"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <ChartTooltip 
            content={<ChartTooltipContent 
              formatter={formatTooltipValue}
              labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
            />}
          />
          <Area
            yAxisId="revenue"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--chakra-solar))"
            strokeWidth={2}
            fill="url(#revenueGradient)"
            dot={{ fill: 'hsl(var(--chakra-solar))', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(var(--chakra-solar))' }}
          />
          <Area
            yAxisId="transactions"
            type="monotone"
            dataKey="transactions"
            stroke="hsl(var(--chakra-heart))"
            strokeWidth={2}
            fill="url(#transactionGradient)"
            dot={{ fill: 'hsl(var(--chakra-heart))', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(var(--chakra-heart))' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};