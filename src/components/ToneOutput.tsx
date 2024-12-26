import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';

interface ToneOutputProps {
  tone: string;
  outputType: string;
  includeCallToAction: boolean;
  inSpanish: boolean;
  mlsCharacterLimit?: number;
  onChange: (updates: any) => void;
}

const TONE_OPTIONS = [
  { value: 'General Audience', label: 'General Audience' },
  { value: 'First Time Home Buyers', label: 'First Time Home Buyers' },
  { value: 'Investors', label: 'Investors' },
  { value: 'Flippers', label: 'Flippers' },
  { value: 'Landlords', label: 'Landlords' },
  { value: 'Vacation Rental Owners', label: 'Vacation Rental Owners' },
  { value: 'Land Speculator', label: 'Land Speculator' },
  { value: 'Farmer', label: 'Farmer' },
  { value: 'Timber Harvester', label: 'Timber Harvester' },
  { value: 'Seasoned Home Owners', label: 'Seasoned Home Owners' },
  { value: 'Foreclosure Seekers', label: 'Foreclosure Seekers' }
];

const OUTPUT_OPTIONS = [
  { value: 'MLS', label: 'MLS Description' },
  { value: 'Website', label: 'Website Description' },
  { value: 'Email', label: 'Email' },
  { value: 'Facebook', label: 'Facebook Post' },
  { value: 'Text', label: 'Text Message' }
];

export function ToneOutput({ tone, outputType, includeCallToAction, inSpanish, mlsCharacterLimit, onChange }: ToneOutputProps) {
  React.useEffect(() => {
    if (outputType === 'MLS' && !mlsCharacterLimit) {
      onChange({ mlsCharacterLimit: 750 });
    }
  }, [outputType]);

  return (
    <div className="space-y-6">
      <FormField label="Target Audience">
        <Select
          value={tone}
          onChange={(e) => onChange({ tone: e.target.value })}
          options={TONE_OPTIONS}
        />
      </FormField>

      <FormField label="Output Type">
        <Select
          value={outputType}
          onChange={(e) => onChange({ outputType: e.target.value })}
          options={OUTPUT_OPTIONS}
        />
      </FormField>

      {outputType === 'MLS' && (
        <FormField label="Character Limit">
          <Input
            type="number"
            value={mlsCharacterLimit || 750}
            onChange={(e) => onChange({ mlsCharacterLimit: Number(e.target.value) })}
            placeholder="Enter MLS character limit"
            min="1"
          />
          <p className="mt-1 text-sm text-gray-500">Default limit: 750 characters</p>
        </FormField>
      )}

      <div className="flex items-center space-x-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeCallToAction}
            onChange={(e) => onChange({ includeCallToAction: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">Include call to action</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inSpanish}
            onChange={(e) => onChange({ inSpanish: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <span className="text-sm text-gray-700">Generate in Spanish</span>
        </label>
      </div>
    </div>
  );
}