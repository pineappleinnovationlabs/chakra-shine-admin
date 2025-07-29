import { useState } from 'react';
import { FileText, BookOpen, Image, Video, Plus, Edit, Trash2, Eye, Calendar, Users, TrendingUp, Search, Filter } from 'lucide-react';
import { LiquidPageHeader } from '@/components/liquid/LiquidPageHeader';
import { LiquidMetricGrid } from '@/components/liquid/LiquidMetricGrid';
import { PageChakraTheme } from '@/components/liquid/PageChakraTheme';
import { AdminDataTable, TableColumn, TableAction } from '@/components/AdminDataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ContentItem {
  id: string;
  title: string;
  type: 'blog' | 'article' | 'video' | 'image';
  status: 'published' | 'draft' | 'archived' | 'pending';
  author: string;
  publishDate: string;
  views: number;
  engagement: number;
  category: string;
  tags: string[];
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: '7 Chakras Meditation Guide',
    type: 'blog',
    status: 'published',
    author: 'Sarah Johnson',
    publishDate: '2024-01-25',
    views: 12450,
    engagement: 89,
    category: 'Meditation',
    tags: ['chakras', 'meditation', 'spiritual']
  },
  {
    id: '2',
    title: 'Morning Energy Flow Routine',
    type: 'video',
    status: 'published',
    author: 'Michael Chen',
    publishDate: '2024-01-24',
    views: 8920,
    engagement: 92,
    category: 'Wellness',
    tags: ['morning', 'energy', 'routine']
  },
  {
    id: '3',
    title: 'Understanding Root Chakra',
    type: 'article',
    status: 'draft',
    author: 'Emma Davis',
    publishDate: '2024-01-26',
    views: 0,
    engagement: 0,
    category: 'Education',
    tags: ['root-chakra', 'foundation', 'grounding']
  },
  {
    id: '4',
    title: 'Sacral Chakra Healing',
    type: 'blog',
    status: 'pending',
    author: 'James Wilson',
    publishDate: '2024-01-27',
    views: 0,
    engagement: 0,
    category: 'Healing',
    tags: ['sacral', 'creativity', 'emotions']
  },
  {
    id: '5',
    title: 'Solar Plexus Power Meditation',
    type: 'video',
    status: 'published',
    author: 'Lisa Parker',
    publishDate: '2024-01-23',
    views: 15680,
    engagement: 94,
    category: 'Meditation',
    tags: ['solar-plexus', 'confidence', 'power']
  }
];

