import { useState } from 'react';
import { Settings as SettingsIcon, Server, Mail, Shield, Palette, Database, Bell, Globe, Lock, Users, Activity, Zap } from 'lucide-react';
import { LiquidPageHeader } from '@/components/liquid/LiquidPageHeader';
import { LiquidMetricGrid } from '@/components/liquid/LiquidMetricGrid';
import { PageChakraTheme } from '@/components/liquid/PageChakraTheme';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SystemSetting {
  id: string;
  category: string;
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'toggle' | 'input' | 'select' | 'number';
  status: 'active' | 'inactive' | 'warning';
  lastModified: string;
  modifiedBy: string;
}

const mockSettings: SystemSetting[] = [
  {
    id: '1',
    category: 'Security',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all admin accounts',
    value: true,
    type: 'toggle',
    status: 'active',
    lastModified: '2024-01-25',
    modifiedBy: 'Admin User'
  },
  {
    id: '2',
    category: 'Email',
    name: 'SMTP Server',
    description: 'Primary email server configuration',
    value: 'smtp.klearkarma.com',
    type: 'input',
    status: 'active',
    lastModified: '2024-01-24',
    modifiedBy: 'System Admin'
  },
  {
    id: '3',
    category: 'Performance',
    name: 'Cache Duration',
    description: 'Content cache time in minutes',
    value: 30,
    type: 'number',
    status: 'active',
    lastModified: '2024-01-23',
    modifiedBy: 'Admin User'
  },
  {
    id: '4',
    category: 'Notifications',
    name: 'Email Notifications',
    description: 'Send email alerts for system events',
    value: true,
    type: 'toggle',
    status: 'active',
    lastModified: '2024-01-22',
    modifiedBy: 'System Admin'
  },
  {
    id: '5',
    category: 'Appearance',
    name: 'Dark Mode',
    description: 'Enable dark theme by default',
    value: true,
    type: 'toggle',
    status: 'active',
    lastModified: '2024-01-21',
    modifiedBy: 'Admin User'
  },
  {
    id: '6',
    category: 'Security',
    name: 'Session Timeout',
    description: 'Auto-logout after inactivity (minutes)',
    value: 60,
    type: 'number',
    status: 'warning',
    lastModified: '2024-01-20',
    modifiedBy: 'System Admin'
  }
];

function StatusBadge({ status }: { status: SystemSetting['status'] }) {
  const config = {
    active: { 
      label: 'Active', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
    },
    inactive: { 
      label: 'Inactive', 
      className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    },
    warning: { 
      label: 'Warning', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
    }
  };

  const { label, className } = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}

function SettingValue({ setting }: { setting: SystemSetting }) {
  if (setting.type === 'toggle') {
    return (
      <Switch 
        checked={setting.value as boolean}
        className="data-[state=checked]:bg-chakra-heart"
      />
    );
  }
  
  return (
    <span className="text-white font-medium">
      {typeof setting.value === 'boolean' ? (setting.value ? 'Yes' : 'No') : setting.value}
    </span>
  );
}

