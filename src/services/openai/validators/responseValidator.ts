export function validateResponse(response: string): string {
  // Remove any mentions of audience type
  response = response.replace(/ideal for [^.]+audience/gi, '');
  response = response.replace(/perfect for [^.]+audience/gi, '');
  response = response.replace(/designed for [^.]+audience/gi, '');
  
  // Remove any undefined references
  response = response.replace(/undefined [a-zA-Z]+/gi, '');
  response = response.replace(/with \d+ undefined/gi, '');
  
  // Remove technical field references
  response = response.replace(/yearBuilt/g, 'construction year');
  response = response.replace(/squareFootage/g, 'living space');
  response = response.replace(/propertyType/g, 'home');
  
  // Clean up any double spaces or periods
  response = response.replace(/\s+/g, ' ');
  response = response.replace(/\.+/g, '.');
  
  return response.trim();
}