import { cn } from "@/lib/utils";
import { ChakraOrb } from "@/components/ChakraOrb";
import { TrendingUp, TrendingDown } from "lucide-react";

type ChakraType = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';

interface MetricData {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  chakra: ChakraType;
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'featured';
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  delay?: number;
  urgent?: boolean;
}

interface LiquidMetricGridProps {
  metrics: MetricData[];
  columns?: 2 | 3 | 4 | 5;
  variant?: 'masonry' | 'dynamic' | 'traditional';
  className?: string;
}

function LiquidMetricCard({ metric }: { metric: MetricData }) {
  const { title, value, subtitle, icon, chakra, size = 'medium', trend, delay = 0, urgent } = metric;
  
  return (
    <div 
      className={cn(
        "liquid-grid-item group relative overflow-hidden",
        `liquid-grid-item-${size}`,
        size === 'featured' && "liquid-grid-item-featured",
        urgent && "liquid-urgent-glow",
        "animate-fade-in liquid-hover"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background Chakra Energy */}
      <ChakraOrb 
        chakra={chakra} 
        size="xl" 
        className="absolute -top-8 -right-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700" 
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2 flex-1">
            <p className="liquid-typography-tertiary text-white/70">{title}</p>
            <div className={cn(
              "liquid-typography-primary font-bold text-white font-display",
              size === 'featured' ? "text-4xl" : size === 'large' ? "text-3xl" : "text-2xl"
            )}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
          </div>
          
          {/* Icon Container */}
          <div className={cn(
            "liquid-glass-elevated rounded-xl p-3 group-hover:scale-105",
            "transition-all duration-300"
          )}>
            <div className={cn(
              `text-chakra-${chakra}`,
              size === 'featured' ? "w-8 h-8" : "w-6 h-6"
            )}>
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="liquid-typography-secondary text-white/60">{subtitle}</p>
          
          {/* Trend Indicator */}
          {trend && (
            <div className={cn(
              "flex items-center gap-2 liquid-typography-tertiary font-medium",
              "liquid-glass-surface rounded-lg px-3 py-2",
              trend.isPositive ? "text-chakra-heart" : "text-chakra-root"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}% {trend.label}
              </span>
            </div>
          )}
          
          {/* Urgent Indicator */}
          {urgent && (
            <div className="flex items-center gap-2 text-chakra-solar liquid-typography-tertiary">
              <div className="w-2 h-2 bg-chakra-solar rounded-full" />
              <span>Requires attention</span>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export const LiquidMetricGrid = ({ 
  metrics, 
  columns = 4, 
  variant = 'dynamic',
  className 
}: LiquidMetricGridProps) => {
  return (
    <div className={cn(
      "liquid-grid",
      `liquid-grid-cols-${columns}`,
      `liquid-grid-${variant}`,
      "animate-fade-slide-up",
      className
    )}>
      {metrics.map((metric) => (
        <LiquidMetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
};