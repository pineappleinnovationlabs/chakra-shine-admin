import { Cell, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PerformanceMetrics } from '@/hooks/useAnalyticsData';

interface PerformanceChartProps {
  data: PerformanceMetrics;
}

const chartConfig = {
  systemHealth: {
    label: 'System Health',
    color: 'hsl(var(--chakra-heart))'
  },
  apiResponse: {
    label: 'API Response',
    color: 'hsl(var(--chakra-throat))'
  },
  userSatisfaction: {
    label: 'User Satisfaction',
    color: 'hsl(var(--chakra-crown))'
  },
  uptime: {
    label: 'Uptime',
    color: 'hsl(var(--chakra-solar))'
  }
};

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const chartData = [
    {
      name: 'System Health',
      value: data.systemHealth,
      fill: 'hsl(var(--chakra-heart))'
    },
    {
      name: 'API Response',
      value: (300 - data.apiResponse) / 300 * 100, // Convert to percentage (lower is better)
      fill: 'hsl(var(--chakra-throat))'
    },
    {
      name: 'User Satisfaction',
      value: (data.userSatisfaction / 5) * 100,
      fill: 'hsl(var(--chakra-crown))'
    },
    {
      name: 'Uptime',
      value: data.uptime,
      fill: 'hsl(var(--chakra-solar))'
    }
  ];

  return (
    <ChartContainer config={chartConfig} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="80%"
          data={chartData}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar
            background={{ fill: 'hsl(var(--muted) / 0.3)' }}
            dataKey="value"
            cornerRadius={4}
          />
          <ChartTooltip 
            content={<ChartTooltipContent 
              formatter={(value, name) => {
                if (name === 'API Response') {
                  const actualValue = 300 - (value as number * 300 / 100);
                  return [`${actualValue.toFixed(0)}ms`, 'API Response Time'];
                }
                if (name === 'User Satisfaction') {
                  const actualValue = (value as number * 5 / 100);
                  return [`${actualValue.toFixed(1)}/5`, 'User Satisfaction'];
                }
                return [`${(value as number).toFixed(1)}%`, name];
              }}
            />}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};