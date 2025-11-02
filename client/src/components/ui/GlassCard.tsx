import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  blur = 'md',
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <div
      className={`
        bg-white/80 backdrop-blur-md
        border border-white/20
        rounded-2xl shadow-2xl shadow-black/5
        ${blurClasses[blur]}
        ${className}
      `}
    >
      {children}
    </div>
  );
};