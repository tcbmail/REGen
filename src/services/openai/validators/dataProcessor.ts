import { get } from 'lodash-es';

export function processFormData(data: Record<string, any>): Record<string, any> {
  const processed: Record<string, any> = {};

  // Only process fields with actual values
  function processValue(value: any): any {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'string' && value.trim() === '') return undefined;
    if (Array.isArray(value) && value.length === 0) return undefined;
    if (typeof value === 'object' && !Array.isArray(value)) {
      const processedObj = processObject(value);
      return Object.keys(processedObj).length > 0 ? processedObj : undefined;
    }
    return value;
  }

  function processObject(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    
    Object.entries(obj).forEach(([key, value]) => {
      const processed = processValue(value);
      if (processed !== undefined) {
        result[key] = processed;
      }
    });
    
    return result;
  }

  return processObject(data);
}