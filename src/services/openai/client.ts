import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!key) {
    throw new Error(
      'OpenAI API key is missing. Please create a .env file in the project root with:\n' +
      'VITE_OPENAI_API_KEY=your-api-key-here\n' +
      'Make sure to replace "your-api-key-here" with your actual OpenAI API key.'
    );
  }

  if (key === 'your-api-key-here' || key.includes('...')) {
    throw new Error(
      'Please replace the placeholder API key with your actual OpenAI API key in the .env file.'
    );
  }

  return key;
}

function validateApiKey(key: string): void {
  if (typeof key !== 'string') {
    throw new Error('OpenAI API key must be a string.');
  }

  if (!key.startsWith('sk-')) {
    throw new Error(
      'Invalid OpenAI API key format. The key should:\n' +
      '1. Start with "sk-"\n' +
      '2. Be approximately 51 characters long\n' +
      'Please check your .env file and ensure you\'ve copied the entire key correctly.'
    );
  }

  if (key.length < 40) {
    throw new Error(
      'The provided OpenAI API key appears to be incomplete. ' +
      'Please make sure you\'ve copied the entire key from your OpenAI dashboard.'
    );
  }
}

export function initializeOpenAI(): OpenAI {
  try {
    if (openai) return openai;

    const key = getApiKey();
    validateApiKey(key);

    openai = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true
    });

    return openai;
  } catch (error) {
    console.error('OpenAI initialization error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

export function getOpenAIClient(): OpenAI {
  if (!openai) {
    return initializeOpenAI();
  }
  return openai;
}