function StatusBadge({ status }: { status: ContentItem['status'] }) {
  const config = {
    published: { 
      label: 'Published', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
    },
    draft: { 
      label: 'Draft', 
      className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    },
    pending: { 
      label: 'Pending', 
      className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    },
    archived: { 
      label: 'Archived', 
      className: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    }
  };

  const { label, className } = config[status];
  return (
    <Badge variant="outline" className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}

function TypeBadge({ type }: { type: ContentItem['type'] }) {
  const config = {
    blog: { 
      label: 'Blog', 
      className: 'bg-chakra-throat/20 text-chakra-throat border-chakra-throat/30',
      icon: <FileText className="w-3 h-3" />
    },
    article: { 
      label: 'Article', 
      className: 'bg-chakra-heart/20 text-chakra-heart border-chakra-heart/30',
      icon: <BookOpen className="w-3 h-3" />
    },
    video: { 
      label: 'Video', 
      className: 'bg-chakra-crown/20 text-chakra-crown border-chakra-crown/30',
      icon: <Video className="w-3 h-3" />
    },
    image: { 
      label: 'Image', 
      className: 'bg-chakra-solar/20 text-chakra-solar border-chakra-solar/30',
      icon: <Image className="w-3 h-3" />
    }
  };

  const { label, className, icon } = config[type];
  return (
    <Badge variant="outline" className={cn("text-xs flex items-center gap-1", className)}>
      {icon}
      {label}
    </Badge>
  );
}

export default function Content() {
  const [isLoading] = useState(false);

  const columns: TableColumn<ContentItem>[] = [
    {
      key: 'title',
      label: 'Content',
      sortable: true,
      render: (_, content) => (
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            content.type === 'blog' ? "bg-chakra-throat/20" :
            content.type === 'article' ? "bg-chakra-heart/20" :
            content.type === 'video' ? "bg-chakra-crown/20" : "bg-chakra-solar/20"
          )}>
            {content.type === 'blog' ? <FileText className="w-5 h-5 text-chakra-throat" /> :
             content.type === 'article' ? <BookOpen className="w-5 h-5 text-chakra-heart" /> :
             content.type === 'video' ? <Video className="w-5 h-5 text-chakra-crown" /> :
             <Image className="w-5 h-5 text-chakra-solar" />}
          </div>
          <div>
            <div className="font-medium text-white">{content.title}</div>
            <div className="text-sm text-white/60">{content.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (type) => <TypeBadge type={type} />
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status) => <StatusBadge status={status} />
    },
    {
      key: 'author',
      label: 'Author',
      sortable: true,
      render: (author) => <span className="text-white">{author}</span>
    },
    {
      key: 'publishDate',
      label: 'Published',
      sortable: true,
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'views',
      label: 'Views',
      sortable: true,
      render: (views) => (
        <span className="text-chakra-solar font-medium">{views.toLocaleString()}</span>
      )
    },
    {
      key: 'engagement',
      label: 'Engagement',
      sortable: true,
      render: (engagement) => (
        <span className="text-chakra-heart font-medium">{engagement}%</span>
      )
    }
  ];

  const actions: TableAction<ContentItem>[] = [
    {
      id: 'view',
      label: 'View Content',
      icon: <Eye className="w-4 h-4" />,
      onClick: (content) => console.log('View content:', content.id),
    },
    {
      id: 'edit',
      label: 'Edit Content',
      icon: <Edit className="w-4 h-4" />,
      onClick: (content) => console.log('Edit content:', content.id),
    },
    {
      id: 'delete',
      label: 'Delete Content',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (content) => console.log('Delete content:', content.id),
      variant: 'danger',
      show: (content) => content.status !== 'published'
    }
  ];

  const filters = [
    {
      key: 'type',
      label: 'Filter by Type',
      options: [
        { value: 'blog', label: 'Blog Posts' },
        { value: 'article', label: 'Articles' },
        { value: 'video', label: 'Videos' },
        { value: 'image', label: 'Images' }
      ]
    },
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'published', label: 'Published' },
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending' },
        { value: 'archived', label: 'Archived' }
      ]
    }
  ];

  const metrics = [
    {
      id: 'total-content',
      title: 'Total Content',
      value: 156,
      subtitle: 'Published articles and media',
      icon: <FileText className="w-6 h-6" />,
      chakra: 'throat' as const,
      size: 'medium' as const,
      trend: { value: 12.5, isPositive: true, label: 'this month' },
      delay: 0
    },
    {
      id: 'published-content',
      title: 'Published',
      value: 89,
      subtitle: 'Live content pieces',
      icon: <BookOpen className="w-6 h-6" />,
      chakra: 'heart' as const,
      size: 'featured' as const,
      trend: { value: 8.3, isPositive: true, label: 'engagement' },
      delay: 150
    },
    {
      id: 'total-views',
      title: 'Total Views',
      value: '2.4M',
      subtitle: 'Content engagement this month',
      icon: <Eye className="w-6 h-6" />,
      chakra: 'solar' as const,
      size: 'medium' as const,
      trend: { value: 15.7, isPositive: true, label: 'growth' },
      delay: 300
    },
    {
      id: 'avg-engagement',
      title: 'Avg Engagement',
      value: '87%',
      subtitle: 'User interaction rate',
      icon: <TrendingUp className="w-6 h-6" />,
      chakra: 'crown' as const,
      size: 'wide' as const,
      trend: { value: 3.2, isPositive: true, label: 'improvement' },
      delay: 450
    }
  ];

  return (
    <PageChakraTheme chakra="throat">
      <div className="space-y-8">
        {/* Liquid Header */}
        <LiquidPageHeader
          title="Content Management"
          subtitle="Manage blog posts, articles, videos, and media content with advanced analytics"
          icon={<FileText className="w-8 h-8" />}
          chakra="throat"
        />

        {/* Liquid Metrics Grid */}
        <LiquidMetricGrid 
          metrics={metrics}
          columns={2}
          variant="dynamic"
        />

        {/* Content Table */}
        <div className="liquid-glass-elevated rounded-2xl p-6 animate-liquid-morph" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Content Library</h3>
            <Button className="liquid-glass-surface hover:liquid-glass-elevated">
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </div>
          
          <AdminDataTable
            data={mockContent}
            columns={columns}
            actions={actions}
            filters={filters}
            searchPlaceholder="Search content by title, author..."
            isLoading={isLoading}
            onExport={() => console.log('Export content')}
          />
        </div>
      </div>
    </PageChakraTheme>
  );
}