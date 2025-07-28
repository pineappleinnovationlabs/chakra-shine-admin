import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Search,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  className?: string;
}

export interface TableAction<T> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'default' | 'danger';
  show?: (item: T) => boolean;
}

export interface FilterOption {
  key: string;
  label: string;
  options: Array<{ value: string; label: string }>;
}

interface AdminDataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction<T>[];
  filters?: FilterOption[];
  searchPlaceholder?: string;
  isLoading?: boolean;
  pageSize?: number;
  onExport?: () => void;
  className?: string;
}

export function AdminDataTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  filters = [],
  searchPlaceholder = "Search...",
  isLoading = false,
  pageSize = 10,
  onExport,
  className
}: AdminDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [selectedItems, setSelectedItems] = useState<Set<any>>(new Set());

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => item[key] === value);
      }
    });

    return result;
  }, [data, searchTerm, selectedFilters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return prev.direction === 'asc' 
          ? { key, direction: 'desc' }
          : null;
      }
      return { key, direction: 'asc' };
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === paginatedData.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedData.map((_, index) => index)));
    }
  };

  const handleSelectItem = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const defaultActions: TableAction<T>[] = [
    {
      id: 'view',
      label: 'View',
      icon: <Eye className="w-4 h-4" />,
      onClick: () => {},
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: () => {},
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: () => {},
      variant: 'danger',
    }
  ];

  const allActions = actions.length > 0 ? actions : defaultActions;

  if (isLoading) {
    return (
      <GlassCard className={cn("p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-white/5 rounded"></div>
            ))}
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header Controls */}
      <GlassCard className="p-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input pl-10"
            />
          </div>

          {/* Filters and Actions */}
          <div className="flex items-center gap-2">
            {/* Filters */}
            {filters.map((filter) => (
              <select
                key={filter.key}
                value={selectedFilters[filter.key] || ''}
                onChange={(e) => setSelectedFilters(prev => ({
                  ...prev,
                  [filter.key]: e.target.value
                }))}
                className="glass-input text-sm"
              >
                <option value="">{filter.label}</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ))}

            {/* Export Button */}
            {onExport && (
              <button
                onClick={onExport}
                className="px-4 py-2 rounded-lg bg-chakra-third-eye/20 hover:bg-chakra-third-eye/30 text-white border border-white/10 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/60">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </span>
          {selectedItems.size > 0 && (
            <span className="text-chakra-crown">
              {selectedItems.size} items selected
            </span>
          )}
        </div>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-chakra-crown focus:ring-chakra-crown"
                  />
                </th>
                {columns.map((column) => (
                  <th
                    key={column.key as string}
                    className={cn(
                      "text-left p-4 text-white/80 font-medium text-sm",
                      column.sortable && "cursor-pointer hover:text-white transition-colors",
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key as string)}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortConfig?.key === column.key && (
                        <span className="text-chakra-crown">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {allActions.length > 0 && (
                  <th className="text-left p-4 text-white/80 font-medium text-sm w-20">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(index)}
                      onChange={() => handleSelectItem(index)}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-chakra-crown focus:ring-chakra-crown"
                    />
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.key as string}
                      className={cn("p-4 text-white/90 text-sm", column.className)}
                    >
                      {column.render
                        ? column.render(item[column.key as keyof T], item)
                        : item[column.key as keyof T]
                      }
                    </td>
                  ))}
                  {allActions.length > 0 && (
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {allActions
                          .filter(action => !action.show || action.show(item))
                          .slice(0, 2)
                          .map((action) => (
                            <button
                              key={action.id}
                              onClick={() => action.onClick(item)}
                              className={cn(
                                "p-1.5 rounded-lg transition-colors",
                                action.variant === 'danger'
                                  ? "hover:bg-chakra-root/20 text-chakra-root"
                                  : "hover:bg-white/10 text-white/60 hover:text-white"
                              )}
                              title={action.label}
                            >
                              {action.icon}
                            </button>
                          ))}
                        {allActions.filter(action => !action.show || action.show(item)).length > 2 && (
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <div className="text-sm text-white/60">
              Page {currentPage} of {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white/60 hover:text-white transition-colors"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="px-3 py-1 text-sm text-white">
                {currentPage}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white/60 hover:text-white transition-colors"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}