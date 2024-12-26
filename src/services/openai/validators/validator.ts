import { ValidationRule, ValidationResult, ValidationError } from './types';
import { sanitizeData } from './sanitizer';

function validateField(value: any, rule: ValidationRule): ValidationError | null {
  if (rule.level === 'ignore') return null;

  // Required field check
  if (rule.level === 'required' && (value === undefined || value === null || value === '')) {
    return {
      field: rule.field,
      message: `${rule.field} is required`
    };
  }

  // Skip further validation if field is optional and empty
  if (rule.level === 'optional' && (value === undefined || value === null || value === '')) {
    return null;
  }

  // Type validation
  if (rule.type === 'string' && typeof value !== 'string') {
    return {
      field: rule.field,
      message: `${rule.field} must be a string`
    };
  }

  if (rule.type === 'number' && typeof value !== 'number') {
    return {
      field: rule.field,
      message: `${rule.field} must be a number`
    };
  }

  // String-specific validation
  if (rule.type === 'string' && typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return {
        field: rule.field,
        message: `${rule.field} must be at least ${rule.minLength} characters`
      };
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return {
        field: rule.field,
        message: `${rule.field} must be no more than ${rule.maxLength} characters`
      };
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return {
        field: rule.field,
        message: `${rule.field} has an invalid format`
      };
    }
  }

  // Number-specific validation
  if (rule.type === 'number' && typeof value === 'number') {
    if (rule.minValue !== undefined && value < rule.minValue) {
      return {
        field: rule.field,
        message: `${rule.field} must be at least ${rule.minValue}`
      };
    }

    if (rule.maxValue !== undefined && value > rule.maxValue) {
      return {
        field: rule.field,
        message: `${rule.field} must be no more than ${rule.maxValue}`
      };
    }
  }

  // Custom validation
  if (rule.customValidation && !rule.customValidation(value)) {
    return {
      field: rule.field,
      message: `${rule.field} failed custom validation`
    };
  }

  return null;
}

export function validateData(
  data: Record<string, any>,
  rules: ValidationRule[]
): ValidationResult {
  const errors: ValidationError[] = [];
  
  // First pass: validate all fields
  rules.forEach(rule => {
    const error = validateField(data[rule.field], rule);
    if (error) {
      errors.push(error);
    }
  });

  // Second pass: sanitize data if validation passed
  const sanitizedData = errors.length === 0 ? sanitizeData(data) : {};

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData
  };
}