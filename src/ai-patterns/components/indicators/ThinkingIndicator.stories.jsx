import React from 'react'
import ThinkingIndicator from './ThinkingIndicator'
import { propControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Indicators/ThinkingIndicator',
  component: ThinkingIndicator,
  tags: ['autodocs'],
  argTypes: {
    phase: propControl({
      name: 'Phase',
      control: { type: 'select' },
      options: ['idle', 'understanding', 'planning', 'executing', 'outputting'],
    }),
    label: propControl({ name: 'Label', control: { type: 'text' } }),
    isActive: propControl({ name: 'Active', control: { type: 'boolean' } }),
  },
}

export default meta

export const Understanding = {
  args: { phase: 'understanding', label: 'Understanding query', isActive: true },
}

export const Planning = {
  args: { phase: 'planning', label: 'Planning approach', isActive: true },
}

export const Executing = {
  args: { phase: 'executing', label: 'Executing...', isActive: true },
}

export const Outputting = {
  args: { phase: 'outputting', label: 'Generating response', isActive: false },
}

export const Idle = {
  args: { phase: 'idle', isActive: false },
}
