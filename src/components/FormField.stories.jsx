import React, { useState } from 'react'
import { Controls, Description, Primary, Stories, Title } from '@storybook/addon-docs/blocks'
import FormField from './FormField'
import { eventControl, propControl, slotControl } from '../storybook/controlGroups'
import googleIconNames from '../data/googleIconNames.json'
import figmaDocs from './FormField.figma.generated'

const SIZE_OPTIONS = ['hug', 'small', 'medium', 'large']
const STATE_OPTIONS = ['enabled', 'hover', 'active', 'focus', 'disabled']
const VALIDATION_OPTIONS = ['default', 'error', 'success']
const FIELD_TYPE_OPTIONS = ['text', 'dropdown']
const ICON_OPTIONS = ['', ...googleIconNames]

const meta = {
  title: 'Components/FormField',
  component: FormField,
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
    size: propControl({
      name: 'Size',
      description: figmaDocs.argDescriptions?.size,
      control: { type: 'select' },
      options: SIZE_OPTIONS,
      labels: {
        hug: 'Hug',
        small: 'Small',
        medium: 'Medium',
        large: 'Large',
      },
    }),
    state: propControl({
      name: 'State',
      description: figmaDocs.argDescriptions?.state,
      control: { type: 'select' },
      options: STATE_OPTIONS,
      labels: {
        enabled: 'Enabled',
        hover: 'Hover',
        active: 'Active',
        focus: 'Focus',
        disabled: 'Disabled',
      },
    }),
    validation: propControl({
      name: 'Validation',
      description: figmaDocs.argDescriptions?.validation,
      control: { type: 'select' },
      options: VALIDATION_OPTIONS,
      labels: {
        default: 'Default',
        error: 'Error',
        success: 'Success',
      },
    }),
    fieldType: propControl({
      name: 'Field Type',
      description: 'Text input or dropdown selection mode.',
      control: { type: 'radio' },
      options: FIELD_TYPE_OPTIONS,
    }),
    placeholder: slotControl({
      name: 'Placeholder',
      description: 'Placeholder text shown when the field is empty.',
      control: { type: 'text' },
    }),
    value: slotControl({
      name: 'Value',
      description: 'Current input value.',
      control: { type: 'text' },
    }),
    hasLeftIcon: slotControl({
      name: 'Has left icon',
      description: figmaDocs.argDescriptions?.hasLeftIcon,
      control: { type: 'boolean' },
    }),
    leftIconName: slotControl({
      name: 'Left icon',
      description: figmaDocs.argDescriptions?.leftIconName,
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    hasRightIcon: slotControl({
      name: 'Has right icon',
      description: figmaDocs.argDescriptions?.hasRightIcon,
      control: { type: 'boolean' },
    }),
    rightIconName: slotControl({
      name: 'Right icon',
      description: figmaDocs.argDescriptions?.rightIconName,
      control: { type: 'select' },
      options: ICON_OPTIONS,
      labels: { '': 'None' },
    }),
    iconColor: propControl({
      name: 'Icon colour',
      description: 'Set icon colour (white, black, grey, blue, brand, green, red, yellow). Auto-detects from validation.',
      control: { type: 'select' },
      options: ['', 'white', 'black', 'grey', 'blue', 'brand', 'green', 'red', 'yellow'],
    }),
    className: propControl({ name: 'Class name', description: figmaDocs.argDescriptions?.className, control: { type: 'text' } }),
    onSelect: eventControl({ control: false }),
    onChange: eventControl({ control: false }),
    onClick: eventControl({ control: false }),
    onFocus: eventControl({ control: false }),
    onBlur: eventControl({ control: false }),
  },
}

export default meta

const DROPDOWN_ITEMS = [
  { label: 'Option 1', subtitle: 'First option', value: 'opt1' },
  { label: 'Option 2', subtitle: 'Second option', value: 'opt2' },
  { label: 'Option 3', subtitle: 'Third option', value: 'opt3' },
]

function FormFieldRenderer({
  size,
  state,
  validation,
  fieldType,
  placeholder,
  value = '',
  hasLeftIcon,
  leftIconName,
  hasRightIcon,
  rightIconName,
  iconColor,
  className,
  onChange: storyOnChange,
  onSelect: storyOnSelect,
}) {
  const [selectedValue, setSelectedValue] = useState(value)
  const [textValue, setTextValue] = useState(value)

  const resolvedLeftIcon = hasLeftIcon ? ((leftIconName || '').trim() || 'dark_mode') : undefined
  const resolvedRightIcon = hasRightIcon
    ? (fieldType === 'dropdown' ? 'keyboard_arrow_down' : ((rightIconName || '').trim() || ''))
    : undefined

  const props = {
    size,
    state,
    validation,
    fieldType,
    placeholder,
    value: fieldType === 'dropdown' ? selectedValue : textValue,
    hasLeftIcon: !!hasLeftIcon,
    leftIconName: resolvedLeftIcon,
    hasRightIcon: !!hasRightIcon,
    rightIconName: resolvedRightIcon,
    iconColor: iconColor || undefined,
    className,
    dropdownItems: DROPDOWN_ITEMS,
    menuValue: selectedValue,
    onChange: (e) => {
      setTextValue(e.target.value)
      if (storyOnChange) storyOnChange(e)
    },
    onSelect: (newValue, item) => {
      setSelectedValue(item.label)
      if (storyOnSelect) storyOnSelect(newValue, item)
    },
  }

  return <FormField {...props} />
}

const renderFormField = (args) => <FormFieldRenderer {...args} />

const BASE_ARGS = {
  size: 'medium',
  state: 'enabled',
  validation: 'default',
  fieldType: 'text',
  placeholder: 'Type something...',
  value: '',
  hasLeftIcon: true,
  leftIconName: 'dark_mode',
  hasRightIcon: true,
  rightIconName: 'search',
  className: '',
}

const getVariantStoryDescription = (variantKey) => figmaDocs.variantDescriptions?.[variantKey]

const createVariantStory = (name, variantKey, args = {}) => {
  const description = getVariantStoryDescription(variantKey)
  return {
    name,
    render: renderFormField,
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
      ...args,
    },
  }
}

export const Default = createVariantStory('Enabled / Default', 'enabled/default', {
  state: 'enabled',
  validation: 'default',
})

export const Hover = createVariantStory('Hover', 'hover/default', {
  state: 'hover',
  validation: 'default',
})

export const Active = createVariantStory('Active', 'active/default', {
  state: 'active',
  validation: 'default',
})

export const Focus = createVariantStory('Focus', 'focus/default', {
  state: 'focus',
  validation: 'default',
})

export const Disabled = createVariantStory('Disabled', 'disabled/default', {
  state: 'disabled',
  validation: 'default',
})

export const Error = createVariantStory('Error', 'focus/error', {
  state: 'focus',
  validation: 'error',
})

export const Success = createVariantStory('Success', 'focus/success', {
  state: 'focus',
  validation: 'success',
})

export const TextInput = createVariantStory('Text Input', 'enabled/default', {
  fieldType: 'text',
  placeholder: 'Type something...',
  state: 'enabled',
  validation: 'default',
  hasRightIcon: true,
  rightIconName: 'search',
})
