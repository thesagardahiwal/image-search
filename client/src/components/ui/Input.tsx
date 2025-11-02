import React, { forwardRef } from 'react';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  label?: string;
  variant?: 'default' | 'filled' | 'outlined';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon: Icon,
      error,
      label,
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-white border-gray-300 focus:border-primary-500 focus:ring-primary-500',
      filled: 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary-500 focus:ring-primary-500',
      outlined: 'bg-transparent border-gray-300 focus:border-primary-500 focus:ring-primary-500',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3 border rounded-xl
              placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-opacity-20
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${Icon ? 'pl-12' : 'pl-4'}
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : variantClasses[variant]}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';