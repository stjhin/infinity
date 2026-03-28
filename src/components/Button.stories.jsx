import React from 'react'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import Button from './Button'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'
import googleIconNames from '../data/googleIconNames.json'
import figmaDocs from './Button.figma.generated'

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
const DEFAULT_VARIANT_KEY = 'default/primary'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: figmaDocs.componentDescription,
      },
      page: () => (
        <>
          <Title />
          <Description of="meta" />
          <Primary />
          <Controls />
          <Stories title="Variants" />
        </>
      ),
    },
  },
  argTypes: {
    variant: propControl({
      name: 'Variant',
      description: figmaDocs.argDescriptions?.variant,
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
      description: figmaDocs.argDescriptions?.btnType,
      control: { type: 'select' },
      options: ['text', 'dropdown', 'icon-only', 'icon-only-dropdown'],
    }),
    size: propControl({
      name: 'Size',
      description: figmaDocs.argDescriptions?.size,
      control: { type: 'radio' },
      options: ['small', 'medium'],
    }),
    disabled: propControl({ name: 'Disabled', description: figmaDocs.argDescriptions?.disabled, control: { type: 'boolean' } }),
    className: propControl({ name: 'Class name', description: figmaDocs.argDescriptions?.className, control: { type: 'text' } }),
    children: slotControl({ name: 'Label', description: figmaDocs.argDescriptions?.children, control: { type: 'text' } }),
    hasLeadingIcon: slotControl({ name: 'Has leading icon', description: figmaDocs.argDescriptions?.hasLeadingIcon, control: { type: 'boolean' } }),
    leadingIconName: slotControl({
      name: 'Leading icon',
      description: figmaDocs.argDescriptions?.leadingIconName,
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    hasTrailingIcon: slotControl({ name: 'Has trailing icon', description: figmaDocs.argDescriptions?.hasTrailingIcon, control: { type: 'boolean' } }),
    trailingIconName: slotControl({
      name: 'Trailing icon',
      description: figmaDocs.argDescriptions?.trailingIconName,
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
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

const BASE_ARGS = {
  btnType: 'text',
  size: 'medium',
  disabled: false,
  children: 'Button',
  hasLeadingIcon: false,
  leadingIconName: '',
  hasTrailingIcon: false,
  trailingIconName: '',
  className: '',
}

const getVariantStoryDescription = (variantKey) => figmaDocs.variantDescriptions?.[variantKey]

const createVariantStory = (name, variantKey, args = {}) => {
  const description = getVariantStoryDescription(variantKey)
  return {
    name,
    render: renderButton,
    parameters: description
      ? {
          docs: {
            description: {
              story: description,
            },
          },
        }
      : undefined,
    args: {
      ...BASE_ARGS,
      variant: variantKey,
      ...args,
    },
  }
}

export const Default = createVariantStory('Default', DEFAULT_VARIANT_KEY)

export const DefaultTertiary = createVariantStory('Default / Tertiary', 'default/tertiary')

export const ConfirmPrimary = createVariantStory('Confirm / Primary', 'confirm/primary')

export const ConfirmTertiary = createVariantStory('Confirm / Tertiary', 'confirm/tertiary')

export const DangerPrimary = createVariantStory('Danger / Primary', 'danger/primary')

export const DangerTertiary = createVariantStory('Danger / Tertiary', 'danger/tertiary')

export const Loading = createVariantStory('Loading', 'loading', {
  children: 'Loading',
  disabled: true,
})
