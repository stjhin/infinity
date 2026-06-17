import React from 'react'
import Chip from './Chip'
import { eventControl, propControl } from '../storybook/controlGroups'
import googleIconNames from '../data/googleIconNames.json'
import figmaDocs from './Chip.figma.generated'

const STATE_OPTIONS = ['enabled', 'hover', 'pressed', 'disabled']
const VARIANT_OPTIONS = ['filled', 'outlined']
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
    },
  },
  argTypes: {
    state: propControl({
      name: 'State',
      description: figmaDocs.argDescriptions?.state,
      control: { type: 'select' },
      options: STATE_OPTIONS,
      labels: { enabled: 'Enabled', hover: 'Hover', pressed: 'Pressed', disabled: 'Disabled' },
    }),
    variant: propControl({
      name: 'Variant',
      description: figmaDocs.argDescriptions?.variant,
      control: { type: 'radio' },
      options: VARIANT_OPTIONS,
      labels: { filled: 'Filled', outlined: 'Outlined' },
    }),
    label: propControl({
      name: 'Label',
      description: figmaDocs.argDescriptions?.label,
      control: { type: 'text' },
    }),
    hasLeftIcon: propControl({
      name: 'Has left icon',
      description: figmaDocs.argDescriptions?.hasLeftIcon,
      control: { type: 'boolean' },
    }),
    leftIconName: propControl({
      name: 'Left icon',
      description: figmaDocs.argDescriptions?.leftIconName,
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    iconColor: propControl({
      name: 'Icon colour',
      description: 'Set icon colour (white, black, grey, blue, brand, green, red, yellow). Default inherits text.',
      control: { type: 'select' },
      options: ['', 'white', 'black', 'grey', 'blue', 'brand', 'green', 'red', 'yellow'],
    }),
    hasCancel: propControl({
      name: 'Has cancel',
      description: figmaDocs.argDescriptions?.hasCancel,
      control: { type: 'boolean' },
    }),
    onClick: eventControl({ control: false }),
    onCancel: eventControl({ control: false }),
  },
}

export default meta

const renderChip = (args) => <Chip {...args} />

const BASE_ARGS = {
  label: 'Chip',
  state: 'enabled',
  variant: 'filled',
  hasLeftIcon: true,
  leftIconName: 'dark_mode',
  hasCancel: true,
}

export const Filled = {
  render: renderChip,
  name: 'Filled',
  args: {
    ...BASE_ARGS,
    variant: 'filled',
  },
}

export const Outlined = {
  render: renderChip,
  name: 'Outlined',
  args: {
    ...BASE_ARGS,
    variant: 'outlined',
  },
}

export const Hover = {
  render: renderChip,
  name: 'Hover',
  parameters: {
    docs: { description: { story: figmaDocs.variantDescriptions?.['hover/filled'] } },
  },
  args: {
    ...BASE_ARGS,
    state: 'hover',
  },
}

export const Pressed = {
  render: renderChip,
  name: 'Pressed',
  args: {
    ...BASE_ARGS,
    state: 'pressed',
  },
}

export const Disabled = {
  render: renderChip,
  name: 'Disabled',
  args: {
    ...BASE_ARGS,
    state: 'disabled',
  },
}

export const WithoutIcon = {
  render: renderChip,
  name: 'Without icon',
  args: {
    ...BASE_ARGS,
    hasLeftIcon: false,
  },
}

export const WithoutCancel = {
  render: renderChip,
  name: 'Without cancel',
  args: {
    ...BASE_ARGS,
    hasCancel: false,
  },
}