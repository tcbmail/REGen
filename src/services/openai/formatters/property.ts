import type { PropertyDetails } from '../../../types';

interface FormattedProperty {
  location: string;
  specs: string[];
  price?: string;
  condition?: string;
  features: string[];
}

export function formatPropertyDetails(details: Partial<PropertyDetails>): FormattedProperty {
  const formatted: FormattedProperty = {
    location: [
      details.address,
      details.city,
      details.state,
      details.zipCode
    ].filter(Boolean).join(', '),
    specs: [],
    features: []
  };

  // Add specifications if they exist
  if (details.bedrooms) {
    formatted.specs.push(`${details.bedrooms} bedroom${details.bedrooms > 1 ? 's' : ''}`);
  }
  if (details.bathrooms) {
    formatted.specs.push(`${details.bathrooms} bathroom${details.bathrooms > 1 ? 's' : ''}`);
  }
  if (details.squareFootage) {
    formatted.specs.push(`${details.squareFootage.toLocaleString()} square feet`);
  }

  // Add price if available and meant to be shown
  if (details.priceDisplay === 'show' && details.price) {
    formatted.price = details.price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  }

  // Add condition if provided
  if (details.condition) {
    formatted.condition = details.condition;
  }

  // Add special features if provided
  if (details.specialEnhancements) {
    formatted.features.push(details.specialEnhancements);
  }

  return formatted;
}