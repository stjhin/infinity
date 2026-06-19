import React from 'react'
import ExplainabilityPanel from './ExplainabilityPanel'
import { listModels } from '../../registry/ModelRegistry'
import { propControl } from '../../../storybook/controlGroups'

const models = listModels()

const meta = {
  title: 'AI Patterns/Reasoning/ExplainabilityPanel',
  component: ExplainabilityPanel,
  tags: ['autodocs'],
  argTypes: {
    confidence: propControl({ name: 'Confidence', control: { type: 'number', min: 0, max: 1, step: 0.05 } }),
    explanation: propControl({ name: 'Explanation', control: { type: 'text' } }),
  },
}

export default meta

export const HighConfidence = {
  args: {
    confidence: 0.92,
    explanation: 'This response is based on official React documentation and verified TypeScript patterns. All code examples have been syntax-checked.',
    model: models[0],
  },
}

export const MediumConfidence = {
  args: {
    confidence: 0.65,
    explanation: 'Response draws from community resources and general programming knowledge. Specific API details may vary across library versions.',
    model: models[1],
  },
}

export const LowConfidence = {
  args: {
    confidence: 0.28,
    explanation: 'Limited training data available for this topic. Response should be verified against authoritative sources before use.',
    model: models[1],
  },
}

export const WithoutModel = {
  args: {
    confidence: 0.75,
    explanation: 'General reasoning based on common software design patterns.',
  },
}
