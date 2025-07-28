import { UserCog, Crown, Shield, Users } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="crown" size="md" className="opacity-80" />
            <UserCog className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Admin User Management</h1>
            <p className="text-white/60">Manage administrator accounts and permissions</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <GlassCard className="p-12 text-center animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <ChakraOrb chakra="crown" size="lg" className="mx-auto mb-6 opacity-60" />
        <h2 className="text-2xl font-bold text-white font-display mb-4">Admin Management Coming Soon</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          We're developing a sophisticated admin user management system with role-based access control, 
          permission matrices, and multi-factor authentication. Secure your platform with granular 
          administrative controls.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <Crown className="w-8 h-8 text-chakra-crown mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Role Management</h3>
            <p className="text-white/60 text-sm">Define and assign administrative roles</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Shield className="w-8 h-8 text-chakra-third-eye mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Permissions</h3>
            <p className="text-white/60 text-sm">Granular access control and feature permissions</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Users className="w-8 h-8 text-chakra-heart mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">User Sessions</h3>
            <p className="text-white/60 text-sm">Monitor active sessions and force logout</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}