import { ValidationRule } from './types';

export const propertyRules: ValidationRule[] = [
  {
    field: 'address',
    level: 'required',
    type: 'string',
    minLength: 1
  },
  {
    field: 'city',
    level: 'required',
    type: 'string',
    minLength: 1
  },
  {
    field: 'state',
    level: 'required',
    type: 'string',
    minLength: 2
  },
  {
    field: 'zipCode',
    level: 'optional',
    type: 'string',
    pattern: /^\d{5}(-\d{4})?$/
  },
  {
    field: 'bedrooms',
    level: 'optional',
    type: 'number',
    minValue: 0
  },
  {
    field: 'bathrooms',
    level: 'optional',
    type: 'number',
    minValue: 0
  },
  {
    field: 'squareFootage',
    level: 'optional',
    type: 'number',
    minValue: 0
  }
];

export const houseRules: ValidationRule[] = [
  {
    field: 'propertyType',
    level: 'optional',
    type: 'string'
  },
  {
    field: 'yearBuilt',
    level: 'optional',
    type: 'number',
    minValue: 1800,
    maxValue: new Date().getFullYear()
  }
  // Add more rules as needed
];