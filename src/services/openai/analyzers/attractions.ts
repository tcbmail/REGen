import { analyzeTouristDestination } from './destinations';
import type { AttractionType, AttractionBenefit } from './types';

// ... keep existing ATTRACTION_PATTERNS ...

export function analyzeAttractions(attractions: string): AttractionAnalysis[] {
  const analyses: AttractionAnalysis[] = [];
  
  // Split and clean attraction strings
  const attractionList = attractions
    .split(',')
    .map(a => a.trim())
    .filter(a => a.length > 0);
  
  for (const attraction of attractionList) {
    // First check if it's a known tourist destination
    const touristDest = analyzeTouristDestination(attraction);
    
    if (touristDest) {
      analyses.push({
        type: 'TOURIST_DESTINATION',
        name: touristDest.name,
        benefits: touristDest.benefits.map(benefit => ({
          benefit,
          details: 'Known tourist destination advantage'
        })),
        lifestyleImpact: `Located near ${touristDest.name}, offering ${touristDest.mainAttractions.join(', ')}. 
          ${touristDest.benefits.join('. ')}`,
        seasonality: touristDest.seasonality,
        targetDemographic: touristDest.demographics.join(', ')
      });
      continue;
    }
    
    // Fall back to regular attraction analysis
    const regularAnalysis = analyzeAttraction(attraction);
    analyses.push(regularAnalysis);
  }
  
  return analyses;
}