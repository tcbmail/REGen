interface TouristDestination {
  name: string;
  type: 'ENTERTAINMENT' | 'OUTDOOR' | 'CULTURAL' | 'SHOPPING';
  features: string[];
  benefits: string[];
  seasonality?: string;
  demographics: string[];
}

interface DestinationCity {
  name: string;
  state: string;
  type: 'TOURIST' | 'METRO' | 'SUBURBAN' | 'RURAL';
  mainAttractions: string[];
  benefits: string[];
  seasonality?: string;
  demographics: string[];
}

const TOURIST_CITIES: Record<string, DestinationCity> = {
  'branson': {
    name: 'Branson',
    state: 'MO',
    type: 'TOURIST',
    mainAttractions: [
      'Live Entertainment Shows',
      'Silver Dollar City',
      'Table Rock Lake',
      'Branson Landing',
      'Titanic Museum'
    ],
    benefits: [
      'Year-round entertainment options',
      'Family-friendly atmosphere',
      'Outdoor recreation opportunities',
      'Shopping and dining destinations',
      'Strong vacation rental market'
    ],
    seasonality: 'Peak season March-December, with special holiday events',
    demographics: [
      'Families seeking entertainment',
      'Retirees',
      'Music and theater enthusiasts',
      'Outdoor recreation lovers'
    ]
  },
  // Add more tourist cities as needed
};

export function analyzeTouristDestination(location: string): DestinationCity | null {
  // Normalize the location string
  const normalizedLocation = location.toLowerCase().trim();
  
  // Check if it's a known tourist city
  for (const [key, city] of Object.entries(TOURIST_CITIES)) {
    if (normalizedLocation.includes(key)) {
      return city;
    }
  }
  
  return null;
}