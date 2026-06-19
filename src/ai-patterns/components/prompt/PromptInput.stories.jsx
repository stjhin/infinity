import React from 'react'
import PromptInput from './PromptInput'
import { propControl, eventControl } from '../../../storybook/controlGroups'
import { listModels } from '../../registry/ModelRegistry'

const meta = {
  title: 'AI Patterns/Prompt/PromptInput',
  component: PromptInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: propControl({ name: 'Placeholder', control: { type: 'text' } }),
    disabled: propControl({ name: 'Disabled', control: { type: 'boolean' } }),
    onSubmit: eventControl(),
  },
}

export default meta

export const Default = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16, maxWidth: 600 }}>
      <PromptInput
        onSubmit={(text, modelId) => alert(`Submitted: "${text}"\nModel: ${modelId}`)}
        models={listModels()}
      />
    </div>
  ),
}

export const Disabled = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16, maxWidth: 600 }}>
      <PromptInput
        disabled
        placeholder="Chat is disabled..."
        onSubmit={() => {}}
        models={listModels()}
      />
    </div>
  ),
}

export const NoModelSelector = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16, maxWidth: 600 }}>
      <PromptInput
        onSubmit={(text) => alert(`Submitted: "${text}"`)}
        models={[listModels()[0]]}
      />
    </div>
  ),
}

export const CustomPlaceholder = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-family-base)', padding: 16, maxWidth: 600 }}>
      <PromptInput
        placeholder="Describe the UI component you need..."
        onSubmit={(text) => alert(`Submitted: "${text}"`)}
        models={listModels()}
      />
    </div>
  ),
}
