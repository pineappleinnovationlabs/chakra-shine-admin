import { useState } from 'react';
import { Calendar, CheckCircle, Clock, XCircle, DollarSign, User, Heart } from 'lucide-react';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { cn } from '@/lib/utils';

interface Booking {
  id: string;
  sessionType: string;
  user: {
    name: string;
    avatar: string;
  };
  practitioner: {
    name: string;
    avatar: string;
  };
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  dateTime: string;
  duration: number;
  price: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    sessionType: 'Meditation Session',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    practitioner: {
      name: 'Dr. Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrChen'
    },
    status: 'scheduled',
    dateTime: '2024-01-28 14:00',
    duration: 60,
    price: 89,
    paymentStatus: 'paid',
    createdAt: '2024-01-25 10:30'
  },
  {
    id: '2',
    sessionType: 'Chakra Healing',
    user: {
      name: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
    },
    practitioner: {
      name: 'Dr. Priya Patel',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrPatel'
    },
    status: 'completed',
    dateTime: '2024-01-27 16:30',
    duration: 90,
    price: 120,
    paymentStatus: 'paid',
    createdAt: '2024-01-24 14:15'
  },
  {
    id: '3',
    sessionType: 'Yoga Session',
    user: {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    },
    practitioner: {
      name: 'Sarah Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahWilson'
    },
    status: 'cancelled',
    dateTime: '2024-01-26 10:00',
    duration: 75,
    price: 95,
    paymentStatus: 'refunded',
    createdAt: '2024-01-23 16:45'
  },
  {
    id: '4',
    sessionType: 'Sound Healing',
    user: {
      name: 'Lisa Parker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa'
    },
    practitioner: {
      name: 'Mark Thompson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkThompson'
    },
    status: 'in-progress',
    dateTime: '2024-01-27 18:00',
    duration: 45,
    price: 75,
    paymentStatus: 'paid',
    createdAt: '2024-01-27 09:20'
  }
];

function StatusBadge({ status }: { status: Booking['status'] }) {
  const config = {
    scheduled: { 
      label: 'Scheduled', 
      className: 'bg-chakra-throat/20 text-chakra-throat border-chakra-throat/30',
      icon: <Clock className="w-3 h-3" />
    },
    completed: { 
      label: 'Completed', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    cancelled: { 
      label: 'Cancelled', 
      className: 'bg-chakra-root/20 text-chakra-root border-chakra-root/30',
      icon: <XCircle className="w-3 h-3" />
    },
    'in-progress': { 
      label: 'In Progress', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
      icon: <Calendar className="w-3 h-3" />
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

function PaymentBadge({ status }: { status: Booking['paymentStatus'] }) {
  const config = {
    paid: { 
      label: 'Paid', 
      className: 'bg-chakra-heart/20 text-chakra-heart',
    },
    pending: { 
      label: 'Pending', 
      className: 'bg-chakra-solar/20 text-chakra-solar',
    },
    refunded: { 
      label: 'Refunded', 
      className: 'bg-chakra-third-eye/20 text-chakra-third-eye',
    }
  };

  const { label, className } = config[status];

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium",
      className
    )}>
      {label}
    </span>
  );
}

export default function Bookings() {
  const [isLoading] = useState(false);

  const columns: TableColumn<Booking>[] = [
    {
      key: 'sessionType',
      label: 'Session',
      sortable: true,
      render: (type, booking) => (
        <div>
          <div className="font-medium text-white">{type}</div>
          <div className="text-sm text-white/60">{booking.duration} minutes</div>
        </div>
      )
    },
    {
      key: 'user',
      label: 'User',
      render: (user) => (
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">{user.name}</span>
        </div>
      )
    },
    {
      key: 'practitioner',
      label: 'Practitioner',
      render: (practitioner) => (
        <div className="flex items-center gap-2">
          <img
            src={practitioner.avatar}
            alt={practitioner.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-white">{practitioner.name}</span>
        </div>
      )
    },
    {
      key: 'dateTime',
      label: 'Date & Time',
      sortable: true,
      render: (dateTime) => (
        <div className="text-sm">
          <div className="text-white">{new Date(dateTime).toLocaleDateString()}</div>
          <div className="text-white/60">{new Date(dateTime).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (price) => (
        <span className="text-chakra-sacral font-medium">${price}</span>
      )
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      render: (status) => <PaymentBadge status={status} />
    }
  ];

  const actions: TableAction<Booking>[] = [
    {
      id: 'reschedule',
      label: 'Reschedule',
      icon: <Calendar className="w-4 h-4" />,
      onClick: (booking) => console.log('Reschedule:', booking.id),
      show: (booking) => booking.status === 'scheduled'
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: <XCircle className="w-4 h-4" />,
      onClick: (booking) => console.log('Cancel:', booking.id),
      variant: 'danger',
      show: (booking) => booking.status === 'scheduled'
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'scheduled', label: 'Scheduled' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'in-progress', label: 'In Progress' }
      ]
    },
    {
      key: 'paymentStatus',
      label: 'Filter by Payment',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'refunded', label: 'Refunded' }
      ]
    }
  ];

  const totalBookings = mockBookings.length;
  const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
  const todayBookings = mockBookings.filter(b => 
    new Date(b.dateTime).toDateString() === new Date().toDateString()
  ).length;
  const totalRevenue = mockBookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="solar" size="md" className="opacity-80" />
            <Calendar className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Booking Management</h1>
            <p className="text-white/60">Monitor and manage all session bookings</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{totalBookings}</p>
              <p className="text-chakra-solar text-sm">All time</p>
            </div>
            <Calendar className="w-8 h-8 text-chakra-solar" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">{completedBookings}</p>
              <p className="text-chakra-heart text-sm">Sessions finished</p>
            </div>
            <CheckCircle className="w-8 h-8 text-chakra-heart" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Today</p>
              <p className="text-2xl font-bold text-white">{todayBookings}</p>
              <p className="text-chakra-throat text-sm">Scheduled sessions</p>
            </div>
            <Clock className="w-8 h-8 text-chakra-throat" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue}</p>
              <p className="text-chakra-sacral text-sm">From bookings</p>
            </div>
            <DollarSign className="w-8 h-8 text-chakra-sacral" />
          </div>
        </GlassCard>
      </div>

      {/* Bookings Table */}
      <div className="animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
        <AdminDataTable
          data={mockBookings}
          columns={columns}
          actions={actions}
          filters={filters}
          searchPlaceholder="Search bookings by user, practitioner, session type..."
          isLoading={isLoading}
          onExport={() => console.log('Export bookings')}
        />
      </div>
    </div>
  );
}