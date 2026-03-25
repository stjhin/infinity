import React from 'react'
import Button from './Button'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'

const STYLE_OPTIONS = [
  'default/primary',
  'default/tertiary',
  'confirm/primary',
  'confirm/tertiary',
  'danger/primary',
  'danger/tertiary',
  'loading',
]
// Fallback inline SVG icon (guaranteed to render even if external asset server is down)
const DEFAULT_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

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
    leadingIconUrl: slotControl({ name: 'Leading icon URL', control: { type: 'text' } }),
    hasTrailingIcon: slotControl({ name: 'Has trailing icon', control: { type: 'boolean' } }),
    trailingIconUrl: slotControl({ name: 'Trailing icon URL', control: { type: 'text' } }),
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
  const { variant, size, btnType, disabled, children, hasLeadingIcon, leadingIconUrl, hasTrailingIcon, trailingIconUrl, className } = args
  const styleProps = mapStyleToProps(variant)

  const resolvedLeadingIcon = hasLeadingIcon ? ((leadingIconUrl || '').trim() ? leadingIconUrl.trim() : DEFAULT_ICON) : undefined
  const resolvedTrailingIcon = hasTrailingIcon ? ((trailingIconUrl || '').trim() ? trailingIconUrl.trim() : DEFAULT_ICON) : undefined

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
    children: 'Primary',
    hasLeadingIcon: false,
    leadingIconUrl: '',
    hasTrailingIcon: false,
    trailingIconUrl: '',
    className: '',
  },
}
