import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DemographicsData } from '@/hooks/useAnalyticsData';

interface DemographicsChartProps {
  data: DemographicsData;
  type: 'age' | 'gender';
}

export const DemographicsChart = ({ data, type }: DemographicsChartProps) => {
  const chartData = type === 'age' ? data.ageGroups : data.genders;
  const dataKey = type === 'age' ? 'age' : 'gender';

  const renderCustomLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  return (
    <ChartContainer config={{}} className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            nameKey={dataKey}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip 
            content={<ChartTooltipContent 
              formatter={(value, name) => [`${value}%`, name]}
            />}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};