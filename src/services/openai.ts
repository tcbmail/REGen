import OpenAI from 'openai';
import type { FormState } from '../types';

let openai: OpenAI | null = null;

function formatFormStateForPrompt(formState: FormState): string {
  return `
Property Description Request:
- Location: ${formState.propertyDetails.address}, ${formState.propertyDetails.city}, ${formState.propertyDetails.state}
- Type: ${formState.propertyDetails.propertyType}
- Price: ${formState.propertyDetails.priceDisplay === 'show' ? `$${formState.propertyDetails.price?.toLocaleString()}` : 'Contact for pricing'}
- Bedrooms: ${formState.propertyDetails.bedrooms || 'N/A'}
- Bathrooms: ${formState.propertyDetails.bathrooms || 'N/A'}
- Square Footage: ${formState.propertyDetails.squareFootage || 'N/A'}
- Special Features: ${formState.propertyDetails.specialEnhancements || 'None'}
- Target Audience: ${formState.tone}
- Output Type: ${formState.outputType}
- Language: ${formState.inSpanish ? 'Spanish' : 'English'}
${formState.outputType === 'MLS' ? `- Character Limit: ${formState.mlsCharacterLimit}` : ''}
${formState.includeCallToAction ? '- Include call to action' : ''}

Emphasized Features:
${[
  ...formState.propertyDetails.emphasis || [],
  ...formState.lotLocationDetails.emphasis || [],
  ...formState.houseDetails.emphasis || [],
  ...formState.communityDetails.emphasis || []
].map(feature => `- ${feature}`).join('\n')}
`;
}

function validateApiKey(key: string | undefined): string {
  // Debug: Log the environment variable (but not the full key for security)
  if (key) {
    console.log('API Key prefix:', key.substring(0, 5) + '...');
  } else {
    console.log('API Key is undefined');
  }

  if (!key) {
    throw new Error(
      'OpenAI API key is missing. Please add your API key to the .env file:\n\n' +
      'VITE_OPENAI_API_KEY=sk-your-api-key\n\n' +
      'Make sure to restart the development server after updating the .env file.'
    );
  }

  // Remove any whitespace that might have been accidentally added
  key = key.trim();

  if (!key.startsWith('sk-')) {
    throw new Error(
      'Invalid OpenAI API key format. The key must start with "sk-". ' +
      'Please check your .env file and ensure:\n' +
      '1. The key starts with "sk-"\n' +
      '2. There are no extra spaces or quotes around the key\n' +
      '3. The key was copied correctly from your OpenAI dashboard'
    );
  }

  return key;
}

export function initializeOpenAI(): OpenAI {
  if (openai) return openai;

  try {
    // Debug: Log all environment variables (excluding the actual API key)
    console.log('Available environment variables:', 
      Object.keys(import.meta.env)
        .filter(key => key.includes('OPENAI'))
        .join(', ')
    );

    const key = validateApiKey(import.meta.env.VITE_OPENAI_API_KEY);

    openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true
    });

    return openai;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to initialize OpenAI';
    console.error('OpenAI initialization error:', message);
    throw new Error(message);
  }
}

export async function generateDescription(formState: FormState): Promise<string> {
  try {
    const client = initializeOpenAI();
    const prompt = formatFormStateForPrompt(formState);

    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional real estate description writer. Create compelling property descriptions that:
- Highlight key features, especially emphasized ones
- Appeal to the specified target audience
- Maintain appropriate length and tone for the output type
- Include call to action if requested
- Use natural, engaging language
${formState.outputType === 'MLS' ? `- Stay within ${formState.mlsCharacterLimit} characters` : ''}
${formState.inSpanish ? '- Write in Spanish' : '- Write in English'}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const description = completion.choices[0]?.message?.content;
    
    if (!description) {
      throw new Error('Failed to generate description. Please try again.');
    }

    return description;
  } catch (error) {
    if (error instanceof Error) {
      // Handle specific OpenAI API errors
      if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your OpenAI API key in the .env file.');
      }
      if (error.message.includes('429')) {
        throw new Error('API rate limit exceeded. Please try again later.');
      }
      if (error.message.includes('500') || error.message.includes('503')) {
        throw new Error('OpenAI service is temporarily unavailable. Please try again later.');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred while generating the description.');
  }
}