import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Star } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="third-eye" size="md" className="opacity-80" />
            <BarChart3 className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Analytics Dashboard</h1>
            <p className="text-white/60">Deep insights and reporting for your platform</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <GlassCard className="p-12 text-center animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <ChakraOrb chakra="third-eye" size="lg" className="mx-auto mb-6 opacity-60" />
        <h2 className="text-2xl font-bold text-white font-display mb-4">Advanced Analytics Coming Soon</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          We're building powerful analytics tools to give you deeper insights into user behavior, 
          revenue trends, and platform performance. This will include interactive charts, 
          custom reports, and real-time data visualization.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <TrendingUp className="w-8 h-8 text-chakra-third-eye mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Revenue Analytics</h3>
            <p className="text-white/60 text-sm">Track earnings, conversion rates, and payment trends</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Users className="w-8 h-8 text-chakra-heart mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">User Insights</h3>
            <p className="text-white/60 text-sm">Understand user behavior and engagement patterns</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Star className="w-8 h-8 text-chakra-crown mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Performance Metrics</h3>
            <p className="text-white/60 text-sm">Monitor system performance and user satisfaction</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}