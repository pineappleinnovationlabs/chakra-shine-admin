import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Calendar, 
  Package, 
  BarChart3, 
  FileText, 
  Settings, 
  Shield, 
  UserCog,
  LogOut,
  User,
  Bell
} from 'lucide-react';
import { ChakraOrb } from '@/components/ChakraOrb';
import { ChakraEnergyFlow } from '@/components/ChakraEnergyFlow';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    chakra: 'crown' as const,
    shortTitle: 'Home'
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
    chakra: 'heart' as const,
    shortTitle: 'Users'
  },
  {
    title: 'Practitioners',
    url: '/admin/practitioners',
    icon: Heart,
    chakra: 'throat' as const,
    shortTitle: 'Pros'
  },
  {
    title: 'Bookings',
    url: '/admin/bookings',
    icon: Calendar,
    chakra: 'solar' as const,
    shortTitle: 'Book'
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
    chakra: 'sacral' as const,
    shortTitle: 'Shop'
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
    chakra: 'third-eye' as const,
    shortTitle: 'Data'
  },
  {
    title: 'Content',
    url: '/admin/content',
    icon: FileText,
    chakra: 'throat' as const,
    shortTitle: 'Blog'
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    chakra: 'root' as const,
    shortTitle: 'Config'
  },
  {
    title: 'Audit',
    url: '/admin/audit',
    icon: Shield,
    chakra: 'third-eye' as const,
    shortTitle: 'Logs'
  },
  {
    title: 'Admins',
    url: '/admin/admins',
    icon: UserCog,
    chakra: 'crown' as const,
    shortTitle: 'Team'
  }
];

