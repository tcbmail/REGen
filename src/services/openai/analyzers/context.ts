import { MetroArea, LocationContext } from '../types';

export function analyzeLocationContext(city: string, state: string): LocationContext | null {
  // Add your metro areas data here
  const metroAreas: Record<string, MetroArea> = {
    'New York': {
      center: 'New York City',
      state: 'NY',
      suburbs: ['Brooklyn', 'Queens', 'Bronx', 'Staten Island', 'Long Island'],
      commuteTimes: {
        train: '30-60 minutes',
        car: '45-90 minutes'
      }
    },
    // Add more metro areas
  };

  // Check if the city is a metro center
  const metro = Object.entries(metroAreas).find(([_, data]) => 
    data.center.toLowerCase() === city.toLowerCase() && 
    data.state === state
  );

  if (metro) {
    return {
      type: 'metro',
      name: metro[0],
      context: 'urban core',
      benefits: [
        'Access to business districts',
        'Cultural attractions',
        'Public transportation',
        'Urban amenities'
      ]
    };
  }

  // Check if it's a suburb
  const suburb = Object.entries(metroAreas).find(([_, data]) => 
    data.suburbs.some(s => s.toLowerCase() === city.toLowerCase()) &&
    data.state === state
  );

  if (suburb) {
    return {
      type: 'suburb',
      name: suburb[0],
      context: 'suburban',
      benefits: [
        'Easy commute to city',
        'More space',
        'Quieter environment',
        'Family-friendly'
      ]
    };
  }

  return null;
}