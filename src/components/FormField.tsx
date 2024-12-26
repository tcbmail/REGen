import React from 'react';
import { clsx } from 'clsx';
import { EmphasisButton } from './EmphasisButton';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  canEmphasize?: boolean;
  isEmphasized?: boolean;
  onEmphasisChange?: () => void;
}

export function FormField({ 
  label, 
  children, 
  required = false, 
  className,
  canEmphasize = false,
  isEmphasized = false,
  onEmphasisChange
}: FormFieldProps) {
  return (
    <div className={clsx("mb-4", className)}>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {canEmphasize && onEmphasisChange && (
          <EmphasisButton
            isEmphasized={isEmphasized}
            onClick={onEmphasisChange}
          />
        )}
      </div>
      {children}
    </div>
  );
}