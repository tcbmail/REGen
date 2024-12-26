import React from 'react';
import { clsx } from 'clsx';

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export function CurrencyInput({ value, onChange, className, error, ...props }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(rawValue) || 0;
    onChange(numValue);
  };

  // Format with commas but no cents
  const formattedValue = value ? value.toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }) : '';

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
      <input
        {...props}
        type="text"
        value={formattedValue}
        onChange={handleChange}
        className={clsx(
          "w-full pl-7 pr-3 py-2 border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}