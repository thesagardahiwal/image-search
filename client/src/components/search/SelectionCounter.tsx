import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface SelectionCounterProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export const SelectionCounter: React.FC<SelectionCounterProps> = ({
  selectedCount,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200 rounded-lg animate-scale-in">
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-5 h-5 text-primary-600" />
        <div>
          <p className="text-primary-800 font-medium">
            {selectedCount} image{selectedCount !== 1 ? 's' : ''} selected
          </p>
          <p className="text-primary-600 text-sm">
            Click on images to select/deselect them
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        icon={X}
        onClick={onClearSelection}
        className="text-primary-600 hover:text-primary-700"
      >
        Clear
      </Button>
    </div>
  );
};