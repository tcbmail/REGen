// Update the formatNearbyAttractions function
import { analyzeAttractions } from './analyzers/attractions';

// ... (keep existing imports and interfaces)

function formatNearbyAttractions(attractions: string): PropertyFeature {
  const analyses = analyzeAttractions(attractions);
  
  const benefits = analyses.flatMap(analysis => {
    const specificBenefits = analysis.benefits.map(b => 
      `${b.benefit}: ${b.details}`
    );
    
    if (analysis.lifestyleImpact) {
      specificBenefits.push(analysis.lifestyleImpact);
    }
    
    return specificBenefits;
  });

  const context = analyses.map(analysis => {
    let context = `${analysis.name} - ${analysis.type.toLowerCase()} attraction`;
    if (analysis.seasonality) {
      context += `\nSeasonality: ${analysis.seasonality}`;
    }
    if (analysis.targetDemographic) {
      context += `\nIdeal for: ${analysis.targetDemographic}`;
    }
    return context;
  }).join('\n\n');

  return {
    name: 'Nearby Attractions',
    value: attractions,
    context,
    benefits
  };
}

// ... (keep rest of the file the same)