export default function Settings() {
  const [isLoading] = useState(false);

  const metrics = [
    {
      id: 'system-health',
      title: 'System Health',
      value: '99.9%',
      subtitle: 'Uptime this month',
      icon: <Server className="w-6 h-6" />,
      chakra: 'root' as const,
      size: 'featured' as const,
      trend: { value: 0.1, isPositive: true, label: 'improvement' },
      delay: 0
    },
    {
      id: 'active-settings',
      title: 'Active Settings',
      value: 42,
      subtitle: 'Configured system parameters',
      icon: <SettingsIcon className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'medium' as const,
      trend: { value: 5, isPositive: true, label: 'this week' },
      delay: 150
    },
    {
      id: 'security-score',
      title: 'Security Score',
      value: 'A+',
      subtitle: 'Platform security rating',
      icon: <Shield className="w-6 h-6" />,
      chakra: 'third-eye' as const,
      size: 'medium' as const,
      trend: { value: 2, isPositive: true, label: 'improvement' },
      delay: 300
    },
    {
      id: 'email-delivery',
      title: 'Email Delivery',
      value: '98.5%',
      subtitle: 'Successful email rate',
      icon: <Mail className="w-6 h-6" />,
      chakra: 'throat' as const,
      size: 'wide' as const,
      trend: { value: 1.2, isPositive: true, label: 'success rate' },
      delay: 450
    }
  ];

  const settingCategories = [
    {
      name: 'Security',
      icon: <Shield className="w-5 h-5" />,
      color: 'chakra-third-eye',
      count: 2
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'chakra-throat',
      count: 1
    },
    {
      name: 'Performance',
      icon: <Zap className="w-5 h-5" />,
      color: 'chakra-solar',
      count: 1
    },
    {
      name: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      color: 'chakra-heart',
      count: 1
    },
    {
      name: 'Appearance',
      icon: <Palette className="w-5 h-5" />,
      color: 'chakra-crown',
      count: 1
    }
  ];

  return (
    <PageChakraTheme chakra="root">
      <div className="space-y-8">
        {/* Liquid Header */}
        <LiquidPageHeader
          title="System Settings"
          subtitle="Configure platform settings, security policies, and system preferences"
          icon={<SettingsIcon className="w-8 h-8" />}
          chakra="root"
        />

        {/* Liquid Metrics Grid */}
        <LiquidMetricGrid 
          metrics={metrics}
          columns={2}
          variant="dynamic"
        />

        {/* Settings Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingCategories.map((category) => (
            <Card key={category.name} className="liquid-glass-elevated border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    `bg-${category.color}/20 text-${category.color}`
                  )}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                    <CardDescription className="text-white/60">
                      {category.count} setting{category.count !== 1 ? 's' : ''}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full liquid-glass-surface hover:liquid-glass-elevated"
                >
                  Configure {category.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Settings Table */}
        <div className="liquid-glass-elevated rounded-2xl p-6 animate-liquid-morph" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">System Configuration</h3>
            <Button className="liquid-glass-surface hover:liquid-glass-elevated">
              <SettingsIcon className="w-4 h-4 mr-2" />
              Add Setting
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockSettings.map((setting) => (
              <div 
                key={setting.id}
                className="flex items-center justify-between p-4 rounded-xl liquid-glass-surface hover:liquid-glass-elevated transition-all duration-300"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={cn(
                    "p-2 rounded-lg",
                    setting.category === 'Security' ? "bg-chakra-third-eye/20 text-chakra-third-eye" :
                    setting.category === 'Email' ? "bg-chakra-throat/20 text-chakra-throat" :
                    setting.category === 'Performance' ? "bg-chakra-solar/20 text-chakra-solar" :
                    setting.category === 'Notifications' ? "bg-chakra-heart/20 text-chakra-heart" :
                    "bg-chakra-crown/20 text-chakra-crown"
                  )}>
                    {setting.category === 'Security' ? <Shield className="w-4 h-4" /> :
                     setting.category === 'Email' ? <Mail className="w-4 h-4" /> :
                     setting.category === 'Performance' ? <Zap className="w-4 h-4" /> :
                     setting.category === 'Notifications' ? <Bell className="w-4 h-4" /> :
                     <Palette className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white">{setting.name}</h4>
                      <StatusBadge status={setting.status} />
                    </div>
                    <p className="text-sm text-white/60">{setting.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                      <span>Modified: {new Date(setting.lastModified).toLocaleDateString()}</span>
                      <span>by {setting.modifiedBy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <SettingValue setting={setting} />
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                    <SettingsIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription className="text-white/60">
                Manage system backups and data recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Create Backup
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Logs
              </CardTitle>
              <CardDescription className="text-white/60">
                View system logs and error reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                View Logs
              </Button>
            </CardContent>
          </Card>

          <Card className="liquid-glass-elevated border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                API Settings
              </CardTitle>
              <CardDescription className="text-white/60">
                Configure API endpoints and integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full liquid-glass-surface hover:liquid-glass-elevated">
                Manage APIs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageChakraTheme>
  );
}