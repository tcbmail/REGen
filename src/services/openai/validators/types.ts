export type ValidationLevel = 'required' | 'optional' | 'ignore';

export interface ValidationRule {
  field: string;
  level: ValidationLevel;
  type: 'string' | 'number' | 'boolean' | 'array';
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: RegExp;
  customValidation?: (value: any) => boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  sanitizedData: Record<string, any>;
}