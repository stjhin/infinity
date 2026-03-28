import React from 'react'
import Button from './Button'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'
import googleIconNames from '../data/googleIconNames.json'

const STYLE_OPTIONS = [
  'default/primary',
  'default/tertiary',
  'confirm/primary',
  'confirm/tertiary',
  'danger/primary',
  'danger/tertiary',
  'loading',
]
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: propControl({
      name: 'Variant',
      control: { type: 'select' },
      options: STYLE_OPTIONS,
      labels: {
        'default/primary': 'Default / Primary',
        'default/tertiary': 'Default / Tertiary',
        'confirm/primary': 'Confirm / Primary',
        'confirm/tertiary': 'Confirm / Tertiary',
        'danger/primary': 'Danger / Primary',
        'danger/tertiary': 'Danger / Tertiary',
        loading: 'Loading',
      },
    }),
    btnType: propControl({
      name: 'Type',
      control: { type: 'select' },
      options: ['text', 'dropdown', 'icon-only', 'icon-only-dropdown'],
    }),
    size: propControl({
      name: 'Size',
      control: { type: 'radio' },
      options: ['small', 'medium'],
    }),
    disabled: propControl({ name: 'Disabled', control: { type: 'boolean' } }),
    className: propControl({ name: 'Class name', control: { type: 'text' } }),
    children: slotControl({ name: 'Label', control: { type: 'text' } }),
    hasLeadingIcon: slotControl({ name: 'Has leading icon', control: { type: 'boolean' } }),
    leadingIconName: slotControl({
      name: 'Leading icon',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
      description: 'Google Material Symbol name from fonts.google.com/icons',
    }),
    hasTrailingIcon: slotControl({ name: 'Has trailing icon', control: { type: 'boolean' } }),
    trailingIconName: slotControl({
      name: 'Trailing icon',
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
      description: 'Google Material Symbol name from fonts.google.com/icons',
    }),
    leadingIcon: slotControl({ control: false }),
    trailingIcon: slotControl({ control: false }),
    onClick: eventControl({ control: false }),
  },
}

export default meta

const mapStyleToProps = (style) => {
  if (style === 'loading') return { variant: 'loading' }
  const map = {
    'default/primary': { variant: 'primary' },
    'default/tertiary': { variant: 'tertiary' },
    'confirm/primary': { variant: 'confirm-primary' },
    'confirm/tertiary': { variant: 'confirm-tertiary' },
    'danger/primary': { variant: 'danger-primary' },
    'danger/tertiary': { variant: 'danger-tertiary' },
  }
  return map[style] || { variant: 'primary' }
}

const renderButton = (args) => {
  const { variant, size, btnType, disabled, children, hasLeadingIcon, leadingIconName, hasTrailingIcon, trailingIconName, className } = args
  const styleProps = mapStyleToProps(variant)

  const resolvedLeadingIcon = hasLeadingIcon ? ((leadingIconName || '').trim() || 'add') : undefined
  const resolvedTrailingIcon = hasTrailingIcon ? ((trailingIconName || '').trim() || 'add') : undefined

  const props = {
    ...styleProps,
    size,
    disabled: !!disabled,
    btnType,
    leadingIcon: resolvedLeadingIcon,
    trailingIcon: resolvedTrailingIcon,
    className,
  }

  // no temporary custom overrides — story uses token-driven styles

  return <Button {...props}>{children}</Button>
}

export const Default = {
  name: 'Default',
  render: renderButton,
  args: {
    variant: 'default/primary',
    btnType: 'text',
    size: 'medium',
    disabled: false,
    children: "Button",
    hasLeadingIcon: false,
    leadingIconName: '',
    hasTrailingIcon: false,
    trailingIconName: '',
    className: '',
  },
}
