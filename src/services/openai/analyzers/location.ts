import { MetroArea, LocationContext } from './types';

const MAJOR_METROS: Record<string, MetroArea> = {
  'New York': {
    center: 'New York City',
    state: 'NY',
    suburbs: [
      'Long Island', 'Westchester', 'Jersey City', 'Newark', 'Yonkers',
      'Stamford', 'White Plains', 'New Rochelle'
    ],
    commuteBenefits: [
      'Access to world-class career opportunities',
      'Extensive public transportation options',
      'Cultural and entertainment venues',
      'Diverse dining and shopping'
    ]
  },
  'Los Angeles': {
    center: 'Los Angeles',
    state: 'CA',
    suburbs: [
      'Santa Monica', 'Pasadena', 'Glendale', 'Long Beach', 'Burbank',
      'Beverly Hills', 'Culver City', 'Manhattan Beach'
    ],
    commuteBenefits: [
      'Entertainment industry opportunities',
      'Year-round outdoor lifestyle',
      'Diverse cultural experiences',
      'Tech industry hub access'
    ]
  },
  // Add more major metros as needed
};

function calculateCommuteContext(city: string, state: string): LocationContext | null {
  // Check if the city is a major metro center
  const metroMatch = Object.entries(MAJOR_METROS).find(([_, metro]) => 
    metro.center.toLowerCase() === city.toLowerCase() && 
    metro.state === state
  );
  
  if (metroMatch) {
    return {
      type: 'METRO_CENTER',
      metro: metroMatch[0],
      benefits: metroMatch[1].commuteBenefits
    };
  }

  // Check if the city is a suburb of a major metro
  const suburbanMatch = Object.entries(MAJOR_METROS).find(([_, metro]) => 
    metro.suburbs.some(suburb => 
      suburb.toLowerCase() === city.toLowerCase()
    ) && metro.state === state
  );

  if (suburbanMatch) {
    return {
      type: 'SUBURB',
      metro: suburbanMatch[0],
      benefits: suburbanMatch[1].commuteBenefits
    };
  }

  return null;
}

function analyzeSchoolDistrict(district: string): string[] {
  const benefits: string[] = [];
  
  if (district) {
    benefits.push(
      'Educational opportunities for families',
      'Community-focused environment',
      'Potential for strong property value retention'
    );
  }
  
  return benefits;
}

export function analyzeLocation(city: string, state: string, schoolDistrict?: string): {
  context: LocationContext | null;
  benefits: string[];
} {
  const commuteContext = calculateCommuteContext(city, state);
  const schoolBenefits = schoolDistrict ? analyzeSchoolDistrict(schoolDistrict) : [];
  
  const benefits = [
    ...(commuteContext?.benefits || []),
    ...schoolBenefits
  ];

  return {
    context: commuteContext,
    benefits
  };
}