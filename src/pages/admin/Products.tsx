import { useState } from 'react';
import { Package, CheckCircle, Clock, Star, DollarSign, Eye, Edit } from 'lucide-react';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'pending' | 'inactive';
  stock: number;
  sales: number;
  rating: number;
  reviews: number;
  createdAt: string;
  seller: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=100&h=100&fit=crop&crop=center',
    name: 'Crystal Healing Set',
    category: 'Crystals',
    price: 89.99,
    status: 'active',
    stock: 45,
    sales: 234,
    rating: 4.8,
    reviews: 67,
    createdAt: '2024-01-15',
    seller: 'Crystal Wisdom'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=100&h=100&fit=crop&crop=center',
    name: 'Meditation Cushion',
    category: 'Accessories',
    price: 45.00,
    status: 'active',
    stock: 23,
    sales: 156,
    rating: 4.6,
    reviews: 42,
    createdAt: '2024-01-10',
    seller: 'Zen Products'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1591142599000-2592b9362b32?w=100&h=100&fit=crop&crop=center',
    name: 'Essential Oil Blend',
    category: 'Aromatherapy',
    price: 29.99,
    status: 'pending',
    stock: 0,
    sales: 0,
    rating: 0,
    reviews: 0,
    createdAt: '2024-01-25',
    seller: 'Natural Scents'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=100&h=100&fit=crop&crop=center',
    name: 'Tibetan Singing Bowl',
    category: 'Sound Healing',
    price: 125.00,
    status: 'active',
    stock: 12,
    sales: 89,
    rating: 4.9,
    reviews: 31,
    createdAt: '2023-12-20',
    seller: 'Sound Therapy Co'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop&crop=center',
    name: 'Chakra Candle Set',
    category: 'Candles',
    price: 67.50,
    status: 'inactive',
    stock: 0,
    sales: 45,
    rating: 4.3,
    reviews: 18,
    createdAt: '2023-11-30',
    seller: 'Sacred Flames'
  }
];

function StatusBadge({ status }: { status: Product['status'] }) {
  const config = {
    active: { 
      label: 'Active', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <CheckCircle className="w-3 h-3" />
    },
    pending: { 
      label: 'Pending', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
      icon: <Clock className="w-3 h-3" />
    },
    inactive: { 
      label: 'Inactive', 
      className: 'bg-white/20 text-white/60 border-white/30',
      icon: <Clock className="w-3 h-3" />
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

function RatingDisplay({ rating, reviews }: { rating: number; reviews: number }) {
  if (rating === 0) {
    return <span className="text-white/40">No ratings yet</span>;
  }

  return (
    <div className="flex items-center gap-1">
      <Star className="w-4 h-4 fill-chakra-solar text-chakra-solar" />
      <span className="text-white font-medium">{rating.toFixed(1)}</span>
      <span className="text-white/60 text-sm">({reviews})</span>
    </div>
  );
}

function StockIndicator({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="text-chakra-root font-medium">Out of Stock</span>;
  }
  
  if (stock < 10) {
    return <span className="text-chakra-solar font-medium">Low ({stock})</span>;
  }
  
  return <span className="text-chakra-heart font-medium">{stock} in stock</span>;
}

export default function Products() {
  const [isLoading] = useState(false);

  const columns: TableColumn<Product>[] = [
    {
      key: 'name',
      label: 'Product',
      sortable: true,
      render: (_, product) => (
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-white">{product.name}</div>
            <div className="text-sm text-white/60">{product.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (price) => (
        <span className="text-chakra-sacral font-medium">${price.toFixed(2)}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
    },
    {
      key: 'stock',
      label: 'Stock',
      sortable: true,
      render: (stock) => <StockIndicator stock={stock} />
    },
    {
      key: 'sales',
      label: 'Sales',
      sortable: true,
      render: (sales) => (
        <span className="text-white font-medium">{sales}</span>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      render: (rating, product) => <RatingDisplay rating={rating} reviews={product.reviews} />
    },
    {
      key: 'seller',
      label: 'Seller',
      render: (seller) => (
        <span className="text-white/80">{seller}</span>
      )
    },
    {
      key: 'createdAt',
      label: 'Added',
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  const actions: TableAction<Product>[] = [
    {
      id: 'view',
      label: 'View Product',
      icon: <Eye className="w-4 h-4" />,
      onClick: (product) => console.log('View product:', product.id),
    },
    {
      id: 'edit',
      label: 'Edit Product',
      icon: <Edit className="w-4 h-4" />,
      onClick: (product) => console.log('Edit product:', product.id),
    }
  ];

  const filters = [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'pending', label: 'Pending' },
        { value: 'inactive', label: 'Inactive' }
      ]
    },
    {
      key: 'category',
      label: 'Filter by Category',
      options: [
        { value: 'Crystals', label: 'Crystals' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Aromatherapy', label: 'Aromatherapy' },
        { value: 'Sound Healing', label: 'Sound Healing' },
        { value: 'Candles', label: 'Candles' }
      ]
    }
  ];

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.status === 'active').length;
  const pendingProducts = mockProducts.filter(p => p.status === 'pending').length;
  const totalRevenue = mockProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="sacral" size="md" className="opacity-80" />
            <Package className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Product Management</h1>
            <p className="text-white/60">Manage spiritual products and inventory</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
              <p className="text-chakra-sacral text-sm">In catalog</p>
            </div>
            <Package className="w-8 h-8 text-chakra-sacral" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Active Products</p>
              <p className="text-2xl font-bold text-white">{activeProducts}</p>
              <p className="text-chakra-heart text-sm">Available for sale</p>
            </div>
            <CheckCircle className="w-8 h-8 text-chakra-heart" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Pending Review</p>
              <p className="text-2xl font-bold text-white">{pendingProducts}</p>
              <p className={cn(
                "text-sm",
                pendingProducts > 0 ? "text-chakra-solar" : "text-white/60"
              )}>
                {pendingProducts > 0 ? "Needs approval" : "All approved"}
              </p>
            </div>
            <Clock className="w-8 h-8 text-chakra-solar" />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</p>
              <p className="text-chakra-crown text-sm">From product sales</p>
            </div>
            <DollarSign className="w-8 h-8 text-chakra-crown" />
          </div>
        </GlassCard>
      </div>

      {/* Products Table */}
      <div className="animate-fade-slide-up" style={{ animationDelay: '300ms' }}>
        <AdminDataTable
          data={mockProducts}
          columns={columns}
          actions={actions}
          filters={filters}
          searchPlaceholder="Search products by name, category, seller..."
          isLoading={isLoading}
          onExport={() => console.log('Export products')}
        />
      </div>
    </div>
  );
}