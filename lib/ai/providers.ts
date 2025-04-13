import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { groq } from '@ai-sdk/groq';
import { xai } from '@ai-sdk/xai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

const openrouter = createOpenRouter({
  baseURL: process.env.OPENROUTER_BASE_URL,
  apiKey: process.env.OPENROUTER_API_KEY,
});

const chatModel = openrouter.chat('anthropic/claude-3.7-sonnet');
// const chatModel = openrouter.chat('google/gemma-3-27b-it');


/* import { isTestEnvironment } from '../constants';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test'; */

export const myProvider = /* isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  :  */customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': wrapLanguageModel({
          model: chatModel,
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': chatModel,
        'artifact-model': chatModel,
      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
