import React from 'react'
import SourcesPanel from './SourcesPanel'
import { propControl } from '../../../storybook/controlGroups'

const SAMPLE_SOURCES = [
  { id: '1', title: 'React Hooks Documentation', url: 'https://react.dev/reference/react/hooks', confidence: 0.95 },
  { id: '2', title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook', confidence: 0.88 },
  { id: '3', title: 'Community Patterns Guide', confidence: 0.62 },
  { id: '4', title: 'Third-party tutorial', confidence: 0.35 },
  { id: '5', title: 'Wikipedia: React (software)', url: 'https://en.wikipedia.org/wiki/React_(software)', confidence: 0.78 },
]

const meta = {
  title: 'AI Patterns/Reasoning/SourcesPanel',
  component: SourcesPanel,
  tags: ['autodocs'],
  argTypes: {
    layout: propControl({
      name: 'Layout',
      control: { type: 'radio' },
      options: ['inline', 'grouped', 'panel'],
    }),
  },
}

export default meta

export const Inline = {
  args: { sources: SAMPLE_SOURCES, layout: 'inline' },
}

export const Grouped = {
  args: { sources: SAMPLE_SOURCES, layout: 'grouped' },
}

export const Panel = {
  args: { sources: SAMPLE_SOURCES, layout: 'panel' },
}

export const Empty = {
  args: { sources: [], layout: 'inline' },
}
