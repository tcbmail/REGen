import { validateData } from '../validators/validator';
import { propertyRules, houseRules } from '../validators/rules';
import type { FormState } from '../../../types';

export function formatPropertyData(formState: FormState): string {
  // Validate and sanitize property details
  const propertyValidation = validateData(formState.propertyDetails, propertyRules);
  const houseValidation = validateData(formState.houseDetails, houseRules);

  if (!propertyValidation.isValid) {
    console.error('Property validation failed:', propertyValidation.errors);
    throw new Error('Invalid property data');
  }

  const { sanitizedData: property } = propertyValidation;
  const { sanitizedData: house } = houseValidation;

  let description = '';

  // Only add sections if they have valid data
  if (property.address && property.city && property.state) {
    description += `Location: ${[property.address, property.city, property.state, property.zipCode]
      .filter(Boolean)
      .join(', ')}\n`;
  }

  // Add specifications only if they exist
  const specs = [
    property.bedrooms && `${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}`,
    property.bathrooms && `${property.bathrooms} bathroom${property.bathrooms !== 1 ? 's' : ''}`,
    property.squareFootage && `${property.squareFootage.toLocaleString()} square feet`
  ].filter(Boolean);

  if (specs.length > 0) {
    description += `Specifications: ${specs.join(', ')}\n`;
  }

  // Add house details only if they exist
  if (house.propertyType || house.yearBuilt) {
    const details = [
      house.propertyType,
      house.yearBuilt && `built in ${house.yearBuilt}`
    ].filter(Boolean);
    
    if (details.length > 0) {
      description += `Property Details: ${details.join(', ')}\n`;
    }
  }

  return description.trim();
}