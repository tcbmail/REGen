import { get, set } from 'lodash-es';

function isEmptyValue(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

export function sanitizeData(data: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  function sanitizeObject(obj: Record<string, any>, parentPath = ''): void {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitizeObject(value, currentPath);
      } else if (!isEmptyValue(value)) {
        set(sanitized, currentPath, value);
      }
    });
  }

  sanitizeObject(data);
  return sanitized;
}