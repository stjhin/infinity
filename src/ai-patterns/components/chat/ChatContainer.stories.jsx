import React from 'react'
import ChatContainer from './ChatContainer'
import { listModels } from '../../registry/ModelRegistry'
import PromptInput from '../prompt/PromptInput'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const models = listModels()

const meta = {
  title: 'AI Patterns/Chat/ChatContainer',
  component: ChatContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full chat interface composing all AI pattern components: messages, streaming text, typing/thinking indicators, chain of thought, sources, explainability panel, suggested actions, and prompt input.',
      },
    },
  },
  argTypes: {
    headerTitle: propControl({ name: 'Header Title', control: { type: 'text' } }),
  },
}

export default meta

export const Default = {
  args: {
    headerTitle: 'Infinity AI Assistant',
    models,
    persona: {
      name: 'Infinity Assistant',
      description: 'Your AI-powered design system companion.',
    },
    quickReplies: [
      { label: 'Create a Button component', icon: 'smart_button', onClick: () => {} },
      { label: 'Explain design tokens', icon: 'palette', onClick: () => {} },
      { label: 'Check accessibility', icon: 'accessibility', onClick: () => {} },
      { label: 'Review my code', icon: 'rate_review', onClick: () => {} },
    ],
  },
}

export const WithInitialMessages = {
  args: {
    headerTitle: 'Infinity AI Assistant',
    models,
    initialMessages: [
      {
        id: 'init-1',
        role: 'system',
        content: 'Conversation started. Model: DeepSeek V4 Pro.',
        timestamp: Date.now() - 300000,
      },
      {
        id: 'init-2',
        role: 'user',
        content: 'How do I create an accessible button component?',
        timestamp: Date.now() - 240000,
      },
      {
        id: 'init-3',
        role: 'ai',
        content: 'To create an accessible button component, start with semantic HTML using the `<button>` element. Ensure it has a visible focus indicator, supports keyboard navigation, and includes proper ARIA attributes when needed. Use the Infinity Button component which already handles these concerns — it includes focus rings, aria-disabled, aria-busy for loading states, and full keyboard support.',
        timestamp: Date.now() - 230000,
        sources: [
          { id: 's1', title: 'WCAG 2.1 - Button Guidelines', url: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value', confidence: 0.95 },
          { id: 's2', title: 'Infinity Button Component Docs', url: './?path=/docs/components-button--docs', confidence: 0.88 },
        ],
      },
    ],
    persona: {
      name: 'Infinity Assistant',
      description: 'Your AI-powered design system companion.',
    },
    quickReplies: [
      { label: 'Show me the code', icon: 'code', onClick: () => {} },
      { label: 'What about color contrast?', icon: 'contrast', onClick: () => {} },
    ],
    thinking: [
      { phase: 'understanding', label: 'Understanding query', content: 'Parsing question about accessible buttons.' },
      { phase: 'planning', label: 'Planning approach', content: 'Outline WCAG guidelines, keyboard support, focus indicators, ARIA attributes.' },
      { phase: 'executing', label: 'Executing...', content: 'Generating detailed response with code references.' },
      { phase: 'outputting', label: 'Generating response', content: 'Formatting final answer.' },
    ],
    confidence: 0.88,
    explanation: 'Response is based on WCAG 2.1 AA standards and the Infinity design system component library.',
  },
}

export const EmptyState = {
  args: {
    headerTitle: 'New Conversation',
    models,
    quickReplies: [
      { label: 'Create a component', icon: 'widgets', onClick: () => {} },
      { label: 'Review accessibility', icon: 'accessibility', onClick: () => {} },
      { label: 'Design token help', icon: 'palette', onClick: () => {} },
    ],
  },
}

export const PromptInputOnly = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16 }}>
      <h3>PromptInput Standalone</h3>
      <PromptInput
        onSubmit={(text, modelId) => alert(`Submit: "${text}" with ${modelId}`)}
        models={models}
      />
    </div>
  ),
}