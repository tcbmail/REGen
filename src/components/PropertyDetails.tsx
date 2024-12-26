import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { CurrencyInput } from './CurrencyInput';
import type { PropertyDetails as PropertyDetailsType } from '../types';

const LISTING_TYPE_OPTIONS = [
  { value: 'sale', label: 'For Sale' },
  { value: 'rent', label: 'For Rent' }
];

const PRICE_DISPLAY_OPTIONS = [
  { value: 'show', label: 'Show Price' },
  { value: 'inquire', label: 'Inquire for Price' },
  { value: 'auction', label: 'Auction' }
];

interface PropertyDetailsProps {
  details: PropertyDetailsType;
  onChange: (updates: Partial<PropertyDetailsType>) => void;
}

export function PropertyDetails({ details, onChange }: PropertyDetailsProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField label="Address" required className="md:col-span-2">
        <Input
          type="text"
          value={details.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Street address"
          required
        />
      </FormField>

      <FormField label="City" required>
        <Input
          type="text"
          value={details.city}
          onChange={(e) => onChange({ city: e.target.value })}
          placeholder="City"
          required
        />
      </FormField>

      <FormField label="State" required>
        <Input
          type="text"
          value={details.state}
          onChange={(e) => onChange({ state: e.target.value })}
          placeholder="State"
          required
        />
      </FormField>

      <FormField label="ZIP Code">
        <Input
          type="text"
          value={details.zipCode}
          onChange={(e) => onChange({ zipCode: e.target.value })}
          placeholder="ZIP Code"
        />
      </FormField>

      <FormField label="County">
        <Input
          type="text"
          value={details.county}
          onChange={(e) => onChange({ county: e.target.value })}
          placeholder="County"
        />
      </FormField>

      <FormField label="Listing Type" required>
        <Select
          value={details.listingType}
          onChange={(e) => onChange({ listingType: e.target.value as PropertyDetailsType['listingType'] })}
          options={LISTING_TYPE_OPTIONS}
          required
        />
      </FormField>

      <FormField label="Price Display" required className="md:col-span-2">
        <Select
          value={details.priceDisplay}
          onChange={(e) => onChange({ 
            priceDisplay: e.target.value as PropertyDetailsType['priceDisplay'],
            price: e.target.value !== 'show' ? undefined : details.price
          })}
          options={PRICE_DISPLAY_OPTIONS}
          required
        />
      </FormField>

      {details.priceDisplay === 'show' && (
        <FormField 
          label="Price" 
          required 
          className="md:col-span-2"
          canEmphasize
          isEmphasized={details.emphasis?.includes('price')}
          onEmphasisChange={() => handleEmphasisChange('price')}
        >
          <CurrencyInput
            value={details.price || 0}
            onChange={(value) => onChange({ price: value })}
            placeholder="Enter price"
            required
          />
        </FormField>
      )}

      <FormField label="Bedrooms">
        <Input
          type="number"
          value={details.bedrooms || ''}
          onChange={(e) => onChange({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="Number of bedrooms"
          min="0"
        />
      </FormField>

      <FormField label="Bathrooms">
        <Input
          type="number"
          value={details.bathrooms || ''}
          onChange={(e) => onChange({ bathrooms: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="Number of bathrooms"
          min="0"
          step="0.5"
        />
      </FormField>

      <FormField 
        label="Square Footage" 
        className="md:col-span-2"
        canEmphasize
        isEmphasized={details.emphasis?.includes('squareFootage')}
        onEmphasisChange={() => handleEmphasisChange('squareFootage')}
      >
        <Input
          type="number"
          value={details.squareFootage || ''}
          onChange={(e) => onChange({ squareFootage: e.target.value ? Number(e.target.value) : undefined })}
          placeholder="Total square footage"
          min="0"
        />
      </FormField>

      <FormField 
        label="Property Condition" 
        className="md:col-span-2"
        canEmphasize
        isEmphasized={details.emphasis?.includes('condition')}
        onEmphasisChange={() => handleEmphasisChange('condition')}
      >
        <textarea
          value={details.condition || ''}
          onChange={(e) => onChange({ condition: e.target.value })}
          placeholder="Describe the property's current condition"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
      </FormField>

      <FormField 
        label="Special Enhancements" 
        className="md:col-span-2"
        canEmphasize
        isEmphasized={details.emphasis?.includes('specialEnhancements')}
        onEmphasisChange={() => handleEmphasisChange('specialEnhancements')}
      >
        <textarea
          value={details.specialEnhancements || ''}
          onChange={(e) => onChange({ specialEnhancements: e.target.value })}
          placeholder="List any special features, upgrades, or recent improvements"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
      </FormField>

      <FormField 
        label="Deficiencies" 
        className="md:col-span-2"
        canEmphasize
        isEmphasized={details.emphasis?.includes('deficiencies')}
        onEmphasisChange={() => handleEmphasisChange('deficiencies')}
      >
        <textarea
          value={details.deficiencies || ''}
          onChange={(e) => onChange({ deficiencies: e.target.value })}
          placeholder="List any known issues or needed repairs"
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        />
      </FormField>
    </div>
  );
}