import React from 'react'
import Badge from './Badge'
import { propControl, slotControl } from '../../../storybook/controlGroups'
import googleIconNames from '../../../data/googleIconNames.json'
import figmaDocs from './Badge.figma.generated'

const VARIANT_OPTIONS = ['single-digit', 'double-digit', 'dot']
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Notifications Patterns/Badge/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
    },
  },
  argTypes: {
    variant: propControl({
      name: 'Style',
      description: 'Badge style from Figma: Single Digit, Double Digit, Dot.',
      control: { type: 'radio' },
      options: VARIANT_OPTIONS,
      labels: {
        'single-digit': 'Single Digit',
        'double-digit': 'Double Digit',
        dot: 'Dot',
      },
    }),
    count: slotControl({
      name: 'Count',
      description: 'Number shown inside the count pill (ignored for the dot style).',
      control: { type: 'text' },
    }),
    iconName: propControl({
      name: 'Icon',
      description: 'Google Material Symbol name for the container icon.',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    label: slotControl({
      name: 'Label',
      description: 'Caption text shown under the icon container.',
      control: { type: 'text' },
    }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
  },
}

export default meta

const renderBadge = (args) => <Badge {...args} />

const BASE_ARGS = {
  variant: 'single-digit',
  count: '4',
  iconName: 'notifications',
  label: 'Single Digit',
  className: '',
}

export const SingleDigit = {
  render: renderBadge,
  name: 'Single digit',
  args: { ...BASE_ARGS },
}

export const DoubleDigit = {
  render: renderBadge,
  name: 'Double digit',
  args: {
    ...BASE_ARGS,
    variant: 'double-digit',
    count: '12',
    iconName: 'mail',
    label: 'Double Digit',
  },
}

export const Dot = {
  render: renderBadge,
  name: 'Dot',
  args: {
    ...BASE_ARGS,
    variant: 'dot',
    iconName: 'chat_bubble',
    label: 'Dot Indicator',
  },
}
