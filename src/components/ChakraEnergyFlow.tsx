import { cn } from "@/lib/utils";
import { ChakraOrb } from "./ChakraOrb";
import { useEffect, useState } from "react";

type ChakraType = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';

interface EnergyNode {
  id: string;
  chakra: ChakraType;
  x: number;
  y: number;
  active: boolean;
}

interface ChakraEnergyFlowProps {
  nodes?: EnergyNode[];
  connections?: boolean;
  animated?: boolean;
  className?: string;
}

export const ChakraEnergyFlow = ({ 
  nodes = [], 
  connections = true, 
  animated = true,
  className 
}: ChakraEnergyFlowProps) => {
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      const activeNodes = nodes.filter(node => node.active);
      if (activeNodes.length < 2) return;

      const newConnections = [];
      for (let i = 0; i < activeNodes.length - 1; i++) {
        for (let j = i + 1; j < activeNodes.length; j++) {
          newConnections.push(`${activeNodes[i].id}-${activeNodes[j].id}`);
        }
      }
      
      setActiveConnections(newConnections);
      
      setTimeout(() => {
        setActiveConnections([]);
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [nodes, animated]);

  const renderConnection = (node1: EnergyNode, node2: EnergyNode) => {
    const isActive = activeConnections.includes(`${node1.id}-${node2.id}`) || 
                     activeConnections.includes(`${node2.id}-${node1.id}`);
    
    return (
      <line
        key={`${node1.id}-${node2.id}`}
        x1={node1.x}
        y1={node1.y}
        x2={node2.x}
        y2={node2.y}
        stroke="url(#chakra-gradient)"
        strokeWidth={isActive ? "3" : "1"}
        opacity={isActive ? "0.8" : "0.3"}
        className={cn(
          "transition-all duration-1000",
          isActive && "animate-pulse"
        )}
      />
    );
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {connections && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="chakra-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--chakra-crown))" stopOpacity="0.8" />
              <stop offset="16.66%" stopColor="hsl(var(--chakra-third-eye))" stopOpacity="0.8" />
              <stop offset="33.33%" stopColor="hsl(var(--chakra-throat))" stopOpacity="0.8" />
              <stop offset="50%" stopColor="hsl(var(--chakra-heart))" stopOpacity="0.8" />
              <stop offset="66.66%" stopColor="hsl(var(--chakra-solar))" stopOpacity="0.8" />
              <stop offset="83.33%" stopColor="hsl(var(--chakra-sacral))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--chakra-root))" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {nodes.map((node1, i) =>
            nodes.slice(i + 1).map((node2) => renderConnection(node1, node2))
          )}
        </svg>
      )}
      
      {nodes.map((node) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
          }}
        >
          <ChakraOrb
            chakra={node.chakra}
            size="sm"
            className={cn(
              "transition-all duration-500",
              node.active && "animate-energy-pulse scale-125"
            )}
          />
        </div>
      ))}
    </div>
  );
};