export function FloatingNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAdminAuth();
  const isMobile = useIsMobile();
  const [showProfile, setShowProfile] = useState(false);
  
  const currentPath = location.pathname;
  const activeItem = navigationItems.find(item => currentPath === item.url || currentPath.startsWith(item.url + '/'));

  // Create energy nodes for the active connections
  const energyNodes = navigationItems.map((item, index) => ({
    id: item.title,
    chakra: item.chakra,
    x: (index / (navigationItems.length - 1)) * 100,
    y: 50,
    active: currentPath === item.url || currentPath.startsWith(item.url + '/')
  }));

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    logout(() => {
      toast.success('Logged out successfully', {
        description: 'You have been signed out of the admin portal',
        duration: 3000,
      });
      navigate('/');
    });
    setShowProfile(false);
  };

  if (isMobile) {
    // Mobile: Bottom Tab Bar
    return (
      <>
        {/* Background blur when profile is open */}
        {showProfile && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setShowProfile(false)}
          />
        )}

        {/* Profile Modal for Mobile */}
        {showProfile && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
            <div className="liquid-glass-modal rounded-3xl p-6 min-w-[280px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-chakra flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">{user?.fullName || 'Demo Admin'}</div>
                  <div className="text-white/60 text-sm">{user?.role || 'Administrator'}</div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 liquid-glass-elevated rounded-xl p-3 flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Notifications</span>
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 liquid-glass-elevated rounded-xl p-3 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30">
          <div className="liquid-glass-floating mx-4 mb-4 rounded-3xl">
            <div className="grid grid-cols-6 gap-1 p-2">
              {/* Navigation Items (first 5) */}
              {navigationItems.slice(0, 5).map((item) => {
                const isActive = currentPath === item.url || currentPath.startsWith(item.url + '/');
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
                      "liquid-hover liquid-pressure",
                      isActive 
                        ? "liquid-glass-elevated text-white" 
                        : "text-white/60 hover:text-white hover:liquid-glass-surface"
                    )}
                  >
                    {/* Chakra Energy Glow */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl animate-liquid-glow">
                        <div className={cn(
                          "w-full h-full rounded-2xl opacity-60",
                          `shadow-chakra-${item.chakra}`
                        )} />
                      </div>
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      <item.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{item.shortTitle}</span>
                    </div>

                    {/* Active Chakra Orb */}
                    {isActive && (
                      <div className="absolute -top-1 -right-1">
                        <ChakraOrb chakra={item.chakra} size="sm" className="opacity-80" />
                      </div>
                    )}
                  </NavLink>
                );
              })}

              {/* Profile Button */}
              <button
                onClick={handleProfileClick}
                className={cn(
                  "relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300",
                  "liquid-hover liquid-pressure",
                  showProfile 
                    ? "liquid-glass-elevated text-white" 
                    : "text-white/60 hover:text-white hover:liquid-glass-surface"
                )}
              >
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <User className="w-5 h-5" />
                  <span className="text-xs font-medium">Profile</span>
                </div>
                
                {/* Notification Dot */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-chakra-root rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop: Top Floating Pill
  return (
    <>
      {/* Chakra Energy Flow Background */}
      <div className="fixed top-0 left-0 right-0 h-32 pointer-events-none z-20">
        <ChakraEnergyFlow 
          nodes={energyNodes}
          connections={true}
          animated={true}
          className="w-full h-full"
        />
      </div>

      {/* Main Floating Navigation Pill */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
        <div className="liquid-glass-floating rounded-full px-2 py-2">
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.url || currentPath.startsWith(item.url + '/');
              return (
                <NavLink
                  key={item.title}
                  to={item.url}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-500",
                    "liquid-hover liquid-pressure group",
                    isActive 
                      ? "liquid-glass-elevated text-white min-w-[140px]" 
                      : "text-white/60 hover:text-white hover:liquid-glass-surface min-w-[48px]"
                  )}
                >
                  {/* Liquid Glow Border */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full">
                      <div className={cn(
                        "liquid-glow-border animate-liquid-flow",
                        `shadow-chakra-${item.chakra}`
                      )} />
                    </div>
                  )}

                  <div className="relative z-10 flex items-center gap-3">
                    <item.icon className={cn(
                      "w-5 h-5 transition-all duration-300",
                      isActive && "drop-shadow-lg"
                    )} />
                    
                    {/* Animated Title Expansion */}
                    <span className={cn(
                      "font-medium transition-all duration-500 overflow-hidden",
                      isActive 
                        ? "opacity-100 max-w-[100px]" 
                        : "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[100px]"
                    )}>
                      {item.title}
                    </span>
                  </div>

                  {/* Floating Chakra Orb */}
                  {isActive && (
                    <div className="absolute -top-2 -right-2 animate-chakra-float">
                      <ChakraOrb chakra={item.chakra} size="sm" className="opacity-80" />
                    </div>
                  )}
                </NavLink>
              );
            })}

            {/* Separator */}
            <div className="w-px h-8 bg-white/20 mx-2" />

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-300",
                  "liquid-hover liquid-pressure",
                  showProfile 
                    ? "liquid-glass-elevated text-white" 
                    : "text-white/60 hover:text-white hover:liquid-glass-surface"
                )}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-chakra flex items-center justify-center relative">
                  <User className="w-4 h-4 text-white" />
                  {/* Notification Dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-chakra-root rounded-full border-2 border-cosmic-void" />
                </div>
                
                {showProfile && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.fullName || 'Demo Admin'}</span>
                    <span className="text-xs text-white/60">{user?.role || 'Administrator'}</span>
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute top-full right-0 mt-4 z-40">
                  <div className="liquid-glass-modal rounded-2xl p-4 min-w-[240px]">
                    <div className="space-y-2">
                      <button className="w-full text-left px-4 py-3 rounded-xl hover:liquid-glass-surface transition-all duration-300 flex items-center gap-3 text-white/70 hover:text-white">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                        <div className="ml-auto w-2 h-2 bg-chakra-root rounded-full" />
                      </button>
                      
                      <button className="w-full text-left px-4 py-3 rounded-xl hover:liquid-glass-surface transition-all duration-300 flex items-center gap-3 text-white/70 hover:text-white">
                        <Settings className="w-4 h-4" />
                        <span>Preferences</span>
                      </button>
                      
                      <div className="border-t border-white/10 my-2" />
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/20 transition-all duration-300 flex items-center gap-3 text-red-400 hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click Outside to Close Profile */}
      {showProfile && (
        <div 
          className="fixed inset-0 z-25"
          onClick={() => setShowProfile(false)}
        />
      )}
    </>
  );
}