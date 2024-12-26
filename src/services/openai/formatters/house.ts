import type { HouseDetails } from '../../../types';

interface FormattedHouse {
  type?: string;
  style?: string;
  age?: string;
  structure: string[];
  features: string[];
}

export function formatHouseDetails(details: Partial<HouseDetails>): FormattedHouse {
  const formatted: FormattedHouse = {
    structure: [],
    features: []
  };

  // Property type and style
  if (details.propertyType) {
    formatted.type = details.propertyType === 'Other' 
      ? details.propertyTypeOther 
      : details.propertyType;
  }

  if (details.architecturalStyle) {
    formatted.style = details.architecturalStyle === 'Other'
      ? details.architecturalStyleOther
      : details.architecturalStyle;
  }

  // Age/Year built
  if (details.yearBuilt) {
    const age = new Date().getFullYear() - details.yearBuilt;
    formatted.age = age === 0 
      ? 'New construction'
      : age === 1 
        ? '1 year old'
        : `${age} years old`;
  }

  // Structure details
  if (details.levels) {
    formatted.structure.push(`${details.levels} level${details.levels > 1 ? 's' : ''}`);
  }
  if (details.garageSpaces) {
    formatted.structure.push(`${details.garageSpaces} car garage`);
  }
  if (details.carportSpaces) {
    formatted.structure.push(`${details.carportSpaces} car carport`);
  }

  // Features
  if (details.hasInGroundPool) formatted.features.push('In-ground pool');
  if (details.hasAboveGroundPool) formatted.features.push('Above-ground pool');
  if (details.hasPorch) formatted.features.push('Porch');
  if (details.hasDeck) formatted.features.push('Deck');
  if (details.hasPatio) formatted.features.push('Patio');
  if (details.isHandicapAccessible) formatted.features.push('Handicap accessible');
  if (details.isFurnished) formatted.features.push('Furnished');

  return formatted;
}