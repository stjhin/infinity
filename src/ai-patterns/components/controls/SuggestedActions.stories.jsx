import React from 'react'
import SuggestedActions from './SuggestedActions'
import { propControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Controls/SuggestedActions',
  component: SuggestedActions,
  tags: ['autodocs'],
  argTypes: {
    orientation: propControl({
      name: 'Orientation',
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    }),
  },
}

export default meta

export const Horizontal = {
  args: {
    orientation: 'horizontal',
    actions: [
      { label: 'Explain this further', icon: 'help', onClick: () => {} },
      { label: 'Show me an example', onClick: () => {} },
      { label: 'What about performance?', icon: 'speed', onClick: () => {} },
      { label: 'Regenerate', icon: 'refresh', onClick: () => {} },
    ],
  },
}

export const Vertical = {
  args: {
    orientation: 'vertical',
    actions: [
      { label: 'Summarize this conversation', icon: 'summarize', onClick: () => {} },
      { label: 'Export as document', icon: 'file_export', onClick: () => {} },
      { label: 'Start new thread', icon: 'add_comment', onClick: () => {} },
    ],
  },
}

export const Empty = {
  args: { actions: [] },
}
