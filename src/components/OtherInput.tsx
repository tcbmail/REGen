import React from 'react';
import { Input } from './Input';

interface OtherInputProps {
  show: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function OtherInput({ show, value, onChange, placeholder }: OtherInputProps) {
  if (!show) return null;

  return (
    <div className="mt-2">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Please specify"}
      />
    </div>
  );
}