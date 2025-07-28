import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, Mail, Lock } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { DashboardPreview } from '@/components/DashboardPreview';
import { useAdminAuth, LoginCredentials } from '@/hooks/useAdminAuth';
import { useDashboardData } from '@/hooks/useDashboardData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showDashboard, setShowDashboard] = useState(false);

  const { isLoading, error, user, loginWithDemo, loginWithCredentials } = useAdminAuth();
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardData(showDashboard);

  const handleDemoLogin = async () => {
    const result = await loginWithDemo();
    
    if (result.success) {
      toast.success(result.message || 'Demo access granted!', {
        description: 'Welcome to the Klear Karma admin portal',
        duration: 4000,
      });
      setShowDashboard(true);
    } else {
      toast.error(result.message || 'Demo login failed', {
        description: 'Please try again or contact support',
        duration: 4000,
      });
    }
  };

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const result = await loginWithCredentials(credentials);
    
    if (result.success) {
      toast.success(result.message || 'Login successful!', {
        description: `Welcome back, ${result.user?.fullName}`,
        duration: 4000,
      });
      setShowDashboard(true);
    } else {
      toast.error(result.message || 'Login failed', {
        description: 'Please check your credentials and try again',
        duration: 4000,
      });
    }
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating Chakra Energy Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ChakraOrb 
          chakra="crown" 
          size="lg" 
          className="absolute top-[10%] left-[8%]" 
          style={{ animationDelay: '0s' }}
        />
        <ChakraOrb 
          chakra="heart" 
          size="xl" 
          className="absolute top-[60%] right-[10%]" 
          style={{ animationDelay: '2s' }}
        />
        <ChakraOrb 
          chakra="throat" 
          size="md" 
          className="absolute bottom-[25%] left-[15%]" 
          style={{ animationDelay: '4s' }}
        />
        <ChakraOrb 
          chakra="solar" 
          size="lg" 
          className="absolute top-[30%] right-[25%]" 
          style={{ animationDelay: '1s' }}
        />
        <ChakraOrb 
          chakra="third-eye" 
          size="md" 
          className="absolute bottom-[10%] right-[30%]" 
          style={{ animationDelay: '3s' }}
        />
        <ChakraOrb 
          chakra="sacral" 
          size="sm" 
          className="absolute top-[20%] left-[30%]" 
          style={{ animationDelay: '5s' }}
        />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Login Card */}
          <GlassCard className="p-8 animate-scale-in">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold font-display bg-gradient-chakra bg-clip-text text-transparent mb-2">
                Klear Karma
              </h1>
              <p className="text-white/70 text-lg">Admin Portal</p>
              <div className="w-16 h-1 bg-gradient-chakra mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Success State */}
            {user && (
              <div className="mb-6 p-4 rounded-xl bg-chakra-heart/10 border border-chakra-heart/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-chakra-heart" />
                  <div>
                    <p className="text-white font-medium">Welcome back, {user.fullName}!</p>
                    <p className="text-white/60 text-sm">You have {user.role} access</p>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-chakra-root/10 border border-chakra-root/20">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-chakra-root" />
                  <p className="text-white text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Demo Login Button - Prominent */}
            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className={cn(
                "demo-button w-full py-4 px-6 rounded-2xl text-white font-semibold mb-6",
                "transition-all duration-300 hover:scale-105 hover:shadow-chakra-glow",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              )}
            >
              <span className="flex items-center justify-center gap-3 relative z-10">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                {isLoading ? 'Connecting...' : 'Try Demo Admin Access'}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </span>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-cosmic-void text-white/60">or login with credentials</span>
              </div>
            </div>

            {/* Regular Login Form */}
            <form onSubmit={handleCredentialLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={credentials.email}
                    onChange={handleInputChange('email')}
                    className="glass-input pl-11"
                    placeholder="admin@klearkarma.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={handleInputChange('password')}
                    className="glass-input pl-11 pr-11"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={credentials.rememberMe}
                  onChange={handleInputChange('rememberMe')}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-chakra-crown focus:ring-chakra-crown focus:ring-2"
                />
                <label htmlFor="rememberMe" className="ml-2 text-white/70 text-sm">
                  Remember me for 30 days
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full py-3 px-6 rounded-xl font-medium transition-all duration-300",
                  "bg-gradient-to-r from-chakra-third-eye to-chakra-crown",
                  "hover:from-chakra-crown hover:to-chakra-third-eye",
                  "text-white shadow-lg hover:shadow-xl hover:scale-[1.02]",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                )}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials Hint */}
            <div className="mt-6 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/60 text-xs text-center">
                Demo credentials: admin@klearkarma.com / KlearKarma2024!
              </p>
            </div>
          </GlassCard>

          {/* Dashboard Preview */}
          <div className={cn(
            "transition-all duration-500",
            showDashboard ? "opacity-100 translate-x-0" : "opacity-50 translate-x-4"
          )}>
            {dashboardData && (
              <DashboardPreview 
                data={dashboardData}
                className="animate-fade-slide-up"
              />
            )}
            {dashboardLoading && (
              <div className="text-center text-white/60">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p>Loading dashboard preview...</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/40 text-sm">
            Secure admin portal powered by liquid glassmorphism design
          </p>
        </div>
      </div>
    </div>
  );
};