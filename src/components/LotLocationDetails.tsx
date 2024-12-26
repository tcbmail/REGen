import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { OtherInput } from './OtherInput';
import { CurrencyInput } from './CurrencyInput';
import type { LotLocationDetails as LotLocationDetailsType } from '../types';

interface LotLocationDetailsProps {
  details: LotLocationDetailsType;
  onChange: (updates: Partial<LotLocationDetailsType>) => void;
}

const VIEW_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'River', label: 'River' },
  { value: 'Lake', label: 'Lake' },
  { value: 'Ocean', label: 'Ocean' },
  { value: 'Bay', label: 'Bay' },
  { value: 'Canal', label: 'Canal' },
  { value: 'Stream/Creek', label: 'Stream/Creek' },
  { value: 'Mountain', label: 'Mountain' },
  { value: 'Golf Course', label: 'Golf Course' },
  { value: 'Scenic', label: 'Scenic' },
  { value: 'Park', label: 'Park' },
  { value: 'Woods/Forest', label: 'Woods/Forest' },
  { value: 'Farm/Field', label: 'Farm/Field' },
  { value: 'Other', label: 'Other' }
];

const HOA_FREQUENCY_OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' }
];

export function LotLocationDetails({ details, onChange }: LotLocationDetailsProps) {
  const handleEmphasisChange = (field: string) => {
    const newEmphasis = [...(details.emphasis || [])];
    const index = newEmphasis.indexOf(field);
    if (index === -1) {
      newEmphasis.push(field);
    } else {
      newEmphasis.splice(index, 1);
    }
    onChange({ emphasis: newEmphasis });
  };

  return (
    <div className="space-y-6">
      {/* Location Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Neighborhood/Subdivision"
          canEmphasize
          isEmphasized={details.emphasis?.includes('neighborhood')}
          onEmphasisChange={() => handleEmphasisChange('neighborhood')}
        >
          <Input
            type="text"
            value={details.neighborhood}
            onChange={(e) => onChange({ neighborhood: e.target.value })}
            placeholder="Enter neighborhood or subdivision"
          />
        </FormField>

        <FormField 
          label="Lot Size"
          canEmphasize
          isEmphasized={details.emphasis?.includes('lotSize')}
          onEmphasisChange={() => handleEmphasisChange('lotSize')}
        >
          <Input
            type="text"
            value={details.lotSize}
            onChange={(e) => onChange({ lotSize: e.target.value })}
            placeholder="e.g., 0.25 acres or 10,890 sqft"
          />
        </FormField>
      </div>

      {/* Attractions and Features */}
      <div className="grid grid-cols-1 gap-4">
        <FormField 
          label="Nearby Attractions"
          canEmphasize
          isEmphasized={details.emphasis?.includes('nearbyAttractions')}
          onEmphasisChange={() => handleEmphasisChange('nearbyAttractions')}
        >
          <Input
            type="text"
            value={details.nearbyAttractions}
            onChange={(e) => onChange({ nearbyAttractions: e.target.value })}
            placeholder="Schools, shopping, parks, entertainment, etc."
          />
        </FormField>

        <FormField 
          label="Topography"
          canEmphasize
          isEmphasized={details.emphasis?.includes('topography')}
          onEmphasisChange={() => handleEmphasisChange('topography')}
        >
          <Input
            type="text"
            value={details.topography}
            onChange={(e) => onChange({ topography: e.target.value })}
            placeholder="e.g., Flat, Sloped, Rolling, Wooded, etc."
          />
        </FormField>
      </div>

      {/* View Options */}
      <div className="grid grid-cols-1 gap-4">
        <FormField 
          label="View"
          canEmphasize
          isEmphasized={details.emphasis?.includes('view')}
          onEmphasisChange={() => handleEmphasisChange('view')}
        >
          <Select
            value={details.view}
            onChange={(e) => onChange({ view: e.target.value as LotLocationDetailsType['view'] })}
            options={VIEW_OPTIONS}
          />
          <OtherInput
            show={details.view === 'Other'}
            value={details.viewOther || ''}
            onChange={(value) => onChange({ viewOther: value })}
            placeholder="Specify view type"
          />
        </FormField>
      </div>

      {/* HOA/POA Section */}
      <div className="border-t pt-4">
        <FormField 
          label="POA/HOA"
          canEmphasize
          isEmphasized={details.emphasis?.includes('hoa')}
          onEmphasisChange={() => handleEmphasisChange('hoa')}
        >
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={details.hasHOA}
                onChange={(e) => onChange({ hasHOA: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Property has POA/HOA fees</span>
            </div>
            
            {details.hasHOA && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Fee Amount</label>
                  <CurrencyInput
                    value={details.hoaFee || 0}
                    onChange={(value) => onChange({ hoaFee: value })}
                    placeholder="Enter HOA fee amount"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Frequency</label>
                  <Select
                    value={details.hoaFeeFrequency || 'monthly'}
                    onChange={(e) => onChange({ hoaFeeFrequency: e.target.value as LotLocationDetailsType['hoaFeeFrequency'] })}
                    options={HOA_FREQUENCY_OPTIONS}
                  />
                </div>
              </div>
            )}
          </div>
        </FormField>
      </div>

      {/* Property Taxes */}
      <div className="border-t pt-4">
        <FormField 
          label="Last Year's Taxes"
          canEmphasize
          isEmphasized={details.emphasis?.includes('lastYearTaxes')}
          onEmphasisChange={() => handleEmphasisChange('lastYearTaxes')}
        >
          <div>
            <CurrencyInput
              value={details.lastYearTaxes || 0}
              onChange={(value) => onChange({ lastYearTaxes: value })}
              placeholder="Enter last year's tax amount"
            />
            <p className="mt-1 text-xs text-gray-500 italic">
              * This amount does not reflect future taxes and is provided for reference only.
            </p>
          </div>
        </FormField>
      </div>
    </div>
  );
}