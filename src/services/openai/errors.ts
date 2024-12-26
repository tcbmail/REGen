export class OpenAIError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export function handleOpenAIError(error: unknown): never {
  if (error instanceof Error) {
    // API-specific errors
    if (error.message.includes('401')) {
      throw new OpenAIError('Authentication failed. Please verify your OpenAI API key is valid and has not expired.');
    }
    if (error.message.includes('429')) {
      throw new OpenAIError('OpenAI API rate limit exceeded or insufficient quota. Please check your account balance.');
    }
    if (error.message.includes('500')) {
      throw new OpenAIError('OpenAI service error. Please try again in a few moments.');
    }
    if (error.message.includes('503')) {
      throw new OpenAIError('OpenAI service is temporarily unavailable. Please try again later.');
    }
    
    // Pass through validation errors
    if (error.message.includes('API key')) {
      throw error;
    }
    
    throw new OpenAIError(`Failed to generate description: ${error.message}`, error);
  }
  
  throw new OpenAIError('An unexpected error occurred while generating the description.');
}