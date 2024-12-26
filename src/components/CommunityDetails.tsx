import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import { EmphasisButton } from './EmphasisButton';
import type { CommunityDetails as CommunityDetailsType } from '../types';

interface CommunityDetailsProps {
  details: CommunityDetailsType;
  onChange: (updates: Partial<CommunityDetailsType>) => void;
}

const AMENITIES = [
  'Pool',
  'Gym',
  'Garden',
  'Gated',
  'Security',
  'Elevator',
  'Doorman',
  'Office',
  'Other'
];

export function CommunityDetails({ details, onChange }: CommunityDetailsProps) {
  const handleEmphasisChange = (amenity: string) => {
    const newEmphasis = [...(details.emphasis || [])];
    const index = newEmphasis.indexOf(`amenity_${amenity}`);
    if (index === -1) {
      newEmphasis.push(`amenity_${amenity}`);
    } else {
      newEmphasis.splice(index, 1);
    }
    onChange({ emphasis: newEmphasis });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    let newAmenities = [...(details.amenities || [])];
    if (checked) {
      newAmenities.push(amenity);
    } else {
      newAmenities = newAmenities.filter(a => a !== amenity);
    }
    onChange({ amenities: newAmenities });
  };

  return (
    <div className="space-y-6">
      <FormField label="School District">
        <Input
          type="text"
          value={details.schoolDistrict || ''}
          onChange={(e) => onChange({ schoolDistrict: e.target.value })}
          placeholder="Enter school district"
        />
      </FormField>

      <FormField label="Community Amenities">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {AMENITIES.map((amenity) => (
            <div key={amenity} className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={details.amenities?.includes(amenity)}
                  onChange={(e) => handleAmenityChange(amenity, e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <span>{amenity}</span>
              </label>
              <EmphasisButton
                isEmphasized={details.emphasis?.includes(`amenity_${amenity}`)}
                onClick={() => handleEmphasisChange(amenity)}
              />
            </div>
          ))}
        </div>
        {details.amenities?.includes('Other') && (
          <div className="mt-3">
            <Input
              type="text"
              value={details.amenitiesOther || ''}
              onChange={(e) => onChange({ amenitiesOther: e.target.value })}
              placeholder="Specify other amenities"
            />
          </div>
        )}
      </FormField>

      <div className="border-t pt-4">
        <FormField label="POA/HOA Name">
          <Input
            type="text"
            value={details.poaName || ''}
            onChange={(e) => onChange({ poaName: e.target.value })}
            placeholder="Enter property owners association name"
          />
        </FormField>
      </div>
    </div>
  );
}