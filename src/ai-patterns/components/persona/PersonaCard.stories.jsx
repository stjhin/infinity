import React from 'react'
import PersonaCard from './PersonaCard'
import { listModels } from '../../registry/ModelRegistry'
import { propControl } from '../../../storybook/controlGroups'

const models = listModels()

const meta = {
  title: 'AI Patterns/Persona/PersonaCard',
  component: PersonaCard,
  tags: ['autodocs'],
  argTypes: {
    name: propControl({ name: 'Name', control: { type: 'text' } }),
    description: propControl({ name: 'Description', control: { type: 'text' } }),
    avatarUrl: propControl({ name: 'Avatar URL', control: { type: 'text' } }),
  },
}

export default meta

export const Default = {
  args: {
    name: 'Infinity Assistant',
    description: 'Your AI-powered design system companion. I help you build consistent, accessible UIs using the Infinity component library.',
    capabilities: [
      'Component generation',
      'Accessibility auditing',
      'Design token management',
      'Code review',
      'Documentation writing',
    ],
    model: models[0],
  },
}

export const Minimal = {
  args: {
    name: 'Code Reviewer',
    description: 'Reviews pull requests for style, security, and performance issues.',
    capabilities: ['Code review', 'Security scanning'],
  },
}

export const WithModel = {
  args: {
    name: 'GPT-4o Assistant',
    description: 'Multimodal AI assistant capable of understanding images, code, and natural language.',
    capabilities: ['Image analysis', 'Code generation', 'Translation'],
    model: models[2],
  },
}
