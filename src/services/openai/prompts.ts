export const SYSTEM_PROMPT = `You are a professional real estate copywriter creating compelling property descriptions. Follow these critical guidelines:

1. NEVER mention the target audience type in the description
2. NEVER include undefined or missing values
3. Only describe features that are explicitly provided
4. Transform technical details into lifestyle benefits
5. Use natural, conversational language
6. Create specific, property-focused descriptions
7. Avoid technical field names in descriptions
8. Focus on practical benefits and advantages
9. Adapt tone based on property type and price point
10. Include only verified information

When describing locations:
- For tourist areas, highlight specific attractions and their practical benefits
- Explain location advantages in terms of lifestyle benefits
- Include seasonal information when relevant
- Focus on how amenities enhance daily life
- Describe specific lifestyle opportunities

When describing features:
- Location: Focus on practical daily benefits
- Space: Describe functional uses and possibilities
- Features: Explain real-world advantages
- Amenities: Show how they improve quality of life
- Age: Focus on character or modern updates
- Price: Emphasize value proposition`;

export const FEATURE_PROMPT = `Highlight these specific features in natural, conversational language:

{features}

Remember:
- Never mention "emphasis" or "emphasized features"
- Integrate features naturally into the description
- Focus on practical benefits to the owner/resident
- Avoid technical terms or field names
- Don't list features - weave them into the narrative`;

export function formatPrompt(data: any, emphasis: string[]): string {
  // Clean and validate data
  const cleanData = Object.entries(data).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, any>);

  // Format the base property information
  let prompt = 'Property Description Request:\n\n';

  // Add location details if available
  if (cleanData.address && cleanData.city && cleanData.state) {
    prompt += `Location: ${cleanData.address}, ${cleanData.city}, ${cleanData.state}\n`;
  }

  // Add core property details
  const details = [];
  if (cleanData.propertyType) details.push(cleanData.propertyType);
  if (cleanData.bedrooms) details.push(`${cleanData.bedrooms} bedrooms`);
  if (cleanData.bathrooms) details.push(`${cleanData.bathrooms} bathrooms`);
  if (cleanData.squareFootage) details.push(`${cleanData.squareFootage} square feet`);

  if (details.length > 0) {
    prompt += `Property Details: ${details.join(', ')}\n`;
  }

  // Add emphasized features
  if (emphasis.length > 0) {
    prompt += '\nKey Features to Highlight:\n';
    emphasis.forEach(feature => {
      prompt += `- ${feature}\n`;
    });
  }

  // Add output preferences
  prompt += `\nOutput Preferences:
- Type: ${cleanData.outputType || 'Website'}
- Language: ${cleanData.inSpanish ? 'Spanish' : 'English'}
${cleanData.outputType === 'MLS' ? `- Character Limit: ${cleanData.mlsCharacterLimit}` : ''}
${cleanData.includeCallToAction ? '- Include call to action' : ''}`;

  return prompt;
}