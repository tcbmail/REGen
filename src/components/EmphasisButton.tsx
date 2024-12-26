import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';

interface EmphasisButtonProps {
  isEmphasized: boolean;
  onClick: () => void;
  className?: string;
}

export function EmphasisButton({ isEmphasized, onClick, className }: EmphasisButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "p-1 rounded-full transition-colors",
        isEmphasized ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-gray-500",
        className
      )}
      title={isEmphasized ? "Remove emphasis" : "Emphasize this field"}
    >
      <Star className={clsx("w-4 h-4", isEmphasized && "fill-current")} />
    </button>
  );
}