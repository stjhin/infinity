import React from 'react'
import TypingIndicator from './TypingIndicator'
import { propControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Indicators/TypingIndicator',
  component: TypingIndicator,
  tags: ['autodocs'],
  argTypes: {
    label: propControl({ name: 'Label', control: { type: 'text' } }),
    size: propControl({
      name: 'Size',
      control: { type: 'radio' },
      options: ['small', 'medium'],
    }),
  },
}

export default meta

export const Default = {
  args: { label: 'AI is typing', size: 'medium' },
}

export const Small = {
  args: { label: 'Thinking...', size: 'small' },
}
