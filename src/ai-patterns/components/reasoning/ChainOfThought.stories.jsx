import React from 'react'
import ChainOfThought from './ChainOfThought'
import { propControl } from '../../../storybook/controlGroups'

const SAMPLE_STEPS = [
  { phase: 'understanding', label: 'Understanding query', content: 'Parsing user question about React hooks. Identifying key concepts: useState, useEffect, useContext.' },
  { phase: 'planning', label: 'Planning approach', content: 'Outline: 1) Define hooks, 2) Explain useState, 3) Explain useEffect, 4) Explain useContext, 5) Provide code example.' },
  { phase: 'executing', label: 'Executing...', content: 'Generating detailed response with code snippets and best-practice notes.' },
  { phase: 'outputting', label: 'Generating response', content: 'Formatting final answer with proper markdown, code blocks, and links to documentation.' },
]

const meta = {
  title: 'AI Patterns/Reasoning/ChainOfThought',
  component: ChainOfThought,
  tags: ['autodocs'],
  argTypes: {
    isActive: propControl({ name: 'Active', control: { type: 'boolean' } }),
    defaultExpanded: propControl({ name: 'Default Expanded', control: { type: 'boolean' } }),
  },
}

export default meta

export const Active = {
  args: {
    steps: SAMPLE_STEPS,
    isActive: true,
    defaultExpanded: true,
  },
}

export const Collapsed = {
  args: {
    steps: SAMPLE_STEPS,
    isActive: false,
    defaultExpanded: false,
  },
}

export const Completed = {
  args: {
    steps: SAMPLE_STEPS.map((s) => ({ ...s })),
    isActive: false,
    defaultExpanded: true,
  },
}

export const SingleStep = {
  args: {
    steps: [
      { phase: 'understanding', label: 'Understanding query', content: 'Analyzing the user request for design system guidance.' },
    ],
    isActive: true,
    defaultExpanded: true,
  },
}
