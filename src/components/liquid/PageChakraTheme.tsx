import { createContext, useContext, ReactNode } from "react";

type ChakraType = 'root' | 'sacral' | 'solar' | 'heart' | 'throat' | 'third-eye' | 'crown';

interface PageChakraThemeProps {
  chakra: ChakraType;
  children: ReactNode;
}

const ChakraThemeContext = createContext<ChakraType>('heart');

export const usePageChakra = () => useContext(ChakraThemeContext);

const chakraThemeMap = {
  'root': {
    gradient: 'from-chakra-root/20 via-chakra-root/10 to-transparent',
    glow: 'shadow-chakra-root',
    accent: 'text-chakra-root'
  },
  'sacral': {
    gradient: 'from-chakra-sacral/20 via-chakra-sacral/10 to-transparent',
    glow: 'shadow-chakra-sacral',
    accent: 'text-chakra-sacral'
  },
  'solar': {
    gradient: 'from-chakra-solar/20 via-chakra-solar/10 to-transparent',
    glow: 'shadow-chakra-solar',
    accent: 'text-chakra-solar'
  },
  'heart': {
    gradient: 'from-chakra-heart/20 via-chakra-heart/10 to-transparent',
    glow: 'shadow-chakra-heart',
    accent: 'text-chakra-heart'
  },
  'throat': {
    gradient: 'from-chakra-throat/20 via-chakra-throat/10 to-transparent',
    glow: 'shadow-chakra-throat',
    accent: 'text-chakra-throat'
  },
  'third-eye': {
    gradient: 'from-chakra-third-eye/20 via-chakra-third-eye/10 to-transparent',
    glow: 'shadow-chakra-third-eye',
    accent: 'text-chakra-third-eye'
  },
  'crown': {
    gradient: 'from-chakra-crown/20 via-chakra-crown/10 to-transparent',
    glow: 'shadow-chakra-crown',
    accent: 'text-chakra-crown'
  }
};

export const PageChakraTheme = ({ chakra, children }: PageChakraThemeProps) => {
  const theme = chakraThemeMap[chakra];
  
  return (
    <ChakraThemeContext.Provider value={chakra}>
      <div 
        className={`page-chakra-theme`}
        style={{
          // Set CSS custom properties for the current chakra theme
          '--page-chakra-gradient': `linear-gradient(135deg, ${theme.gradient})`,
          '--page-chakra-glow': theme.glow,
          '--page-chakra-accent': theme.accent,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </ChakraThemeContext.Provider>
  );
};