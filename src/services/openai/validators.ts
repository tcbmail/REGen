import type { FormState } from '../../types';

interface ValidationResult {
  isValid: boolean;
  data: Partial<FormState>;
}

function removeEmptyValues<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // Remove undefined, null, empty strings, and empty arrays
    if (value === undefined || value === null || value === '' || 
       (Array.isArray(value) && value.length === 0)) {
      return acc;
    }
    
    // Recursively clean nested objects
    if (typeof value === 'object' && !Array.isArray(value)) {
      const cleaned = removeEmptyValues(value);
      if (Object.keys(cleaned).length > 0) {
        acc[key as keyof T] = cleaned as T[keyof T];
      }
      return acc;
    }
    
    acc[key as keyof T] = value;
    return acc;
  }, {} as Partial<T>);
}

export function validateFormData(formState: FormState): ValidationResult {
  // Remove all empty/undefined values
  const cleanData = removeEmptyValues(formState);
  
  // Check required fields
  const requiredFields = [
    'propertyDetails.address',
    'propertyDetails.city',
    'propertyDetails.state',
    'propertyDetails.listingType'
  ];
  
  const missingRequired = requiredFields.some(field => {
    const [section, key] = field.split('.');
    return !(cleanData[section as keyof FormState] as any)?.[key];
  });

  return {
    isValid: !missingRequired,
    data: cleanData
  };
}