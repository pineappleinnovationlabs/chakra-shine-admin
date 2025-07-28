import { useState } from 'react';
import { Heart, CheckCircle, Clock, XCircle, Star, Award, Calendar } from 'lucide-react';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { cn } from '@/lib/utils';

interface Practitioner {
  id: string;
  avatar: string;
  name: string;
  email: string;
  specialties: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  rating: number;
  sessionsCount: number;
  earnings: number;
  joinDate: string;
  lastActive: string;
  certifications: number;
}

const mockPractitioners: Practitioner[] = [
  {
    id: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrChen',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@example.com',
    specialties: ['Meditation', 'Mindfulness', 'Stress Relief'],
    verificationStatus: 'verified',
    rating: 4.9,
    sessionsCount: 156,
    earnings: 12450,
    joinDate: '2023-08-15',
    lastActive: '2024-01-27 16:30',
    certifications: 3
  },
  {
    id: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahWilson',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    specialties: ['Yoga', 'Breathwork', 'Energy Healing'],
    verificationStatus: 'pending',
    rating: 0,
    sessionsCount: 0,
    earnings: 0,
    joinDate: '2024-01-25',
    lastActive: '2024-01-27 14:15',
    certifications: 2
  },
  {
    id: '3',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrPatel',
    name: 'Dr. Priya Patel',
    email: 'priya.patel@example.com',
    specialties: ['Chakra Healing', 'Crystal Therapy', 'Reiki'],
    verificationStatus: 'verified',
    rating: 4.8,
    sessionsCount: 89,
    earnings: 7890,
    joinDate: '2023-12-10',
    lastActive: '2024-01-27 18:45',
    certifications: 4
  },
  {
    id: '4',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkThompson',
    name: 'Mark Thompson',
    email: 'mark.thompson@example.com',
    specialties: ['Sound Healing', 'Meditation'],
    verificationStatus: 'rejected',
    rating: 0,
    sessionsCount: 0,
    earnings: 0,
    joinDate: '2024-01-20',
    lastActive: '2024-01-22 10:30',
    certifications: 1
  }
];

function VerificationBadge({ status }: { status: Practitioner['verificationStatus'] }) {
  const config = {
    verified: { 
      label: 'Verified', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    pending: { 
      label: 'Pending', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
      icon: <Clock className="w-3 h-3" />
    },
    rejected: { 
      label: 'Rejected', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <XCircle className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[status];

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border",
      className
    )}>
      {icon}
      {label}
    </span>
  );
}

function RatingDisplay({ rating }: { rating: number }) {
  if (rating === 0) {
    return <span className="text-white/40">No ratings yet</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-chakra-solar text-chakra-solar" />
      <span className="text-white font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function Practitioners() {
  const [isLoading] = useState(false);

  const columns: TableColumn<Practitioner>[] = [
    {
      key: 'name',
      label: 'Practitioner',
      sortable: true,
      render: (_, practitioner) => (
        <div className="flex items-center gap-3">
          <img
            src={practitioner.avatar}
            alt={practitioner.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium text-white">{practitioner.name}</div>
            <div className="text-sm text-white/60">{practitioner.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'specialties',
      label: 'Specialties',
      render: (specialties: string[]) => (
        <div className="flex flex-wrap gap-1">
          {specialties.slice(0, 2).map((specialty, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-chakra-throat/20 text-chakra-throat text-xs rounded-lg"
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 2 && (
            <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-lg">
              +{specialties.length - 2} more
            </span>
          )}
        </div>
      )
    },
    {
      key: 'verificationStatus',
      label: 'Status',
      sortable: true,
      render: (status) => <VerificationBadge status={status} />
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (rating) => <RatingDisplay rating={rating} />
    },
    {
      key: 'sessionsCount',
      label: 'Sessions',
      sortable: true,
      render: (count) => (
        <span className="text-chakra-solar font-medium">{count}</span>
      )
    },
    {
      key: 'earnings',
      label: 'Earnings',
      sortable: true,
      render: (amount) => (
        <span className="text-chakra-sacral font-medium">${amount.toLocaleString()}</span>
      )
    },
    {
      key: 'certifications',
      label: 'Certificates',
      sortable: true,
      render: (count) => (
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4 text-chakra-crown" />
          <span className="text-white">{count}</span>
        </div>
      )
    }
  ];

  const actions: TableAction<Practitioner>[] = [
    {
      id: 'approve',
      label: 'Approve',
      icon: <CheckCircle className="w-4 h-4" />,
      onClick: (practitioner) => console.log('Approve:', practitioner.id),
      show: (practitioner) => practitioner.verificationStatus === 'pending'
    },
    {
      id: 'reject',
      label: 'Reject',
      icon: <XCircle className="w-4 h-4" />,
      onClick: (practitioner) => console.log('Reject:', practitioner.id),
      variant: 'danger',
      show: (practitioner) => practitioner.verificationStatus === 'pending'
    }
  ];

  const filters = [
    {
      key: 'verificationStatus',
      label: 'Filter by Status',
      options: [
        { value: 'verified', label: 'Verified' },
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' }
      ]
    }
  ];

  const pendingCount = mockPractitioners.filter(p => p.verificationStatus === 'pending').length;
  const verifiedCount = mockPractitioners.filter(p => p.verificationStatus === 'verified').length;
  const totalEarnings = mockPractitioners
    .filter(p => p.verificationStatus === 'verified')
    .reduce((sum, p) => sum + p.earnings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="throat" size="md" className="opacity-80" />
            <Heart className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Practitioner Management</h1>
            <p className="text-white/60">Verify and manage spiritual practitioners</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Practitioners</p>
              <p className="text-2xl font-bold text-white">{mockPractitioners.length}</p>
              <p className="text-chakra-throat text-sm">Registered</p>
            </div>
            <Heart className="w-8 h-8 text-chakra-throat" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Verified</p>
              <p className="text-2xl font-bold text-white">{verifiedCount}</p>
              <p className="text-chakra-heart text-sm">Active practitioners</p>
            </div>
            <CheckCircle className="w-8 h-8 text-chakra-heart" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-white">{pendingCount}</p>
              <p className={cn(
                "text-sm",
                pendingCount > 0 ? "text-chakra-solar" : "text-white/60"
              )}>
                {pendingCount > 0 ? "Requires attention" : "All caught up"}
              </p>
            </div>
            <Clock className="w-8 h-8 text-chakra-solar" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-white">${totalEarnings.toLocaleString()}</p>
              <p className="text-chakra-sacral text-sm">Platform revenue</p>
            </div>
            <Calendar className="w-8 h-8 text-chakra-sacral" />
          </div>
        </GlassCard>
      </div>

      {/* Practitioners Table */}
      <div className="animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
        <AdminDataTable
          data={mockPractitioners}
          columns={columns}
          actions={actions}
          filters={filters}
          searchPlaceholder="Search practitioners by name, specialty..."
          isLoading={isLoading}
          onExport={() => console.log('Export practitioners')}
        />
      </div>
    </div>
  );
}