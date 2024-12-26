import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { Select } from './Select';
import { OtherInput } from './OtherInput';
import { EmphasisButton } from './EmphasisButton';
import type { HouseDetails as HouseDetailsType } from '../types';

const PROPERTY_TYPE_OPTIONS = [
  { value: 'House', label: 'House' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Condo', label: 'Condo' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Co-Op', label: 'Co-Op' },
  { value: 'Manufactured Home', label: 'Manufactured Home' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Duplex', label: 'Duplex' },
  { value: 'Multifamily', label: 'Multifamily' },
  { value: 'Other', label: 'Other' }
];

const FOUNDATION_OPTIONS = [
  { value: 'Slab', label: 'Slab' },
  { value: 'Basement', label: 'Basement' },
  { value: 'Crawl Space', label: 'Crawl Space' },
  { value: 'Pier & Beam', label: 'Pier & Beam' },
  { value: 'Other', label: 'Other' }
];

const BASEMENT_TYPES = [
  'Finished',
  'Partially Finished',
  'Unfinished',
  'Walk Out'
];

const FENCE_OPTIONS = [
  { value: 'Wood', label: 'Wood' },
  { value: 'PVC', label: 'PVC' },
  { value: 'Chain Link', label: 'Chain Link' },
  { value: 'Metal', label: 'Metal' },
  { value: 'Other', label: 'Other' }
];

const ARCHITECTURAL_STYLES = [
  { value: 'Colonial', label: 'Colonial' },
  { value: 'Contemporary', label: 'Contemporary' },
  { value: 'Craftsman', label: 'Craftsman' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Modern', label: 'Modern' },
  { value: 'Ranch', label: 'Ranch' },
  { value: 'Traditional', label: 'Traditional' },
  { value: 'Tudor', label: 'Tudor' },
  { value: 'Victorian', label: 'Victorian' },
  { value: 'Other', label: 'Other' }
];

const ADDITIONAL_STRUCTURES = [
  'Guest Cottage/House',
  'Pool House',
  'Shed',
  'Shop',
  'Barn',
  'Detached Garage',
  'Other'
];

interface HouseDetailsProps {
  details: HouseDetailsType;
  onChange: (updates: Partial<HouseDetailsType>) => void;
}

export function HouseDetails({ details, onChange }: HouseDetailsProps) {
  const handleEmphasisChange = (feature: string) => {
    const newEmphasis = [...(details.emphasis || [])];
    const index = newEmphasis.indexOf(feature);
    if (index === -1) {
      newEmphasis.push(feature);
    } else {
      newEmphasis.splice(index, 1);
    }
    onChange({ emphasis: newEmphasis });
  };

  const handleBasementTypeChange = (type: string, checked: boolean) => {
    let newTypes = [...(details.basementType || [])];
    if (checked) {
      newTypes.push(type);
    } else {
      newTypes = newTypes.filter(t => t !== type);
    }
    onChange({ basementType: newTypes });
  };

  const handleAdditionalStructuresChange = (structure: string, checked: boolean) => {
    let newStructures = [...(details.additionalStructures || [])];
    if (checked) {
      newStructures.push(structure);
    } else {
      newStructures = newStructures.filter(s => s !== structure);
    }
    onChange({ additionalStructures: newStructures });
  };

  return (
    <div className="space-y-6">
      <FormField 
        label="Property Type" 
        required
        canEmphasize
        isEmphasized={details.emphasis?.includes('propertyType')}
        onEmphasisChange={() => handleEmphasisChange('propertyType')}
      >
        <Select
          value={details.propertyType}
          onChange={(e) => onChange({ propertyType: e.target.value })}
          options={PROPERTY_TYPE_OPTIONS}
          required
        />
        <OtherInput
          show={details.propertyType === 'Other'}
          value={details.propertyTypeOther || ''}
          onChange={(value) => onChange({ propertyTypeOther: value })}
          placeholder="Specify property type"
        />
      </FormField>

      <FormField 
        label="Architectural Style"
        canEmphasize
        isEmphasized={details.emphasis?.includes('architecturalStyle')}
        onEmphasisChange={() => handleEmphasisChange('architecturalStyle')}
      >
        <Select
          value={details.architecturalStyle}
          onChange={(e) => onChange({ architecturalStyle: e.target.value })}
          options={[{ value: '', label: 'Select Style' }, ...ARCHITECTURAL_STYLES]}
        />
        <OtherInput
          show={details.architecturalStyle === 'Other'}
          value={details.architecturalStyleOther || ''}
          onChange={(value) => onChange({ architecturalStyleOther: value })}
          placeholder="Specify architectural style"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Year Built"
          canEmphasize
          isEmphasized={details.emphasis?.includes('yearBuilt')}
          onEmphasisChange={() => handleEmphasisChange('yearBuilt')}
        >
          <Input
            type="number"
            value={details.yearBuilt || ''}
            onChange={(e) => onChange({ yearBuilt: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Year built"
            min="1800"
            max={new Date().getFullYear()}
          />
        </FormField>

        <FormField 
          label="Number of Levels"
          canEmphasize
          isEmphasized={details.emphasis?.includes('levels')}
          onEmphasisChange={() => handleEmphasisChange('levels')}
        >
          <Input
            type="number"
            value={details.levels || ''}
            onChange={(e) => onChange({ levels: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Number of levels"
            min="1"
          />
        </FormField>

        <FormField 
          label="Garage Spaces"
          canEmphasize
          isEmphasized={details.emphasis?.includes('garageSpaces')}
          onEmphasisChange={() => handleEmphasisChange('garageSpaces')}
        >
          <Input
            type="number"
            value={details.garageSpaces || ''}
            onChange={(e) => onChange({ garageSpaces: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Number of garage spaces"
            min="0"
          />
        </FormField>

        <FormField 
          label="Carport Spaces"
          canEmphasize
          isEmphasized={details.emphasis?.includes('carportSpaces')}
          onEmphasisChange={() => handleEmphasisChange('carportSpaces')}
        >
          <Input
            type="number"
            value={details.carportSpaces || ''}
            onChange={(e) => onChange({ carportSpaces: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Number of carport spaces"
            min="0"
          />
        </FormField>
      </div>

      <FormField 
        label="Foundation Type"
        required
        canEmphasize
        isEmphasized={details.emphasis?.includes('foundation')}
        onEmphasisChange={() => handleEmphasisChange('foundation')}
      >
        <Select
          value={details.foundation}
          onChange={(e) => onChange({ foundation: e.target.value })}
          options={FOUNDATION_OPTIONS}
          required
        />
        <OtherInput
          show={details.foundation === 'Other'}
          value={details.foundationOther || ''}
          onChange={(value) => onChange({ foundationOther: value })}
          placeholder="Specify foundation type"
        />
        
        {details.foundation === 'Basement' && (
          <div className="mt-4 pl-4 border-l-2 border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Basement Type</h4>
            <div className="grid grid-cols-2 gap-3">
              {BASEMENT_TYPES.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={details.basementType?.includes(type)}
                    onChange={(e) => handleBasementTypeChange(type, e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </FormField>

      <FormField 
        label="Fence Type"
        canEmphasize
        isEmphasized={details.emphasis?.includes('fenceType')}
        onEmphasisChange={() => handleEmphasisChange('fenceType')}
      >
        <Select
          value={details.fenceType || ''}
          onChange={(e) => onChange({ fenceType: e.target.value })}
          options={[{ value: '', label: 'No Fence' }, ...FENCE_OPTIONS]}
        />
        <OtherInput
          show={details.fenceType === 'Other'}
          value={details.fenceTypeOther || ''}
          onChange={(value) => onChange({ fenceTypeOther: value })}
          placeholder="Specify fence type"
        />
      </FormField>

      <FormField label="Features">
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'inGroundPool', label: 'In-Ground Pool', key: 'hasInGroundPool' },
            { id: 'aboveGroundPool', label: 'Above Ground Pool', key: 'hasAboveGroundPool' },
            { id: 'porch', label: 'Porch', key: 'hasPorch' },
            { id: 'deck', label: 'Deck', key: 'hasDeck' },
            { id: 'patio', label: 'Patio', key: 'hasPatio' },
            { id: 'handicapAccessible', label: 'Handicap Accessible', key: 'isHandicapAccessible' },
            { id: 'furnished', label: 'Furnished', key: 'isFurnished' }
          ].map(({ id, label, key }) => (
            <div key={id} className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={details[key as keyof HouseDetailsType] as boolean}
                  onChange={(e) => onChange({ [key]: e.target.checked })}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span>{label}</span>
              </label>
              <EmphasisButton
                isEmphasized={details.emphasis?.includes(id)}
                onClick={() => handleEmphasisChange(id)}
              />
            </div>
          ))}
        </div>
      </FormField>

      <FormField label="Additional Structures">
        <div className="grid grid-cols-2 gap-3">
          {ADDITIONAL_STRUCTURES.map((structure) => (
            <div key={structure} className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={details.additionalStructures?.includes(structure)}
                  onChange={(e) => handleAdditionalStructuresChange(structure, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span>{structure}</span>
              </label>
              <EmphasisButton
                isEmphasized={details.emphasis?.includes(`structure_${structure}`)}
                onClick={() => handleEmphasisChange(`structure_${structure}`)}
              />
            </div>
          ))}
        </div>
        {details.additionalStructures?.includes('Other') && (
          <div className="mt-2">
            <Input
              type="text"
              value={details.additionalStructuresOther || ''}
              onChange={(e) => onChange({ additionalStructuresOther: e.target.value })}
              placeholder="Specify other structures"
            />
          </div>
        )}
      </FormField>
    </div>
  );
}