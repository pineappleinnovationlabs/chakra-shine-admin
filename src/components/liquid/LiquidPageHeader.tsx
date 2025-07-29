import { cn } from "@/lib/utils";
import { ChakraOrb } from "@/components/ChakraOrb";
import { ChakraEnergyFlow } from "@/components/ChakraEnergyFlow";

type ChakraType = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';

interface LiquidPageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  chakra: ChakraType;
  children?: React.ReactNode;
  className?: string;
}

export const LiquidPageHeader = ({ 
  title, 
  subtitle, 
  icon, 
  chakra, 
  children,
  className 
}: LiquidPageHeaderProps) => {
  // Create energy nodes for the header flow
  const energyNodes = [
    { id: 'header-1', chakra: chakra, x: 20, y: 50, active: true },
    { id: 'header-2', chakra: 'crown' as ChakraType, x: 80, y: 30, active: true },
    { id: 'header-3', chakra: 'third-eye' as ChakraType, x: 60, y: 70, active: false }
  ];

  return (
    <div className={cn(
      "relative liquid-glass-floating rounded-2xl p-8 mb-8 overflow-hidden",
      "animate-liquid-flow",
      className
    )}>
      {/* Energy Flow Background */}
      <div className="absolute inset-0 h-24">
        <ChakraEnergyFlow 
          nodes={energyNodes}
          connections={true}
          animated={true}
          className="opacity-30"
        />
      </div>
      
      {/* Floating Title Card */}
      <div className="relative z-10 liquid-glass-elevated rounded-xl p-6 backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          {/* Chakra Icon Container */}
          <div className="relative liquid-pressure group cursor-pointer">
            <div className={cn(
              "liquid-glass-surface rounded-full p-4 relative overflow-hidden",
              "group-hover:scale-110 transition-all duration-500"
            )}>
              <ChakraOrb 
                chakra={chakra} 
                size="md" 
                className="opacity-60 absolute inset-0" 
              />
              <div className="relative z-10 text-white">
                {icon}
              </div>
            </div>
            <div className={cn(
              "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
              "transition-opacity duration-500 shadow-chakra-glow",
              `shadow-chakra-${chakra}`
            )} />
          </div>
          
          {/* Title Content */}
          <div className="flex-1 space-y-2">
            <h1 className={cn(
              "text-4xl font-bold text-white font-display",
              "liquid-typography-primary animate-liquid-shimmer"
            )}>
              {title}
            </h1>
            <p className="text-white/70 liquid-typography-secondary">
              {subtitle}
            </p>
          </div>
          
          {/* Additional Content */}
          {children && (
            <div className="liquid-glass-surface rounded-xl p-4">
              {children}
            </div>
          )}
        </div>
      </div>
      
      {/* Ambient Glow */}
      <div className={cn(
        "absolute -inset-4 rounded-2xl opacity-20 blur-xl",
        "animate-chakra-pulse",
        `bg-gradient-radial from-chakra-${chakra}/30 to-transparent`
      )} />
    </div>
  );
};