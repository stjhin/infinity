import React from 'react'
import QuickReply from './QuickReply'
import { propControl, eventControl } from '../../../storybook/controlGroups'

const meta = {
  title: 'AI Patterns/Controls/QuickReply',
  component: QuickReply,
  tags: ['autodocs'],
  argTypes: {
    label: propControl({ name: 'Label', control: { type: 'text' } }),
    icon: propControl({ name: 'Icon', control: { type: 'text' } }),
    onClick: eventControl(),
  },
}

export default meta

export const Default = {
  args: { label: 'Explain this further', icon: 'help' },
}

export const NoIcon = {
  args: { label: 'Show me an example' },
}

export const Action = {
  args: { label: 'Regenerate response', icon: 'refresh' },
}

export const FollowUp = {
  args: { label: 'What about performance?', icon: 'speed' },
}
