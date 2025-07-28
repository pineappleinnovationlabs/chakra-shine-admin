import { cn } from "@/lib/utils";

type ChakraType = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';

interface ChakraOrbProps {
  chakra: ChakraType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48'
};

export const ChakraOrb = ({ chakra, size = 'md', className, style }: ChakraOrbProps) => {
  return (
    <div
      className={cn(
        'chakra-orb',
        `chakra-orb-${chakra}`,
        sizeMap[size],
        className
      )}
      style={style}
    />
  );
};