import React from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({ options, className, error, ...props }: SelectProps) {
  return (
    <div>
      <select
        {...props}
        className={clsx(
          "w-full px-3 py-2 border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}