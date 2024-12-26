import React, { useState } from 'react';
import { CollapsibleSection } from './components/CollapsibleSection';
import { PropertyDetails } from './components/PropertyDetails';
import { LotLocationDetails } from './components/LotLocationDetails';
import { HouseDetails } from './components/HouseDetails';
import { CommunityDetails } from './components/CommunityDetails';
import { SaleType } from './components/SaleType';
import { SellerDetails } from './components/SellerDetails';
import { ToneOutput } from './components/ToneOutput';
import { DescriptionModal } from './components/DescriptionModal';
import { generateDescription } from './services/openai';
import { initialState } from './initialState';
import type { FormState } from './types';

function App() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [description, setDescription] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsGenerating(true);

    try {
      const generatedDescription = await generateDescription(formState);
      setDescription(generatedDescription);
      setShowModal(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate description');
    } finally {
      setIsGenerating(false);
    }
  };

  const updatePropertyDetails = (updates: Partial<FormState['propertyDetails']>) => {
    setFormState(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        ...updates
      }
    }));
  };

  const updateLotLocationDetails = (updates: Partial<FormState['lotLocationDetails']>) => {
    setFormState(prev => ({
      ...prev,
      lotLocationDetails: {
        ...prev.lotLocationDetails,
        ...updates
      }
    }));
  };

  const updateHouseDetails = (updates: Partial<FormState['houseDetails']>) => {
    setFormState(prev => ({
      ...prev,
      houseDetails: {
        ...prev.houseDetails,
        ...updates
      }
    }));
  };

  const updateCommunityDetails = (updates: Partial<FormState['communityDetails']>) => {
    setFormState(prev => ({
      ...prev,
      communityDetails: {
        ...prev.communityDetails,
        ...updates
      }
    }));
  };

  const updateSaleDetails = (updates: Partial<FormState['saleDetails']>) => {
    setFormState(prev => ({
      ...prev,
      saleDetails: {
        ...prev.saleDetails,
        ...updates
      }
    }));
  };

  const updateSellerDetails = (updates: Partial<FormState['sellerDetails']>) => {
    setFormState(prev => ({
      ...prev,
      sellerDetails: {
        ...prev.sellerDetails,
        ...updates
      }
    }));
  };

  const updateToneOutput = (updates: Partial<Pick<FormState, 'tone' | 'outputType' | 'includeCallToAction' | 'inSpanish' | 'mlsCharacterLimit'>>) => {
    setFormState(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Real Estate Description Generator
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <CollapsibleSection title="Property Details" defaultOpen>
            <PropertyDetails
              details={formState.propertyDetails}
              onChange={updatePropertyDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Lot & Location Details">
            <LotLocationDetails
              details={formState.lotLocationDetails}
              onChange={updateLotLocationDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="House Details">
            <HouseDetails
              details={formState.houseDetails}
              onChange={updateHouseDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Community Details">
            <CommunityDetails
              details={formState.communityDetails}
              onChange={updateCommunityDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Sale Details">
            <SaleType
              details={formState.saleDetails}
              onChange={updateSaleDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Seller Details">
            <SellerDetails
              details={formState.sellerDetails}
              onChange={updateSellerDetails}
            />
          </CollapsibleSection>

          <CollapsibleSection title="Tone & Output">
            <ToneOutput
              tone={formState.tone}
              outputType={formState.outputType}
              includeCallToAction={formState.includeCallToAction}
              inSpanish={formState.inSpanish}
              mlsCharacterLimit={formState.mlsCharacterLimit}
              onChange={updateToneOutput}
            />
          </CollapsibleSection>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating...' : 'Generate Description'}
            </button>
          </div>
        </form>

        {showModal && (
          <DescriptionModal
            description={description}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;