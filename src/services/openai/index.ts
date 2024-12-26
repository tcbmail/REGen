import { OpenAIError } from './errors';
import { processFormData } from './validators/dataProcessor';
import { validateResponse } from './validators/responseValidator';
import { SYSTEM_PROMPT, formatPrompt } from './prompts';
import { getOpenAIClient } from './client';
import type { FormState } from '../../types';

export async function generateDescription(formState: FormState): Promise<string> {
  try {
    // Process and validate form data
    const processedData = processFormData(formState);
    
    // Ensure minimum required data
    if (!processedData.propertyDetails?.address || 
        !processedData.propertyDetails?.city || 
        !processedData.propertyDetails?.state) {
      throw new OpenAIError('Missing required property information');
    }

    // Collect emphasized features
    const emphasis = [
      ...(processedData.propertyDetails?.emphasis || []),
      ...(processedData.lotLocationDetails?.emphasis || []),
      ...(processedData.houseDetails?.emphasis || []),
      ...(processedData.communityDetails?.emphasis || [])
    ];

    // Generate the prompt
    const prompt = formatPrompt(processedData, emphasis);

    // Get OpenAI client
    const openai = getOpenAIClient();

    // Generate description
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
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
      throw new OpenAIError('Failed to generate description');
    }

    // Validate and clean the response
    const validatedDescription = validateResponse(description);

    return validatedDescription;
  } catch (error) {
    console.error('Description generation error:', error);
    throw error instanceof OpenAIError ? error : new OpenAIError('Failed to generate description');
  }
}