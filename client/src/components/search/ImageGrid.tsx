import React from 'react';
import { type UnsplashImage } from '../../types';
import { ImageCard } from './ImageCard';
import { EmptyState } from '../common/EmptyState';

interface ImageGridProps {
  images: UnsplashImage[];
  selectedImages: string[];
  onImageSelect: (imageId: string) => void;
  loading?: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  selectedImages,
  onImageSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 rounded-xl h-64 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <EmptyState
        icon="🖼️"
        title="No images found"
        description="Try searching for something else or check your search terms"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          selected={selectedImages.includes(image.id)}
          onSelect={onImageSelect}
        />
      ))}
    </div>
  );
};