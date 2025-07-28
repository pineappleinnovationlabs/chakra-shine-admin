import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
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
  Bell,
  Search,
  Menu,
  LogOut,
  User
} from 'lucide-react';
import { 
  SidebarProvider, 
  SidebarTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/admin/dashboard',
    icon: LayoutDashboard,
    chakra: 'crown' as const,
    description: 'Overview & Analytics'
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: Users,
    chakra: 'heart' as const,
    description: 'User Management'
  },
  {
    title: 'Practitioners',
    url: '/admin/practitioners',
    icon: Heart,
    chakra: 'throat' as const,
    description: 'Practitioner Verification'
  },
  {
    title: 'Bookings',
    url: '/admin/bookings',
    icon: Calendar,
    chakra: 'solar' as const,
    description: 'Session Management'
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: Package,
    chakra: 'sacral' as const,
    description: 'Product Catalog'
  },
  {
    title: 'Analytics',
    url: '/admin/analytics',
    icon: BarChart3,
    chakra: 'third-eye' as const,
    description: 'Advanced Reporting'
  },
  {
    title: 'Content',
    url: '/admin/content',
    icon: FileText,
    chakra: 'throat' as const,
    description: 'Blog & Resources'
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
    chakra: 'root' as const,
    description: 'System Configuration'
  },
  {
    title: 'Audit Logs',
    url: '/admin/audit',
    icon: Shield,
    chakra: 'third-eye' as const,
    description: 'Security & Activity'
  },
  {
    title: 'Admin Users',
    url: '/admin/admins',
    icon: UserCog,
    chakra: 'crown' as const,
    description: 'Role Management'
  }
];

function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  return (
    <Sidebar className={cn(
      "border-r border-white/10 transition-all duration-300",
      collapsed ? "w-16" : "w-72"
    )}>
      <SidebarContent className="bg-gradient-to-b from-cosmic-void to-cosmic-space backdrop-blur-xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ChakraOrb chakra="crown" size="sm" className="relative" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold font-display bg-gradient-chakra bg-clip-text text-transparent">
                  Klear Karma
                </h1>
                <p className="text-white/60 text-sm">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-white/60 text-xs uppercase tracking-wider mb-4",
            collapsed && "hidden"
          )}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group",
                        "hover:bg-white/5 hover:scale-[1.02]",
                        isActive 
                          ? "bg-gradient-to-r from-chakra-crown/20 to-chakra-third-eye/20 border border-white/20 text-white shadow-lg" 
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <div className="relative">
                        <item.icon className={cn(
                          "w-5 h-5 transition-all duration-300",
                          isActive(item.url) && "text-white drop-shadow-lg"
                        )} />
                        {isActive(item.url) && (
                          <ChakraOrb 
                            chakra={item.chakra} 
                            size="sm" 
                            className="absolute -inset-2 opacity-30" 
                          />
                        )}
                      </div>
                      
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto p-4 border-t border-white/10">
          {!collapsed && (
            <GlassCard className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-chakra flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">Demo Admin</div>
                  <div className="text-xs text-white/60">Super Administrator</div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

function AdminHeader() {
  const { user, logout } = useAdminAuth();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-cosmic-void/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side - Trigger and Search */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-white hover:text-white/80" />
          
          <div className="relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search...</span>
            </button>
          </div>
        </div>

        {/* Right Side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-chakra-root rounded-full border-2 border-cosmic-void"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-medium text-white">
                {user?.fullName || 'Demo Admin'}
              </div>
              <div className="text-xs text-white/60">
                {user?.role || 'Administrator'}
              </div>
            </div>
            
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/70 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function AdminLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full bg-gradient-cosmic relative">
        {/* Background Chakra Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <ChakraOrb chakra="root" size="lg" className="absolute top-[20%] left-[5%] opacity-20" style={{ animationDelay: '0s' }} />
          <ChakraOrb chakra="sacral" size="md" className="absolute top-[60%] right-[8%] opacity-20" style={{ animationDelay: '2s' }} />
          <ChakraOrb chakra="solar" size="sm" className="absolute bottom-[30%] left-[10%] opacity-20" style={{ animationDelay: '4s' }} />
          <ChakraOrb chakra="heart" size="lg" className="absolute top-[10%] right-[20%] opacity-20" style={{ animationDelay: '1s' }} />
          <ChakraOrb chakra="throat" size="md" className="absolute bottom-[20%] right-[15%] opacity-20" style={{ animationDelay: '3s' }} />
          <ChakraOrb chakra="third-eye" size="sm" className="absolute top-[40%] left-[25%] opacity-20" style={{ animationDelay: '5s' }} />
          <ChakraOrb chakra="crown" size="lg" className="absolute bottom-[10%] right-[30%] opacity-20" style={{ animationDelay: '6s' }} />
        </div>

        <div className="flex w-full relative z-10">
          <AdminSidebar />
          
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            
            <main className="flex-1 p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}