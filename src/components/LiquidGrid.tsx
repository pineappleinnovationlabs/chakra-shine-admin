import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface LiquidGridProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'masonry' | 'dynamic' | 'traditional';
  columns?: 2 | 3 | 4 | 5;
  children: React.ReactNode;
}

export const LiquidGrid = forwardRef<HTMLDivElement, LiquidGridProps>(
  ({ className, variant = 'dynamic', columns = 4, children, ...props }, ref) => {
    const getGridClasses = () => {
      switch (variant) {
        case 'masonry':
          return cn(
            "grid gap-6 auto-rows-min",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            columns === 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          );
        case 'dynamic':
          return cn(
            "liquid-grid gap-6",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          );
        case 'traditional':
        default:
          return cn(
            "grid gap-6",
            columns === 2 && "grid-cols-1 md:grid-cols-2",
            columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
            columns === 5 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(getGridClasses(), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGrid.displayName = "LiquidGrid";

interface LiquidGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large' | 'wide' | 'tall' | 'xl';
  featured?: boolean;
  children: React.ReactNode;
}

export const LiquidGridItem = forwardRef<HTMLDivElement, LiquidGridItemProps>(
  ({ className, size = 'medium', featured = false, children, ...props }, ref) => {
    const getSizeClasses = () => {
      switch (size) {
        case 'small':
          return "liquid-grid-item-small";
        case 'large':
          return "liquid-grid-item-large";
        case 'wide':
          return "liquid-grid-item-wide";
        case 'tall':
          return "liquid-grid-item-tall";
        case 'xl':
          return "liquid-grid-item-xl";
        case 'medium':
        default:
          return "liquid-grid-item-medium";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "liquid-grid-item",
          getSizeClasses(),
          featured && "liquid-grid-item-featured",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LiquidGridItem.displayName = "LiquidGridItem";