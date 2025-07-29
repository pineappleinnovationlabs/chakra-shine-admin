import { Outlet } from 'react-router-dom';
import { ChakraOrb } from '@/components/ChakraOrb';
import { FloatingNavigation } from '@/components/FloatingNavigation';


export function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-gradient-cosmic relative">
      {/* Background Chakra Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <ChakraOrb chakra="root" size="lg" className="absolute top-[20%] left-[5%] opacity-20" style={{ animationDelay: '0s' }} />
        <ChakraOrb chakra="sacral" size="md" className="absolute top-[60%] right-[8%] opacity-20" style={{ animationDelay: '2s' }} />
        <ChakraOrb chakra="solar" size="sm" className="absolute bottom-[30%] left-[10%] opacity-20" style={{ animationDelay: '4s' }} />
        <ChakraOrb chakra="heart" size="lg" className="absolute top-[10%] right-[20%] opacity-20" style={{ animationDelay: '1s' }} />
        <ChakraOrb chakra="throat" size="md" className="absolute bottom-[20%] right-[15%] opacity-20" style={{ animationDelay: '3s' }} />
        <ChakraOrb chakra="third-eye" size="sm" className="absolute top-[40%] left-[25%] opacity-20" style={{ animationDelay: '5s' }} />
        <ChakraOrb chakra="crown" size="lg" className="absolute bottom-[10%] right-[30%] opacity-20" style={{ animationDelay: '6s' }} />
      </div>

      {/* Floating Navigation */}
      <FloatingNavigation />
      
      {/* Main Content with Full Width */}
      <main className="relative z-10 pt-32 pb-6 px-6 md:px-8 lg:px-12">
        <div className="max-w-none animate-page-transition">
          <Outlet />
        </div>
      </main>
    </div>
  );
}