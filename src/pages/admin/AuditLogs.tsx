import { Shield, Activity, Clock, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="third-eye" size="md" className="opacity-80" />
            <Shield className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Audit Logs</h1>
            <p className="text-white/60">Security monitoring and activity tracking</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <GlassCard className="p-12 text-center animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <ChakraOrb chakra="third-eye" size="lg" className="mx-auto mb-6 opacity-60" />
        <h2 className="text-2xl font-bold text-white font-display mb-4">Audit Log System Coming Soon</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          We're implementing a comprehensive audit logging system to track all administrative actions, 
          user activities, and security events. Monitor your platform's security with detailed logs 
          and real-time alerts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <Activity className="w-8 h-8 text-chakra-third-eye mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Admin Actions</h3>
            <p className="text-white/60 text-sm">Track all administrative activities and changes</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Clock className="w-8 h-8 text-chakra-heart mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">User Activities</h3>
            <p className="text-white/60 text-sm">Monitor user login and platform usage</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <AlertTriangle className="w-8 h-8 text-chakra-solar mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Security Events</h3>
            <p className="text-white/60 text-sm">Real-time security alerts and monitoring</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}