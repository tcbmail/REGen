import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import type { SellerDetails as SellerDetailsType } from '../types';

interface SellerDetailsProps {
  details: SellerDetailsType;
  onChange: (updates: Partial<SellerDetailsType>) => void;
}

const CONTACT_METHOD_OPTIONS = [
  { value: 'website', label: 'Website' },
  { value: 'phone', label: 'Phone' },
  { value: 'text', label: 'Text' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'email', label: 'Email' }
];

function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length >= 10) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  } else if (numbers.length >= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  } else if (numbers.length >= 3) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  }
  return numbers;
}

export function SellerDetails({ details, onChange }: SellerDetailsProps) {
  const handlePhoneChange = (field: 'phone' | 'textNumber', value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 10);
    onChange({ [field]: numbers });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={details.includeSeller}
            onChange={(e) => onChange({ includeSeller: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">Include seller information in description</span>
        </label>
      </div>

      {details.includeSeller && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Agent Name" required>
              <Input
                type="text"
                value={details.agentName}
                onChange={(e) => onChange({ agentName: e.target.value })}
                placeholder="Enter agent name"
                required
              />
            </FormField>

            <FormField label="Agency/Broker">
              <Input
                type="text"
                value={details.agency}
                onChange={(e) => onChange({ agency: e.target.value })}
                placeholder="Enter agency or broker name"
              />
            </FormField>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Website">
                <Input
                  type="text"
                  value={details.website}
                  onChange={(e) => onChange({ website: e.target.value })}
                  placeholder="www.example.com"
                />
              </FormField>

              <FormField label="Phone Number">
                <Input
                  type="tel"
                  value={formatPhoneNumber(details.phone)}
                  onChange={(e) => handlePhoneChange('phone', e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </FormField>

              <FormField label="Text Number">
                <Input
                  type="tel"
                  value={formatPhoneNumber(details.textNumber)}
                  onChange={(e) => handlePhoneChange('textNumber', e.target.value)}
                  placeholder="(123) 456-7890"
                />
              </FormField>

              <FormField label="Facebook ID">
                <Input
                  type="text"
                  value={details.facebookId}
                  onChange={(e) => onChange({ facebookId: e.target.value })}
                  placeholder="Facebook username or ID"
                />
              </FormField>

              <FormField label="Email">
                <Input
                  type="email"
                  value={details.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                  placeholder="agent@example.com"
                />
              </FormField>

              <FormField label="Preferred Contact Method" required>
                <Select
                  value={details.preferredContact}
                  onChange={(e) => onChange({ preferredContact: e.target.value as SellerDetailsType['preferredContact'] })}
                  options={CONTACT_METHOD_OPTIONS}
                  required
                />
              </FormField>
            </div>
          </div>
        </>
      )}
    </div>
  );
}