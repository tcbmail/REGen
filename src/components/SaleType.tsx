import React from 'react';
import { FormField } from './FormField';
import { Input } from './Input';
import type { SaleType as SaleTypeInterface } from '../types';

interface SaleTypeProps {
  details: SaleTypeInterface;
  onChange: (updates: Partial<SaleTypeInterface>) => void;
}

export function SaleType({ details, onChange }: SaleTypeProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <FormField 
            label="Owner Finance"
            canEmphasize
            isEmphasized={details.emphasis?.includes('ownerFinance')}
            onEmphasisChange={() => handleEmphasisChange('ownerFinance')}
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={details.isOwnerFinance}
                onChange={(e) => onChange({ isOwnerFinance: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span>Owner Finance Available</span>
            </label>
            {details.isOwnerFinance && (
              <Input
                type="text"
                value={details.ownerFinanceTerms || ''}
                onChange={(e) => onChange({ ownerFinanceTerms: e.target.value })}
                placeholder="Enter owner finance terms"
                className="ml-6 mt-2"
              />
            )}
          </FormField>
        </div>

        <div className="space-y-3">
          <FormField 
            label="Lease Option"
            canEmphasize
            isEmphasized={details.emphasis?.includes('leaseOption')}
            onEmphasisChange={() => handleEmphasisChange('leaseOption')}
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={details.isLeaseOption}
                onChange={(e) => onChange({ isLeaseOption: e.target.checked })}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <span>Lease Option Available</span>
            </label>
            {details.isLeaseOption && (
              <Input
                type="text"
                value={details.leaseOptionTerms || ''}
                onChange={(e) => onChange({ leaseOptionTerms: e.target.value })}
                placeholder="Enter lease option terms"
                className="ml-6 mt-2"
              />
            )}
          </FormField>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField 
          label="Foreclosure"
          canEmphasize
          isEmphasized={details.emphasis?.includes('foreclosure')}
          onEmphasisChange={() => handleEmphasisChange('foreclosure')}
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={details.isForeclosure}
              onChange={(e) => onChange({ isForeclosure: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span>Foreclosure</span>
          </label>
        </FormField>

        <FormField 
          label="Short Sale"
          canEmphasize
          isEmphasized={details.emphasis?.includes('shortSale')}
          onEmphasisChange={() => handleEmphasisChange('shortSale')}
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={details.isShortSale}
              onChange={(e) => onChange({ isShortSale: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span>Short Sale</span>
          </label>
        </FormField>

        <FormField 
          label="Tenant Occupied"
          canEmphasize
          isEmphasized={details.emphasis?.includes('tenantOccupied')}
          onEmphasisChange={() => handleEmphasisChange('tenantOccupied')}
        >
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={details.isTenantOccupied}
              onChange={(e) => onChange({ isTenantOccupied: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span>Tenant Occupied</span>
          </label>
        </FormField>
      </div>
    </div>
  );
}