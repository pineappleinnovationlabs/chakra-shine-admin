import { Settings as SettingsIcon, Server, Mail, Shield, Palette } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="root" size="md" className="opacity-80" />
            <SettingsIcon className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">System Settings</h1>
            <p className="text-white/60">Configure platform settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <GlassCard className="p-12 text-center animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <ChakraOrb chakra="root" size="lg" className="mx-auto mb-6 opacity-60" />
        <h2 className="text-2xl font-bold text-white font-display mb-4">Settings Panel Coming Soon</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          We're building a comprehensive settings panel where you can configure system preferences, 
          email templates, security settings, and platform customizations. Take control of every 
          aspect of your Klear Karma platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <Server className="w-8 h-8 text-chakra-root mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">System Config</h3>
            <p className="text-white/60 text-sm">General platform settings and preferences</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Mail className="w-8 h-8 text-chakra-throat mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Email Templates</h3>
            <p className="text-white/60 text-sm">Customize email communications</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Shield className="w-8 h-8 text-chakra-third-eye mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Security</h3>
            <p className="text-white/60 text-sm">Access controls and security policies</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Palette className="w-8 h-8 text-chakra-crown mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Appearance</h3>
            <p className="text-white/60 text-sm">Customize chakra themes and branding</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}