import React from 'react';
import { History, Search, Trash2 } from 'lucide-react';
import type { SearchHistory as SearchHistoryType } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDate } from '../../utils/helpers';
import { EmptyState } from '../common/EmptyState';

interface SearchHistoryProps {
  history: SearchHistoryType[];
  onSearchClick?: (term: string) => void;
  loading?: boolean;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({
  history,
  onSearchClick,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Search History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Search History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon="📚"
            title="No search history"
            description="Your search history will appear here"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='border bg-white rounded-lg border-gray-700'>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Search History</span>
          </div>
          {/* <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            className="text-gray-500 flex items-center justify-center hover:text-red-600"
          >
            Clear
          </Button> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto scroll-smooth scrollbar-thin">
          {history.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150 group"
            >
              <div className="flex-1 min-w-0">
                <button
                  onClick={() => onSearchClick?.(item.term)}
                  className="text-left w-full"
                >
                  <p className="font-medium text-gray-900 truncate hover:text-primary-600 transition-colors">
                    {item.term}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(item.timestamp)}
                  </p>
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon={Search}
                onClick={() => onSearchClick?.(item.term)}
                className="opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity duration-200 text-gray-500 hover:text-primary-600"
              >
                Search
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};