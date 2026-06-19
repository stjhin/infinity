import React from 'react'
import Source from './Source'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Reasoning/Source',
  component: Source,
  tags: ['autodocs'],
  argTypes: {
    title: propControl({ name: 'Title', control: { type: 'text' } }),
    url: propControl({ name: 'URL', control: { type: 'text' } }),
    confidence: propControl({ name: 'Confidence', control: { type: 'number', min: 0, max: 1, step: 0.05 } }),
    onClick: eventControl(),
  },
}

export default meta

export const WithURL = {
  args: {
    title: 'React Hooks Documentation',
    url: 'https://react.dev/reference/react/hooks',
    confidence: 0.95,
  },
}

export const HighConfidence = {
  args: {
    title: 'Official TypeScript Handbook',
    url: 'https://www.typescriptlang.org/docs/handbook',
    confidence: 0.88,
  },
}

export const MediumConfidence = {
  args: {
    title: 'Community blog post on patterns',
    confidence: 0.62,
  },
}

export const LowConfidence = {
  args: {
    title: 'Unverified third-party source',
    confidence: 0.35,
  },
}

export const NoConfidence = {
  args: {
    title: 'General reference',
    url: 'https://example.com',
  },
}
