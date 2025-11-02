import React from 'react';
import { Check, Heart, User } from 'lucide-react';
import { type UnsplashImage } from '../../types/index';

interface ImageCardProps {
  image: UnsplashImage;
  selected: boolean;
  onSelect: (imageId: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        selected ? 'ring-2 ring-primary-500 ring-offset-2' : ''
      }`}
      onClick={() => onSelect(image.id)}
    >
      {/* Image */}
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Unsplash image'}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />

      {/* Selection Checkbox */}
      <div
        className={`absolute top-3 left-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          selected
            ? 'bg-primary-500 border-primary-500'
            : 'bg-white/90 border-white/80 group-hover:bg-white group-hover:border-white'
        }`}
      >
        {selected && <Check className="w-3 h-3 text-white" />}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="text-white">
          <p className="font-medium text-sm line-clamp-2 mb-2">
            {image.description || 'No description'}
          </p>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{image.user.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{image.likes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Color Accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: image.color }}
      />
    </div>
  );
};